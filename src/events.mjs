import datasManager from './datasManager.mjs';
import { buildSite } from './site.mjs';
import { PreviewProject } from './previewProject.mjs';
const Preview = new PreviewProject();

class EventsManager {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('header');
    this.nav = document.querySelector('nav');
    this.section = document.querySelector('section');
    this.isPreviewDisplayed = false;
    this.isNavDisplayed = false;
    this.navToggle;
    this.arrow;
  }

  init() {
    this.arrow = document.getElementById('navArrowTop');
    this.navToggle = document.getElementById('navToggle');
  }

  scrollPage() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        this.arrow.classList.remove('invisible');
        this.arrow.classList.add('visible');
      } else {
        this.arrow.classList.remove('visible');
        this.arrow.classList.add('invisible');
      }
    });
  }

  goToTop() {
    this.arrow.addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
  }

  resizeWindow() {
    window.addEventListener('resize', () => {
      if (this.isPreviewDisplayed) {
        setTimeout(() => {
          Preview.updateBackgroundCss();
        }, 150);
      }
    });
  }

  openPreviewProject() {
    const { projects } = datasManager;

    projects.forEach((project) => {
      const card = document.getElementById(`project${project.name}`);

      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('enabledLink')) {
          Preview.open(project);
          this.clicArrowPreview();

          setTimeout(() => {
            this.isPreviewDisplayed = true;
          }, 300);
        }
      });
    });
  }

  clicArrowPreview() {
    Preview.leftArrow.addEventListener('click', () => {
      Preview.updateImage(-1);
    });
    Preview.rightArrow.addEventListener('click', () => {
      Preview.updateImage(1);
    });
  }
  escapeKey() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.isPreviewDisplayed) {
        Preview.close();
        this.isPreviewDisplayed = false;
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
      if (e.target.classList.contains('navTrigger') && !this.isNavDisplayed) {
        this.nav.style.transform = 'translate(-15rem)';
        this.isNavDisplayed = true;
      } else {
        this.nav.style.transform = 'translate(15rem)';
        this.isNavDisplayed = false;
      }
      if (
        (this.isPreviewDisplayed &&
          e.target.classList.contains('previewBackground')) ||
        e.target.classList.contains('closingCross')
      ) {
        this.isPreviewDisplayed = false;
        Preview.close();
      }
    });
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
          buildSite.buildFormModal(
            datasManager.modal.success.title,
            datasManager.modal.success.message
          );
          form.reset();
        })
        .catch((e) => {
          // le catch peut être généré par unne erreur dans la construction de buildFormModal
          buildSite.buildFormModal(
            datasManager.modal.error.title,
            datasManager.modal.error.message
          );
        });
    });
  }
}

export const addEvents = () => {
  const eventManager = new EventsManager();

  eventManager.init();
  eventManager.resizeWindow();
  eventManager.goToTop();
  eventManager.openPreviewProject();
  eventManager.clicOnPage();
  eventManager.scrollPage();
  eventManager.escapeKey();
  eventManager.rotatePhone();
  eventManager.submitForm();
};
