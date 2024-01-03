import datasManager from './src/datasManager.mjs';
import { buildSite } from './src/site.mjs';
import { addEvents } from './src/events.mjs';
import loader from './src/loader.mjs';

window.addEventListener('DOMContentLoaded', function () {
  loader.open();

  datasManager
    .fetchElements()
    .then(() => {
      buildSite();
      addEvents();
    })
    .then(() => {
      loader.close();
    });
});
