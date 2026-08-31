// Virtual filesystem for the terminal — generated from data.ts.

import { profile, experience, projects, skills, education } from './data';

export type FsNode =
  | { dir: true; children: Record<string, FsNode> }
  | { dir: false; content: string };

const file = (content: string): FsNode => ({ dir: false, content: content.trim() + '\n' });
const dir = (children: Record<string, FsNode>): FsNode => ({ dir: true, children });

const aboutMd = `
# ${profile.name}
${profile.role} — ${profile.location}

${profile.bio}

links:
  github    ${profile.github}
  linkedin  ${profile.linkedin}
  email     ${profile.email}
`;

const skillsMd = Object.entries(skills)
  .map(([group, items]) => `${group.padEnd(14)} ${items.join(' · ')}`)
  .join('\n');

const educationMd = education
  .map((e) => `${e.period}  ${e.school}\n${' '.repeat(12)}${e.degree} — ${e.location}`)
  .join('\n\n');

const contactSh = `
#!/usr/bin/env zsh
# reach me — pick your channel

email     ${profile.email}
phone     ${profile.phone}
github    ${profile.github}
linkedin  ${profile.linkedin}
resume    ${profile.resume}
`;

const expFiles: Record<string, FsNode> = {};
for (const e of experience) {
  expFiles[`${e.slug}.md`] = file(
    `# ${e.company}\n${e.role}\n${e.period} — ${e.location}\n\n` +
      e.points.map((p) => `- ${p}`).join('\n') +
      `\n\nstack: ${e.stack.join(', ')}`,
  );
}

const projectDirs: Record<string, FsNode> = {};
for (const p of projects) {
  projectDirs[p.slug] = dir({
    'README.md': file(
      `# ${p.name}\n\n${p.description}\n\nstack: ${p.stack.join(', ')}\nrepo:  ${p.repo}`,
    ),
  });
}

export const root: FsNode = dir({
  'about.md': file(aboutMd),
  'skills.md': file(skillsMd),
  'education.md': file(educationMd),
  'contact.sh': file(contactSh),
  experience: dir(expFiles),
  projects: dir(projectDirs),
});

export const NEOFETCH_INFO: [string, string][] = [
  ['user', `anas@arch`],
  ['os', 'Arch Linux x86_64 (btw)'],
  ['shell', 'zsh 5.9'],
  ['role', profile.role],
  ['location', profile.location],
  ['education', 'ENSIAS — Software Engineering, 2025'],
  ['backend', 'Spring Boot · FastAPI · Django'],
  ['frontend', 'React · TypeScript'],
  ['infra', 'Docker · Kafka · Kubernetes · CI/CD'],
  ['github', profile.github],
  ['email', profile.email],
];
