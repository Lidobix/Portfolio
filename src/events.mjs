import { domCreator } from './domCreator.mjs';

// TODO: remplacer le header par une référence à this

const DomCreator = new domCreator();

export class EventsManager {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('header');
    this.nav = document.querySelector('nav');
    this.section = document.querySelector('section');
    this.projectPreview = false;
    this.previewBackgroundDiv = '';
    this.sectionPaddingRight = '';
    this.headerPaddingRight = '';
    this.navToggle = '';

    this.navToggleRight = '';
  }

  addPageEvents() {
    this.clicPage();
  }

  clicPage() {
    document.addEventListener('click', (e) => {
      console.log('clic page');
      //   console.log('projectPreview', this);
      const targetEvent = e.target;
      if (targetEvent.classList.contains('navTrigger') && !this.navToggled) {
        this.nav.style.transform = 'translate(-15rem)';
        this.navToggled = true;
      } else {
        this.nav.style.transform = 'translate(15rem)';
        this.navToggled = false;
      }
      if (this.projectPreview) {
        console.log('fermeture preview');
        this.closePreview();
      }
    });
  }

  clicCard(card, project) {
    this.navToggle = document.getElementById('navToggle');
    console.log(this.navToggle);

    card.addEventListener('click', (e) => {
      const targetEvent = e.target;
      if (!targetEvent.classList.contains('enabledLink')) {
        setTimeout(() => {
          console.log('settimeout');
          this.projectPreview = true;
          console.log('settimeout projectPreview', this.projectPreview);
        }, 300);

        console.log('clic projectPreview', this.projectPreview);

        const previewBackground = DomCreator.createNode(
          'div',
          ['previewBackground'],
          { id: 'preview' }
        );

        previewBackground.style.top = window.scrollY + 'px';

        previewBackground.style.height = window.innerHeight + 'px';
        this.previewBackgroundDiv = previewBackground;

        const bodyStyle = window.getComputedStyle(this.body);

        const scrollBarWidth = window.innerWidth - parseInt(bodyStyle.width);

        this.sectionPaddingRight = parseInt(
          window.getComputedStyle(this.section).paddingRight
        );

        this.headerPaddingRight = parseInt(
          window.getComputedStyle(this.header).paddingRight
        );
        console.log(this.navToggle);
        this.navToggleRight = parseInt(
          window.getComputedStyle(this.navToggle).right
        );
        this.section.style.paddingRight =
          this.sectionPaddingRight + scrollBarWidth + 'px';

        this.header.style.paddingRight =
          this.headerPaddingRight + scrollBarWidth + 'px';

        this.navToggle.style.right =
          this.navToggleRight + scrollBarWidth + 'px';

        this.body.classList.add('notScrollable');

        const previewContainer = DomCreator.createNode('div', [
          'previewContainer',
        ]);

        const titleContainer = DomCreator.createNode('div');
        const title = DomCreator.hX(2, project.title);
        const summary = DomCreator.createNode('div', ['previewSummary']);

        const descriptionContainer = DomCreator.createNode('div');

        const description = DomCreator.createNode('p', [], {
          innerText: project.description,
        });
        descriptionContainer.appendChild(description);

        titleContainer.appendChild(title);

        DomCreator.appendChilds(summary, [
          titleContainer,
          descriptionContainer,
        ]);

        const imageContainer = DomCreator.createNode('div', ['previewImage']);

        imageContainer.style.backgroundImage = `url(${project.image})`;

        DomCreator.appendChilds(previewContainer, [imageContainer, summary]);

        previewBackground.appendChild(previewContainer);

        this.body.appendChild(previewBackground);
      }
    });
  }

  closePreview() {
    document.getElementById('preview').remove();
    console.log('close prev');
    console.log(this);

    this.projectPreview = false;

    this.section.style.paddingRight = this.sectionPaddingRight + 'px';
    this.header.style.paddingRight = this.headerPaddingRight + 'px';
    this.navToggle.style.right = this.navToggleRight + 'px';

    this.body.classList.remove('notScrollable');
  }
}
