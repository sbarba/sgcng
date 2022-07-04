const name = document.querySelector('#name');
const button = document.querySelector('#btn');
import {realNames} from './real_names.js';

window.addEventListener('load', () => {
  // Load with a real company name from const real_names.
  name.textContent = realNames[Math.floor(Math.random() * realNames.length)];

  // On button click, fade out name, make up a new one & fade it in.
  button.onclick = makeUpName;
});

async function makeUpName() {
  // Fade out old name.
  await fade(name, 100, 0);

  // Fetch a new name & fade it in.
  const response = await fetch('sgcng.php');
  name.innerHTML = await response.text()
  fade(name, 400, 1);
}

async function fade(selector, duration, opacity) {
  selector.style.transitionDuration = `${duration}ms`; // e.g. `100ms`
  selector.style.opacity = opacity;
  await new Promise(resolve => setTimeout(resolve, duration));
}
