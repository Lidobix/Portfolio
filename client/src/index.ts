window.addEventListener('DOMContentLoaded', function () {
  console.log('JS lancé');
  // let onload: boolean = true;
  const bouton: HTMLButtonElement | null = document.querySelector('button');
  const body: HTMLBodyElement | null = document.querySelector('body');
  const section: HTMLElement | null = document.querySelector('section');
  const storyTitle: string = 'Mon histoire';
  const projectsTitle: string = 'Mes projets';
  const contactTitle: string = 'Contact';

  const projectList: HTMLElement | null =
    document.getElementById('projectList');

  type Subtype = 'Projet perso' | "projet d'études";
  type Type = 'project' | 'story';
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
    title: string;
    type: Type;
    subtype: Subtype;
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

  function buildPage(formattedResult: Project[]): void {
    const allProjects: Project[] = formattedResult;
    allProjects.forEach((project) => {
      const container: HTMLDivElement = document.createElement('div');

      const title: HTMLHeadElement = document.createElement('h3');
      title.innerText = `${project.title}`;
      container.appendChild(title);

      const status: HTMLParagraphElement = document.createElement('p');
      status.innerText = `${project.type} - ${project.status}`;
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
      .then((formattedResult) => {
        buildPage(formattedResult);
        // const allProjects: Project[] = formattedResult;
        // allProjects.forEach((project) => {
        //   const container: HTMLDivElement = document.createElement('div');
        //   const title: HTMLHeadElement = document.createElement('h3');
        //   title.innerText = `${project.title}`;
        //   container.appendChild(title);
        //   const status: HTMLParagraphElement = document.createElement('p');
        //   status.innerText = `${project.type} - ${project.status}`;
        //   container.appendChild(status);
        //   const description: HTMLParagraphElement = document.createElement('p');
        //   description.innerText = `${project.description}`;
        //   container.appendChild(description);
        //   const view: HTMLImageElement = document.createElement('img');
        //   view.classList.add('view');
        //   view.src = 'assets/screen.png';
        //   container.appendChild(view);
        //   if (project.technos?.length) {
        //     const technoList: HTMLDivElement = document.createElement('div');
        //     project.technos?.forEach((techno) => {
        //       const logo: HTMLImageElement = document.createElement('img');
        //       logo.classList.add('logoTechno');
        //       logo.src = `assets/images/${techno.toLowerCase()}.png`;
        //       technoList.appendChild(logo);
        //     });
        //     container.appendChild(technoList);
        //   }
        //   projectList?.appendChild(container);
        // });
      });
  };

  // callSiteElements();
  callProjects();
});
