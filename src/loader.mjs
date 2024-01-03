import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

class Loader {
  constructor() {
    this.loader;
    this.body = document.querySelector('body');
    this.duration = 1500;
  }

  open() {
    this.loader = DomCreator.createNode('div', [`transition${this.duration}`], {
      id: 'loader',
    });

    DomCreator.appendChilds(this.body, [this.loader]);
  }

  close() {
    setTimeout(() => {
      this.loader.style.backgroundColor = 'transparent';
    }, 300);

    setTimeout(() => {
      this.loader.remove();
    }, this.duration + 800);
  }
}

const loader = new Loader();
export default loader;
