import { domCreator } from './src/domCreator.mjs';
import { EventsManager } from './src/events.mjs';
import datasManager from './src/datasManager.mjs';
import siteBuilder from './src/site.mjs';
// const Site = new siteBuilder();
const DomCreator = new domCreator();
const eventsManager = new EventsManager();

window.addEventListener('DOMContentLoaded', function () {
  const site = {
    body: document.querySelector('body'),
    projectPreview: false,
    sectionPaddingRight: 0,
    headerPaddingRight: 0,
    navToggleRight: 0,
    lastVerticalScrollY: 0,
    lastHorizontalScrollY: 0,
    previewBackgroundDiv: {},
    header: {},
    section: {},
    navToggle: {},
    script: document.querySelector('script'),
    siteElements: {},
    navToggled: false,

    buildSite: async function () {
      await datasManager.fetchElements();

      siteBuilder.buildHeader();
      siteBuilder.buildNavToggle();
      siteBuilder.buildSection();
      siteBuilder.buildNavMenu();
      eventsManager.addPageEvents();

      // this.section = document.querySelector('section');
      // this.header = document.querySelector('header');

      // this.buildNav(this.siteElements.nav);

      // document.querySelector('header').appendChild(this.buildNavToggle());

      // this.navToggle = document.getElementById('navToggle');

      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && this.projectPreview) {
          this.closePreview(this);
        }
      });

      window.addEventListener('orientationchange', () => {
        if (window.orientation === 0) {
          // Appareil en position portrait
          this.lastHorizontalScrollY = window.scrollY;
          setTimeout(() => {
            window.scroll(0, this.lastVerticalScrollY);
            this.previewBackgroundDiv.style.top =
              this.lastVerticalScrollY + 'px';
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

      document
        .querySelector('form')
        ?.addEventListener('submit', async (event) => {
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
                this,
                this.siteElements.modal.success.title,
                this.siteElements.modal.success.message
              );
              form.reset();
            })
            .catch((e) => {
              this.buildFormModal(
                this,
                this.siteElements.modal.error.title,
                this.siteElements.modal.error.message
              );
            });
        });
    },

    buildFormModal: (levelUp, title, message) => {
      const titleContainer = DomCreator.div(['modalTitleContainer'], title);
      const messageContainer = DomCreator.div(['modalMessageContainer']);
      const modalContainer = DomCreator.div(['modalContainer']);
      const text = DomCreator.p(message);
      const closeButton = DomCreator.button('FERMER');

      DomCreator.appendChilds(messageContainer, [text, closeButton]);
      DomCreator.appendChilds(modalContainer, [
        titleContainer,
        messageContainer,
      ]);
      DomCreator.appendChilds(levelUp.body, [modalContainer]);

      closeButton.addEventListener('click', () => {
        modalContainer.remove();
      });
    },
  };

  site.buildSite();
});
