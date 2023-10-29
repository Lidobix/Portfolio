import datasManager from './datasManager.mjs';
import { domCreator } from './domCreator.mjs';

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

  addEvents() {
    this.clicProject();
    this.clicOnPage();
    this.escapeKey();
    this.rotatePhone();
    this.submitForm();
  }

  clicProject() {
    const { projects } = datasManager;

    this.navToggle = document.getElementById('navToggle');

    projects.forEach((project) => {
      const card = document.getElementById(`project${project.name}`);

      card.addEventListener('click', (e) => {
        const targetEvent = e.target;
        if (!targetEvent.classList.contains('enabledLink')) {
          setTimeout(() => {
            this.projectPreview = true;
          }, 300);

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
    });
  }

  escapeKey() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.projectPreview) {
        this.closePreview(this);
      }
    });
  }

  rotatePhone() {
    window.addEventListener('orientationchange', () => {
      if (window.orientation === 0) {
        // Appareil en position portrait
        this.lastHorizontalScrollY = window.scrollY;
        setTimeout(() => {
          window.scroll(0, this.lastVerticalScrollY);
          this.previewBackgroundDiv.style.top = this.lastVerticalScrollY + 'px';
          this.previewBackgroundDiv.style.height = window.innerHeight + 'px';
        }, 100);
      } else if (window.orientation === 90 || window.orientation === -90) {
        // Appareil en position paysage

        this.lastVerticalScrollY = window.scrollY;
        setTimeout(() => {
          window.scroll(0, this.lastHorizontalScrollY);
          this.previewBackgroundDiv.style.top =
            this.lastHorizontalScrollY + 'px';
          this.previewBackgroundDiv.style.height = window.innerHeight + 'px';
        }, 100);
      }
    });
  }

  clicOnPage() {
    document.addEventListener('click', (e) => {
      const targetEvent = e.target;
      if (targetEvent.classList.contains('navTrigger') && !this.navToggled) {
        this.nav.style.transform = 'translate(-15rem)';
        this.navToggled = true;
      } else {
        this.nav.style.transform = 'translate(15rem)';
        this.navToggled = false;
      }
      if (this.projectPreview) {
        this.closePreview();
      }
    });
  }

  closePreview() {
    document.getElementById('preview').remove();

    this.projectPreview = false;

    this.section.style.paddingRight = this.sectionPaddingRight + 'px';
    this.header.style.paddingRight = this.headerPaddingRight + 'px';
    this.navToggle.style.right = this.navToggleRight + 'px';

    this.body.classList.remove('notScrollable');
  }

  submitForm() {
    document.querySelector('form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const searchParams = new URLSearchParams(formData);
      // await fetch('http://localhost:3000/portfolio/contact', {
      await fetch('https://lidobix.alwaysdata.net/portfolio/contact', {
        method: 'POST',
        body: searchParams.toString(),

        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
        .then((r) => {
          this.buildFormModal(
            datasManager.modal.success.title,
            datasManager.modal.success.message
          );
          form.reset();
        })
        .catch((e) => {
          // le catch peut être généré par unne erreur dans la construction de buildFormModal
          this.buildFormModal(
            datasManager.modal.error.title,
            datasManager.modal.error.message
          );
        });
    });
  }

  buildFormModal(title, message) {
    const titleContainer = DomCreator.div(['modalTitleContainer'], title);
    const messageContainer = DomCreator.div(['modalMessageContainer']);
    const modalContainer = DomCreator.div(['modalContainer']);
    const text = DomCreator.p(message);
    const closeButton = DomCreator.button('FERMER');

    DomCreator.appendChilds(messageContainer, [text, closeButton]);
    DomCreator.appendChilds(modalContainer, [titleContainer, messageContainer]);
    DomCreator.appendChilds(this.body, [modalContainer]);

    closeButton.addEventListener('click', () => {
      modalContainer.remove();
    });
  }
}
