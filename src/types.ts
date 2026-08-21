/** Every shape used across the site. `data/content.ts` is checked against these. */

export type ThemeName = 'light' | 'dark';
export type AccentColour = 'blue' | 'red' | 'green' | 'amber';

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly roleSub: string;
  readonly tagline: string;
  readonly headline: readonly [string, string];
  readonly email: string;
  readonly phone: string;
  readonly github: string;
  readonly linkedin: string;
  readonly leetcode: string;
  readonly photo: string;
  readonly resume: string;
}

/** Bezel filenames for [left, center, right] at a given stage. */
export type StageFiles = readonly [string, string, string];

export interface Stage {
  readonly id: string;
  /** Scroll fraction (0–1) at which this stage becomes active. */
  readonly start: number;
  readonly label: string;
  readonly files: StageFiles;
}

export interface ProjectLink {
  readonly kind: 'github' | 'live' | 'paper';
  readonly url: string;
  readonly label: string;
}

export type LabelledPair = readonly [string, string];

export interface Project {
  readonly key: string;
  readonly n: string;
  readonly file: string;
  readonly title: string;
  readonly blurb: string;
  readonly metric: string;
  readonly period: string;
  readonly stack: readonly LabelledPair[];
  readonly stackNote: readonly [string, string];
  readonly bullets: readonly string[];
  readonly tags: readonly string[];
  readonly stats: readonly LabelledPair[];
  readonly detail: readonly string[];
  readonly links: readonly ProjectLink[];
}

/** The internship shares the modal shape, minus the stage-specific fields. */
export interface CaseStudy {
  readonly key: string;
  readonly file: string;
  readonly title: string;
  readonly tags: readonly string[];
  readonly stats: readonly LabelledPair[];
  readonly detail: readonly string[];
  readonly links: readonly ProjectLink[];
}

export type Openable = Project | CaseStudy | OtherProject;

export interface PipelineStep {
  readonly cmd: string;
  readonly colour: AccentColour;
  readonly arg: string;
  readonly out: string;
}

export interface Experience {
  readonly role: string;
  readonly org: string;
  readonly period: string;
  readonly pipeline: readonly PipelineStep[];
}

export interface Education {
  readonly school: string;
  readonly degree: string;
  readonly period: string;
  readonly cgpa: string;
  readonly prior: string;
  readonly note: string;
  readonly stats: readonly LabelledPair[];
}

export interface Honour {
  readonly title: string;
  readonly year: string;
  readonly detail: string;
}

export interface TargetRole {
  readonly n: string;
  readonly title: string;
  readonly note: string;
}

export interface OtherProject {
  readonly key: string;
  readonly n: string;
  readonly title: string;
  readonly blurb: string;
  readonly period: string;
  readonly bullets: readonly string[];
  readonly tags: readonly string[];
  readonly links: readonly ProjectLink[];
}
export type OtherProjects = OtherProject;

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  /** 1–3 character issuer mark for the card. */
  readonly mark: string;
  readonly date: string;
  readonly credentialId?: string;
  readonly url?: string;
  readonly skills: readonly string[];
}

export type CommandKind = 'Go' | 'Open' | 'Work' | 'FAQ' | 'Do';

export interface Command {
  readonly id: string;
  readonly kind: CommandKind;
  readonly label: string;
  readonly hint?: string;
  readonly keywords?: string;
  readonly run: () => void;
}
