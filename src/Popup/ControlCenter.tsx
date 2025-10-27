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

export interface CsvStorage {
  headers: string[];
  records: Array<{ [key: string]: string }>;
}

const PANEL_KEY = 'showSidePanel';
const CSV_DATA_KEY = 'csvDataRecords';

export const ControlCenter = () => {
  const InitialValues: InitProps = {
    showSidePanel: false,
  };

  const InitialCsvData: CsvStorage = {
    headers: [],
    records: [],
  };

  useEffect(() => {
    chrome.storage.local.get([PANEL_KEY], (result) => {
      if (result[PANEL_KEY] === undefined) {
        chrome.storage.local.set(InitialValues);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chrome.storage.local.get(CSV_DATA_KEY, (result) => {
      if (result[CSV_DATA_KEY] === undefined) {
        chrome.storage.local.set({ [CSV_DATA_KEY]: InitialCsvData });
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
