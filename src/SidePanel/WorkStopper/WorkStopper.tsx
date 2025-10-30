/* 
WorkStopper.tsx

Finishes side panel work and tries to close for every tabs.
Updates "showSidePanel" as false to stop listener.
Look at src/background/SidePanel/listeners/SidePanelListener.ts
*/

export const WorkStopper = () => {
  const btnHandler = async () => {
    await chrome.storage.local.set({ showSidePanel: false });

    await chrome.sidePanel.setOptions({
      path: 'sidepanel.html',
      enabled: false,
    });

    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
  };

  return (
    <>
      <div className="flex flex-col">
        <button onClick={btnHandler} className="btn">
          STOP
        </button>

        <div className="flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-9 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>
            Click the Stop button to close the side panel and save your system
            resources.
          </p>
        </div>
      </div>
    </>
  );
};
