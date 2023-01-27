console.log('coucou');
const bouton: HTMLButtonElement | null = document.querySelector('button');

type Type = "Projet d'études" | 'Projet perso';
type State = 'Stand-By' | 'Fini' | 'En cours';
type Techno =
  | 'HTML'
  | 'CSS'
  | 'JS'
  | 'TypeScript'
  | 'WebSocket'
  | 'Angular'
  | 'React'
  | 'NODE JS';

type Project = {
  title: string;
  type: Type;
  state: State;
  description: string;
  techno1: Techno;
  techno2: Techno;
  techno3: Techno;
  image: string;
};

const callProjects = async (): Promise<void> => {
  fetch(`http://127.0.0.1:1234/api`, {
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
};

bouton?.addEventListener('click', callProjects);
