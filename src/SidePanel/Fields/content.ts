/*
content.ts

Event listener for keyboard.
Listens keyboard event of user pushed and pass as message to Fields.tsx
*/

document.addEventListener('keydown', (event) => {
  if (event.key >= '1' && event.key <= '9' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
    const targetIndex = parseInt(event.key, 10);

    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : '';

    if (selectedText) {
      event.preventDefault();

      chrome.runtime.sendMessage({
        action: 'fillField',
        index: targetIndex,
        data: selectedText,
      });

      selection?.removeAllRanges();
    }
  }
});

console.log('NeuraLetter Suite: Scrap Content Script Loaded.');
