import datasManager from './datasManager.mjs';
import { domCreator } from './domCreator.mjs';
const DomCreator = new domCreator();

export class SiteBuilder {
  constructor() {}

  buildHeader() {
    if (datasManager.header !== null) {
      this.header = datasManager.header;
    } else {
      return;
    }

    const header = document.querySelector('header');
    const pageTitle = DomCreator.createNode('h1', [], {
      innerText: this.header.title,
    });

    const subTitle = DomCreator.createNode('h2', [], {
      innerText: this.header.subtitle,
    });

    DomCreator.appendChilds(header, [pageTitle, subTitle]);

    if (this.header.socials.length) {
      const socialContainer = DomCreator.createNode('div', ['socialContainer']);
      this.header.socials.forEach((element) => {
        const a = DomCreator.a(element.url);
        const picto = DomCreator.img(element.picto);
        a.appendChild(picto);
        socialContainer.appendChild(a);
      });

      header.appendChild(socialContainer);
    }
  }
}
