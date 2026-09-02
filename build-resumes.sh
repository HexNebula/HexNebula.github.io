#!/usr/bin/env bash
#
# Build the resumes and publish them to public/.
#
# resume-src/ holds the LaTeX sources; public/ is what the site serves. Nothing
# else copies between the two, so building by hand leaves the site on a stale
# PDF. This is the only supported way to rebuild.
#
#   ./build-resumes.sh                 # both languages
#   ./build-resumes.sh en              # English only
#   ./build-resumes.sh --sync-docs     # also copy into the job-search repo
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$ROOT/resume-src"
PUB="$ROOT/public"
DOCS="/home/an2s/Documents/MesStages/ai-job-search/documents/cv"

EXPECTED_PAGES=2
SYNC_DOCS=0
TARGETS=()

for arg in "$@"; do
  case "$arg" in
    --sync-docs) SYNC_DOCS=1 ;;
    en|fr)       TARGETS+=("resume-$arg") ;;
    -h|--help)   sed -n '3,12p' "${BASH_SOURCE[0]}" | sed 's/^# \?//'; exit 0 ;;
    *)           echo "unknown argument: $arg" >&2; exit 2 ;;
  esac
done
[ ${#TARGETS[@]} -eq 0 ] && TARGETS=(resume-en resume-fr)

command -v lualatex >/dev/null || { echo "lualatex not found" >&2; exit 1; }

pagecount() {
  if command -v pdfinfo >/dev/null; then
    pdfinfo "$1" | awk '/^Pages/{print $2}'
  else
    python3 -c "import pypdf,sys;print(len(pypdf.PdfReader(sys.argv[1]).pages))" "$1"
  fi
}

cd "$SRC"
failed=0

for name in "${TARGETS[@]}"; do
  log="$(mktemp)"
  printf '%-12s ' "$name"

  # Pin the PDF timestamp to the source's mtime. Without this every rebuild
  # embeds "now" and shows up as a git diff even when nothing changed.
  export SOURCE_DATE_EPOCH="$(stat -c%Y "$name.tex")"
  export FORCE_SOURCE_DATE=1

  # Two passes: hyperref writes its anchors to .aux on the first run, so a
  # single pass produces different bytes depending on whether .aux was there.
  compile_failed=0
  for _pass in 1 2; do
    if ! lualatex -interaction=nonstopmode -halt-on-error "$name.tex" >"$log" 2>&1; then
      echo "COMPILE FAILED"
      echo "--- last 20 lines of log ---"
      tail -20 "$log"
      compile_failed=1
      break
    fi
  done
  rm -f "$log"
  if [ "$compile_failed" -ne 0 ]; then
    failed=1
    continue
  fi

  pages="$(pagecount "$name.pdf")"
  size="$(stat -c%s "$name.pdf")"

  if [ "$pages" -ne "$EXPECTED_PAGES" ]; then
    printf 'BAD PAGE COUNT: %s (expected %s)\n' "$pages" "$EXPECTED_PAGES"
    echo "  not published to public/ - fix the source first"
    failed=1
    continue
  fi

  # A photo build embedding the full-resolution PNG lands around 5 MB, which
  # some application portals reject outright.
  if [ "$size" -gt 1000000 ]; then
    printf 'WARNING: %s bytes - check the embedded image resolution\n' "$size"
  fi

  cp "$name.pdf" "$PUB/$name.pdf"
  printf 'ok  %s pages  %s bytes  -> public/\n' "$pages" "$size"

  if [ "$SYNC_DOCS" -eq 1 ] && [ -d "$DOCS" ]; then
    case "$name" in
      resume-fr) cp "$name.tex" "$DOCS/main.tex";    cp "$name.pdf" "$DOCS/main.pdf" ;;
      resume-en) cp "$name.tex" "$DOCS/main_en.tex"; cp "$name.pdf" "$DOCS/main_en.pdf" ;;
    esac
    printf '%-12s     -> %s\n' "" "$DOCS"
  fi
done

rm -f "$SRC"/*.aux "$SRC"/*.log "$SRC"/*.out "$SRC"/*.fls "$SRC"/*.fdb_latexmk

if [ "$failed" -ne 0 ]; then
  echo
  echo "build failed - public/ left untouched for the failing targets"
  exit 1
fi

echo
echo "done. commit resume-src/ and public/ to publish."
