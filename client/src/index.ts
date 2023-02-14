window.addEventListener('DOMContentLoaded', function () {
  console.log('JS lancé');

  const script: HTMLScriptElement | null = document.querySelector('script');

  const body: HTMLBodyElement | null = document.querySelector('body');

  type ProjectSubtype = 'Projet perso' | "Projet d'études" | 'Projet pro';

  type Header = {
    title: string;
    subtitle: string;
  };

  type NavElement = { name: string; anchor: string };

  type SiteElements = {
    header: Header;
    section: SectionElement[];
    nav: NavElement[];
  };

  type SectionElement = {
    id: number;
    name: string;
    text?: string;
    projectList?: Project[];
    display: boolean;
    htmlForm?: string;
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
    type: string;
    subtype: ProjectSubtype;
    status: Status;
    description: string;
    technos?: Techno[];
    image?: string;
    link?: string;
    display: boolean;
  };

  const navElements: NavElement[] = [];

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
    body?.insertBefore(buildSection(siteElements.section), script);
    body?.insertBefore(
      buildNav(navElements),
      document.querySelector('section')
    );
  }

  function buildForm(htmlForm: string): HTMLElement {
    const form: HTMLFormElement = document.createElement('form');
    form.classList.add('card');
    form.innerHTML = htmlForm;
    form.method = 'POST';

    return form;
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

  function buildNav(navElements: NavElement[]): HTMLElement {
    const nav: HTMLUListElement = document.createElement('ul');

    navElements.forEach((element) => {
      const li: HTMLLIElement = document.createElement('li');
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = element.anchor;
      a.innerText = element.name;
      li.appendChild(a);
      nav.appendChild(li);
    });

    return nav;
  }

  function buildSection(sectionElements: SectionElement[]): HTMLElement {
    const section: HTMLElement = document.createElement('section');

    sectionElements.forEach((sectionElement) => {
      if (sectionElement.display) {
        const title: HTMLHeadingElement = document.createElement('h3');
        title.innerText = sectionElement.name;

        const anchorCalc: string = sectionElement.name
          .toLowerCase()
          .split(' ')
          .sort((a, b) => b.length - a.length)[0];
        title.id = anchorCalc;
        navElements.push({
          name: sectionElement.name,
          anchor: `#${anchorCalc}`,
        });
        section.appendChild(title);

        if (sectionElement.text) {
          const content: HTMLParagraphElement = document.createElement('p');
          content.innerText = sectionElement.text;
          section.appendChild(content);
        }

        if (sectionElement.projectList) {
          section.appendChild(buildProjects(sectionElement.projectList));
        }
        if (sectionElement.htmlForm) {
          section.appendChild(buildForm(sectionElement.htmlForm));
        }
      }
    });

    return section;
  }

  function buildProjects(projects: Project[]): HTMLElement {
    const container: HTMLDivElement = document.createElement('div');
    container.id = 'projectList';
    projects.forEach((project) => {
      if (project.display) {
        const card: HTMLDivElement = document.createElement('div');
        card.classList.add('card');

        const titleContainer: HTMLElement = document.createElement('div');
        titleContainer.classList.add('projectTitleContainer');
        const projectTitle: HTMLHeadElement = document.createElement('h4');
        projectTitle.innerText = `${project.title}`;
        titleContainer.appendChild(projectTitle);
        card.appendChild(titleContainer);

        const quickDescription: HTMLDivElement = document.createElement('div');
        quickDescription.classList.add('quickDescription');

        const type: HTMLParagraphElement = document.createElement('p');
        type.innerText = `${project.type}`;
        quickDescription.appendChild(type);

        const status: HTMLParagraphElement = document.createElement('p');
        status.innerText = `${project.subtype} (${project.status})`;
        quickDescription.appendChild(status);
        card.appendChild(quickDescription);

        if (project.image) {
          const view: HTMLImageElement = document.createElement('img');
          view.classList.add('projectView');
          view.src = project.image;
          card.appendChild(view);
        }

        if (project.technos?.length) {
          const technoList: HTMLDivElement = document.createElement('div');
          technoList.classList.add('technoList');
          project.technos?.forEach((techno) => {
            const div: HTMLElement = document.createElement('div');
            const logo: HTMLImageElement = document.createElement('img');
            div.classList.add('logoTechno');

            logo.src = `assets/images/${techno.toLowerCase()}.png`;

            div.appendChild(logo);
            technoList.appendChild(div);
          });
          card.appendChild(technoList);
        }
        container.appendChild(card);
      }
    });
    return container;
  }

  const callSiteContent = async (): Promise<void> => {
    console.log('fetch datas');
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
        buildPage(datas[0]);
      });
  };

  callSiteContent();
});
