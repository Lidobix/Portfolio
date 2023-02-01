window.addEventListener('DOMContentLoaded', function () {
  console.log('JS lancé');

  const script: HTMLScriptElement | null = document.querySelector('script');

  const body: HTMLBodyElement | null = document.querySelector('body');

  type ProjectSubtype = 'Projet perso' | "projet d'études";

  type Header = {
    title: string;
    subtitle: string;
  };
  type Nav = { title: string };
  type SiteElements = {
    header: Header;
    section: Section[];
    nav: Nav;
  };

  type Section = {
    id: number;
    name: string;
    type: 'text' | 'projectList' | 'contactForm';
    text?: string;
    projectList?: Project[];
  };

  type Status = 'Fini' | 'En cours' | 'Stand-By';
  type Techno =
    | 'HTML'
    | 'CSS'
    | 'JavaScript'
    | 'TypeScript'
    | 'WebSocket'
    | 'Angular'
    | 'React'
    | 'NODE_JS';

  type Project = {
    id: number;
    title: string;
    type: 'project';
    subtype: ProjectSubtype;
    status: Status;
    description: string;
    technos?: Techno[];
    image?: string;
    link?: string;
  };
  console.log('lancement fetch');

  ///////////// COUCOU SERVEUR /////////////////////////
  fetch(`http://127.0.0.1:1234/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((r) => {
      return r.json();
    })
    .then((r) => {
      console.log(r);
    });
  ///////////////////////////////////////////

  function buildPage(siteElements: SiteElements): void {
    body?.insertBefore(buildHeader(siteElements.header), script);

    // console.log(typeof siteElements.section);
    body?.insertBefore(buildSection(siteElements.section), script);
    // buildNav(siteElements.nav);

    // console.log(siteElements);
    // const pageTitle: HTMLHeadingElement = document.createElement('h1');
    // pageTitle.innerText = siteElements.pageTitle;
    // const subTitle: HTMLHeadingElement = document.createElement('h2');
    // subTitle.innerText = siteElements.subTitle;
    // siteElements.pageSections.forEach((paragraphe) => {
    //   const sectionTitle: HTMLHeadingElement = document.createElement('h3');
    // });
    // header?.appendChild(pageTitle);
    // header?.appendChild(subTitle);
  }

  function buildHeader(headerElements: Header): HTMLElement {
    const header: HTMLElement = document.createElement('header');

    const pageTitle: HTMLHeadingElement = document.createElement('h1');
    pageTitle.innerText = headerElements.title;
    const subTitle: HTMLHeadingElement = document.createElement('h2');
    subTitle.innerText = headerElements.subtitle;

    header.appendChild(pageTitle);
    header.appendChild(subTitle);

    return header;
  }

  function buildSection(sectionElements: Section[]): HTMLElement {
    const section: HTMLElement = document.createElement('section');

    sectionElements.forEach((sectionElement) => {
      const name: HTMLHeadingElement = document.createElement('h3');
      name.innerText = sectionElement.name;
      section.appendChild(name);
      if (sectionElement.text) {
        const content: HTMLParagraphElement = document.createElement('p');
        content.innerText = sectionElement.text;

        section.appendChild(content);
      }
    });

    return section;
  }

  function buildProjects(projects: Project[]): void {
    projects.forEach((project) => {
      const container: HTMLDivElement = document.createElement('div');

      const projectTitle: HTMLHeadElement = document.createElement('h3');
      projectTitle.innerText = `${project.title}`;
      container.appendChild(projectTitle);

      const status: HTMLParagraphElement = document.createElement('p');
      status.innerText = `${project.subtype} - ${project.status}`;
      container.appendChild(status);

      const description: HTMLParagraphElement = document.createElement('p');
      description.innerText = `${project.description}`;
      container.appendChild(description);

      const view: HTMLImageElement = document.createElement('img');
      view.classList.add('view');
      view.src = 'assets/screen.png';
      container.appendChild(view);

      if (project.technos?.length) {
        const technoList: HTMLDivElement = document.createElement('div');
        project.technos?.forEach((techno) => {
          const logo: HTMLImageElement = document.createElement('img');
          logo.classList.add('logoTechno');
          logo.src = `assets/images/${techno.toLowerCase()}.png`;
          technoList.appendChild(logo);
        });
        container.appendChild(technoList);
      }
    });
  }

  const callProjects = async (): Promise<void> => {
    fetch(`http://127.0.0.1:1234/api`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((datas) => {
        console.log('data=', datas);
        buildPage(datas[0]);
        // buildProjects(datas.projects);
      });
  };

  // callSiteElements();
  callProjects();
});
