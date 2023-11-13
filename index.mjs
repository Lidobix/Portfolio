// import { EventsManager } from './src/events.mjs';
import datasManager from './src/datasManager.mjs';
import { buildSite } from './src/site.mjs';
// const eventsManager = new EventsManager();
import { addEvents } from './src/events.mjs';

window.addEventListener('DOMContentLoaded', function () {
  datasManager.fetchElements().then(() => {
    buildSite();
    addEvents();
  });
});
