window.addEventListener('DOMContentLoaded', function () {
  console.log('JS lancé');
  // let onload: boolean = true;
  const bouton: HTMLButtonElement | null = document.querySelector('button');
  const header: HTMLElement | null = document.querySelector('header');
  const section: HTMLElement | null = document.querySelector('section');
  const body: HTMLBodyElement | null = document.querySelector('body');
  // const section: HTMLElement | null = document.querySelector('section');
  const storyTitle: string = 'Mon histoire';
  const projectsTitle: string = 'Mes projets';
  const contactTitle: string = 'Contact';

  const projectList: HTMLElement | null =
    document.getElementById('projectList');

  type ProjectSubtype = 'Projet perso' | "projet d'études";
  // type ElementSubtype = 'idPicture' | 'story';
  type Header = {
    title: string;
    subtitle: string;
  };
  type Nav = { title: string };
  type SiteElements = {
    header: Header;
    section: Section;
    nav: Nav;
  };
  type Section = {
    name: string;
    type: 'text' | 'projectList' | 'contactForm';
    content: string | Project[];
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

  // type Element = {
  //   type: 'element';
  //   // subtype: ElementSubtype;
  //   // description?: string;
  //   pageTitle: string;
  //   subTitle: string;
  //   pageSections: Section[];
  // };

  type Project = {
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

  // function buildPage(datas: (Element | Project)[]): void {
  //   buildProjects(datas);
  // }
  function buildPage(siteElements: SiteElements): void {
    console.log(siteElements);

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

      projectList?.appendChild(container);
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
