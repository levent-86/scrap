/* 
ControlCenter.tsx

All popup preferences, additions and features
are declared in this component.
*/

import { useEffect } from 'react';
import { WorkStarter } from './WorkStarter/WorkStarter';
import { CellNames } from './Options/CellNames';

interface InitProps {
  showSidePanel: boolean;
}

export interface Header {
  label: string;
  key: string;
}
interface Data {
  [key: string]: string | number | boolean | null;
}

const PANEL_KEY = 'showSidePanel';
const HEADERS = 'headers';
const DATA = 'data';

export const ControlCenter = () => {
  const InitialValues: InitProps = {
    showSidePanel: false,
  };

  const headers: Header[] = [{ label: 'ID', key: 'ID' }];

  const data: Data[] = [];

  // Side Panel
  useEffect(() => {
    chrome.storage.local.get([PANEL_KEY], (result) => {
      if (result[PANEL_KEY] === undefined) {
        chrome.storage.local.set(InitialValues);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Headers
  useEffect(() => {
    chrome.storage.local.get(HEADERS, (result) => {
      if (result[HEADERS] === undefined) {
        chrome.storage.local.set({ [HEADERS]: headers });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Data
  useEffect(() => {
    chrome.storage.local.get(DATA, (result) => {
      if (result[DATA] === undefined) {
        chrome.storage.local.set({ [DATA]: data });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input type="radio" name="control-center" defaultChecked />
        <div className="collapse-title font-semibold">Cell Names</div>
        <div className="collapse-content text-sm">
          <CellNames />
        </div>
      </div>

      <WorkStarter />
    </>
  );
};
