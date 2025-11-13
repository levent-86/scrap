/*
KeyboardListener.ts

Inject content.ts programatically
If user changes tab, send message for side panel
*/

export const KeyboardListener = async () => {
  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    if (tab.id !== undefined && tab.url && !tab.url.startsWith('chrome://')) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js'],
        });
        console.log(`Injected content.js into Tab ID: ${tab.id}`);
      } catch (e) {
        console.log(`Failed to inject into Tab ID: ${tab.id}:`, e);
      }
    }
  }

  // Inform Side Panel when message ID changed
  function notifyTabChange() {
    // Is tab changed (tab id not important)
    chrome.runtime
      .sendMessage({
        action: 'tabSwitched',
      })
      .catch((e) => {
        console.log('Failed to send message to side panel:', e);
      });
  }

  // Triggers when tab activated (switched to another)
  chrome.tabs.onActivated.addListener(() => {
    notifyTabChange();
  });

  //Triggers when tab updated
  chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
      notifyTabChange();
    }
  });
};
