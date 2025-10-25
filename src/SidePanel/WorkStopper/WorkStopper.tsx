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

        <div className="flex flex-row">
          <div className="ring-info rounded-full ring-1 text-center text-info w-9 h-5 mr-1">
            i
          </div>
          <p>
            Stop the worker to close the side panel and save your system
            resources.
          </p>
        </div>
      </div>
    </>
  );
};
