const screens = {
  conversation: {
    src: 'assets/screenshots/chat.png',
    alt: 'AskTab full-page chat with an example weekly plan and browser tools.',
    caption: 'Full-page chat. Example conversation shown.',
    label: 'Conversation screenshot',
    count: '01 / 02',
  },
  welcome: {
    src: 'assets/screenshots/welcome.png',
    alt: 'AskTab welcome screen with example suggested actions.',
    caption: 'Welcome screen. Example suggested actions shown.',
    label: 'Welcome screenshot',
    count: '02 / 02',
  },
};
const buttons = [...document.querySelectorAll('[data-screen]')];
const screenImage = document.querySelector('#screen-image');
const caption = document.querySelector('#screen-caption');
const count = document.querySelector('#screen-count');
const panel = document.querySelector('#screen-panel');
const enlarge = document.querySelector('#enlarge');
const dialog = document.querySelector('#screen-dialog');
const preview = document.querySelector('#preview-image');

function selectScreen(button) {
  const screen = screens[button.dataset.screen];
  for (const item of buttons) {
    const selected = item === button;
    item.setAttribute('aria-pressed', String(selected));
    item.classList.toggle('selected', selected);
  }
  screenImage.src = screen.src;
  screenImage.alt = screen.alt;
  caption.textContent = screen.caption;
  count.textContent = screen.count;
  panel.setAttribute('aria-label', screen.label);
  enlarge.href = screen.src;
}

for (const button of buttons) {
  button.addEventListener('click', () => selectScreen(button));
  button.addEventListener('keydown', event => {
    const current = buttons.indexOf(button);
    let target;
    if (event.key === 'ArrowRight') target = buttons[(current + 1) % buttons.length];
    if (event.key === 'ArrowLeft') target = buttons[(current + buttons.length - 1) % buttons.length];
    if (event.key === 'Home') target = buttons[0];
    if (event.key === 'End') target = buttons[buttons.length - 1];
    if (!target) return;
    event.preventDefault();
    selectScreen(target);
    target.focus();
  });
}
enlarge.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  preview.src = screenImage.src;
  preview.alt = screenImage.alt;
  dialog.showModal();
});
document.querySelector('#close-preview').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => enlarge.focus({ preventScroll: true }));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
