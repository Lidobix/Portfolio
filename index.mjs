import { EventsManager } from './src/events.mjs';
import datasManager from './src/datasManager.mjs';
import siteBuilder from './src/site.mjs';
const eventsManager = new EventsManager();
import loader from './src/loader.mjs';

window.addEventListener('DOMContentLoaded', function () {
  loader.open();
  datasManager
    .fetchElements()
    .then(() => {
      siteBuilder.buildHeader();
      siteBuilder.buildNav();
      siteBuilder.buildSection();
      eventsManager.addEvents();
    })
    .then(() => {
      loader.close();
    });
});
