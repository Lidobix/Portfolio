import datasManager from './datasManager.mjs';
import { domCreator } from './domCreator.mjs';
import siteBuilder from './site.mjs';

const DomCreator = new domCreator();

export class EventsManager {
  constructor() {
    this.body = siteBuilder.body;
    this.header = siteBuilder.header;
    this.nav = siteBuilder.nav;
    this.section = siteBuilder.section;
    this.projectPreview = false;
    this.navToggled = false;
    this.previewBackgroundDiv = '';
    this.navToggle = '';
    this.navToggleRight = '';
  }

  addEvents() {
    this.resizeWindow();
    this.clicProject();
    this.clicOnPage();
    this.escapeKey();
    this.rotatePhone();
    this.submitForm();
  }

  resizeWindow() {
    window.addEventListener('resize', (event) => {
      this.updatePreviewBackgroundCss();
    });
  }

  updatePreviewBackgroundCss() {
    if (this.previewBackground) {
      this.bodyStyle = window.getComputedStyle(this.body);
      this.previewBackground.style.height = this.bodyStyle.height;
    }
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

          this.previewBackground = DomCreator.createNode(
            'div',
            ['previewBackground'],
            { id: 'preview' }
          );

          this.updatePreviewBackgroundCss();

          const previewContainer = DomCreator.createNode('div', [
            'previewContainer',
          ]);

          const titleContainer = DomCreator.createNode('div');
          const title = DomCreator.createNode('h2', [], {
            innerText: project.name,
          });
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

          this.previewBackground.appendChild(previewContainer);
          this.body.appendChild(this.previewBackground);
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
        }, 100);
      } else if (window.orientation === 90 || window.orientation === -90) {
        // Appareil en position paysage

        this.lastVerticalScrollY = window.scrollY;
        setTimeout(() => {
          window.scroll(0, this.lastHorizontalScrollY);
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
