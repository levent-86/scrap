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

  const prevUrls: Record<number, string | null> = {};
  let prevHost: string | null = null;
  let currHost: string | null = null;

  //Triggers when tab updated
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //   set previous and current URLS while loading
    if (changeInfo.status === 'loading' && tab.url) {
      const previous = prevUrls[tabId] || null;
      const current = tab.url;
      if (previous) {
        prevHost = new URL(previous).hostname;
      } else {
        prevHost = null;
      }
      currHost = new URL(String(current)).hostname;

      // Current now becomes previous for next update
      prevUrls[tabId] = current;

      // Take action when complete
    } else if (changeInfo.status === 'complete' && tab.active) {
      if (prevHost !== currHost) {
        notifyTabChange();
      }
    }
  });
};
