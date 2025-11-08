/*
Export.tsx

This file takes whole data from chrome.store
and exports as .csv file.
After export, resets "data" and "headers"
- Gets headers and data on first mount while listens data
*/

import { useEffect, useState } from 'react';
import { type Header, type Data } from '../../Popup/ControlCenter';
import { JsonToCsvDownload } from '@simuratli/react-json-csv-converter';

const HEADERS = 'headers';
const DATA = 'data';

export const Export = () => {
  const [headers, setHeaders] = useState<Header[] | undefined>([]);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    chrome.storage.local.get(HEADERS, (result) => {
      const storedHeaders = result[HEADERS] as Header[] | undefined;
      setHeaders(storedHeaders);
    });

    chrome.storage.local.get(DATA, (result) => {
      const initialData = (result[DATA] as Data[] | undefined) || [];
      setData(initialData);
    });

    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      const newData = (changes?.[DATA]?.newValue as Data[] | undefined) || [];
      setData(newData);
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  const handleAfterDownload = () => {
    const defaultHeaders: Header[] = [{ label: 'ID', key: 'ID' }];
    const defaultData: Data[] = [];

    chrome.storage.local.set({ [HEADERS]: defaultHeaders });
    chrome.storage.local.set({ [DATA]: defaultData });

    setHeaders(defaultHeaders);
    setData(defaultData);
  };

  return (
    <>
      <JsonToCsvDownload
        headers={headers}
        data={data}
        filename="neuraletter_suite_scrap.CSV"
        onDownload={handleAfterDownload}
        className="btn"
        disabled={data.length < 1}
      >
        Export as CSV
      </JsonToCsvDownload>
    </>
  );
};
