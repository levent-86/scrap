/* 
ControlCenter.tsx

All popup preferences, additions and features
are declared in this component.
*/

import { useEffect } from 'react';
import { WorkStarter } from './WorkStarter/WorkStarter';

interface InitProps {
  showSidePanel: boolean;
}

export const ControlCenter = () => {
  const InitialValues: InitProps = {
    showSidePanel: false,
  };

  useEffect(() => {
    chrome.storage.local.get(['showSidePanel'], (result) => {
      if (!result) {
        chrome.storage.local.set(InitialValues);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" defaultChecked />
        <div className="collapse-title font-semibold">Preferences</div>
        <div className="collapse-content text-sm">Preferences logic here</div>
      </div>

      <WorkStarter />
    </>
  );
};
