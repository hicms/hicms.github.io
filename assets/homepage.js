const previewLink = document.querySelector('#workspace-preview');
const previewDialog = document.querySelector('#workspace-dialog');
const closeButton = previewDialog.querySelector('.close-dialog');

previewLink.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  previewDialog.showModal();
});

closeButton.addEventListener('click', () => previewDialog.close());
previewDialog.addEventListener('close', () => previewLink.focus({ preventScroll: true }));
previewDialog.addEventListener('click', event => {
  if (event.target !== previewDialog) return;
  const bounds = previewDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
    previewDialog.close();
  }
});
