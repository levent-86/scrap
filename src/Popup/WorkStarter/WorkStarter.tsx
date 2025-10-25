/* 
WorkStarter.tsx

Provides a button for popup to open side panel
*/

export const WorkStarter = () => {
  const btnHandler = async () => {
    await chrome.storage.local.set({ showSidePanel: true });

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id) return;

    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: 'sidepanel.html',
      enabled: true,
    });

    // Open up the side panel with user interactions
    try {
      await chrome.sidePanel.open({ tabId: tab.id });
    } catch (err) {
      console.error('Side panel could not be opened programmatically:', err);
    }
  };

  return (
    <button onClick={btnHandler} className="btn w-full">
      START
    </button>
  );
};
