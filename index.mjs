import { EventsManager } from './src/events.mjs';
import datasManager from './src/datasManager.mjs';
import siteBuilder from './src/site.mjs';
const eventsManager = new EventsManager();

window.addEventListener('DOMContentLoaded', function () {
  datasManager.fetchElements().then(() => {
    siteBuilder.buildHeader();
    siteBuilder.buildNav();
    siteBuilder.buildSection();
    eventsManager.addEvents();
  });
});
