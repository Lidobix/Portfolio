export type ProjectSubtype = 'Projet perso' | "Projet d'études" | 'Projet pro';

export type Header = {
  title: string;
  subtitle: string;
};

export type NavElement = { name: string; anchor: string };

export type SiteElements = {
  header: Header;
  section: SectionElement[];
  nav: NavElement[];
};

export type SectionElement = {
  id: number;
  name: string;
  text?: string;
  projectList?: Project[];
  display: boolean;
  htmlForm?: string;
};

export type Techno =
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'WebSocket'
  | 'Angular'
  | 'React'
  | 'NODE_JS';

export type Project = {
  id: number;
  title: string;
  type: string;
  subtype: ProjectSubtype;
  status: 'Fini' | 'En cours' | 'Stand-By';
  description: string;
  technos?: Techno[];
  image?: string;
  link?: string;
  display: boolean;
};

export type Site = {
  body: HTMLElement;
  script: HTMLScriptElement;
  siteElements: SiteElements;
  navToggled: boolean;
  buildSite: Function;
  fetchElements: Function;
  buildHeader: Function;
  buildSection: Function;
  buildNav: Function;
  buildNavToggle: Function;
  buildForm: Function;
  buildProjects: Function;
  scrollEvent?: Function;
  sendMailReaction: Function;
};
