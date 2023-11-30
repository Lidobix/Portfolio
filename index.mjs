import datasManager from './src/datasManager.mjs';
import { buildSite } from './src/site.mjs';
import { addEvents } from './src/events.mjs';

window.addEventListener('DOMContentLoaded', function () {
  datasManager.fetchElements().then(() => {
    buildSite();
    addEvents();
  });
});
