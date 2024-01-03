import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

class Loader {
  constructor() {
    this.loader;
    this.body = document.querySelector('body');
  }

  open() {
    this.loader = DomCreator.createNode('div', ['transition500'], {
      id: 'loader',
    });

    DomCreator.appendChilds(this.body, [this.loader]);
  }

  close() {
    this.loader.style.backgroundColor = 'transparent';
    setTimeout(() => {
      this.loader.remove();
    }, 500);
  }
}

const loader = new Loader();
export default loader;
