/* 
SidePanelListener.ts

This listener watches 'showSidePanel' and its boolean in chrome.storage.
Enables/disables side panel for every tabs
*/

export function SidePanelListener() {
  // Listen chrome storage when tab updated
  chrome.tabs.onUpdated.addListener(async (tabId, _info, tab) => {
    if (!tab.url) return;

    const { showSidePanel } = await chrome.storage.local.get(['showSidePanel']);

    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: showSidePanel,
    });

    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: showSidePanel })
      .catch((error) => console.error(error));
  });

  // Do the same for activated tab
  chrome.tabs.onActivated.addListener(async () => {
    const { showSidePanel } = await chrome.storage.local.get([
      'showSidePanel',
    ]);

    await chrome.sidePanel.setOptions({
      path: 'sidepanel.html',
      enabled: showSidePanel,
    });

    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: showSidePanel })
      .catch((error) => console.error(error));
  });
}
