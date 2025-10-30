/*
Fields.tsx

This file will show header names as fields (taken from chrome.storage).
And when clicked to the button, data will be saved on local storage with header names.
And active data will be closed after data saved.
*/

import React, { useEffect, useState, useCallback } from 'react';
import { type Header, type Data } from '../../Popup/ControlCenter';

const HEADERS = 'headers';
const DATA = 'data';

interface NewRecord {
  [key: string]: string | number | boolean | null;
}

// Helper function: Find ID number in data
// !Do I need to spare this helper to another file?
const findNextId = (data: Data[] | undefined): number => {
  if (!data || data.length === 0) {
    return 1;
  }
  const maxId = data.reduce((max, current) => {
    const currentId = (current.ID as number) || 0;
    return Math.max(max, currentId);
  }, 0);

  return maxId + 1;
};

export const Fields = () => {
  const [headers, setHeaders] = useState<Header[] | undefined>(undefined);
  const [storedData, setStoredData] = useState<Data[]>([]);
  const [text, setText] = useState<NewRecord>({});

  // Load Headers
  useEffect(() => {
    chrome.storage.local.get(HEADERS, (result) => {
      const storedHeaders = result[HEADERS] as Header[] | undefined;
      setHeaders(storedHeaders);
    });
  }, []);

  // Load Data
  useEffect(() => {
    chrome.storage.local.get(DATA, (result) => {
      const initialData = (result[DATA] as Data[] | undefined) || [];
      setStoredData(initialData);

      const nextId = findNextId(initialData);
      setText({ ID: nextId });
    });
  }, []);

  // Update textarea
  // useCallback used for blocking rerender on each refresh
  // !Should I use useCallback for this?
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>, headerKey: string) => {
      const inputValue = e.target.value;

      setText((prevText) => ({
        ...prevText,
        [headerKey]: inputValue,
      }));
    },
    []
  );

  // Save, prepare for next input and close the tab
  const handleSave = () => {
    if (!headers || Object.keys(text).length <= 1) return;

    const newRecord: Data = text as Data;
    const updatedData = [...storedData, newRecord];

    chrome.storage.local.set({ [DATA]: updatedData }, async () => {
      console.log('Data saved:', newRecord);

      setStoredData(updatedData);

      const nextId = findNextId(updatedData);
      setText({ ID: nextId });

      try {
        const tabs = await chrome.tabs.query({
          currentWindow: true,
        });

        //   Don't close the last tab
        if (tabs.length > 1) {
          const activeTab = tabs.find((t) => t.active);

          if (activeTab && activeTab.id !== undefined) {
            await chrome.tabs.remove(activeTab.id);
            console.log(`Tab (ID: ${activeTab.id}) closed after save.`);
          }
        }
      } catch (error) {
        console.error('Something went wrong during close tab:', error);
      }
    });
  };

  // Show skeleton until headers loaded
  if (headers === undefined) {
    return (
      <>
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-24 w-full" data-testid="skeleton"></div>
        </div>
      </>
    );
  }

  return (
    <>
      {headers.map((header) => {
        const headerKey = header.key;

        const isIdField = headerKey === 'ID';
        const fieldValue = isIdField
          ? 'ID no: ' + text.ID || findNextId(storedData)
          : text[headerKey] || '';

        return (
          <textarea
            className="textarea textarea-accent textarea-sm mb-3 w-full"
            placeholder={header.label}
            key={headerKey}
            disabled={isIdField}
            onChange={(e) => handleInput(e, headerKey)}
            value={fieldValue as string}
          />
        );
      })}
      <button
        className="btn btn-primary w-full"
        onClick={handleSave}
        disabled={Object.keys(text).length <= 1}
      >
        Save and Close Tab
      </button>
    </>
  );
};
