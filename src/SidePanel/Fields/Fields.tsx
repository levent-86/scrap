/*
Fields.tsx

This file will show header names as fields (taken from chrome.storage).
And when clicked to the button, data will be saved on local storage with header names.
And active data will be closed after data saved.
As a new feature, numbers on the keyboard are filling the related textarea.

! DO NOT turn this file into a godfile.
*/

import React, { useEffect, useState, useCallback } from 'react';
import { type Header, type Data } from '../../Popup/ControlCenter';
import { findNextId } from './Helpers';

const HEADERS = 'headers';
const DATA = 'data';

interface NewRecord {
  [key: string]: string | number | boolean | null;
}

interface FillFieldMessage {
  action: 'fillField';
  index: number;
  data: string;
}

interface TabSwitchedMessage {
  action: 'tabSwitched';
}

type MessageListener = (
  message:
    | FillFieldMessage
    | TabSwitchedMessage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { action: string; [key: string]: any },
  sender: chrome.runtime.MessageSender,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendResponse: (response?: any) => void
) => boolean | undefined;

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

  // New Feature: keyboard to textarea
  useEffect(() => {
    const messageListener: MessageListener = (message) => {
      // Lookup for switched tab
      if (message && message.action === 'tabSwitched') {
        const nextId = findNextId(storedData);
        setText({ ID: nextId });
      }

      if (message && message.action === 'fillField' && headers) {
        const fillMessage = message as FillFieldMessage;

        const targetIndex = fillMessage.index + 1; // Don't start from first textarea
        const collectedData = fillMessage.data;

        const headerIndex = targetIndex - 1;

        if (headerIndex >= 0 && headerIndex < headers.length) {
          const targetHeaderKey = headers[headerIndex].key;

          setText((prevText) => ({
            ...prevText,
            [targetHeaderKey]: collectedData,
          }));
        }
        return undefined;
      }

      return undefined;
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, [headers, storedData]);

  // Update textarea
  // useCallback used for blocking rerender on each refresh
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
      {/* Upper BTN */}
      <button
        className="btn btn-primary w-full mt-0 mb-3"
        onClick={handleSave}
        disabled={Object.keys(text).length <= 1}
      >
        Save and Close Tab
      </button>

      {/* Inputs */}
      {headers.map((header, index) => {
        const headerKey = header.key;

        const isIdField = headerKey === 'ID';
        const fieldValue = isIdField
          ? 'ID no: ' + text.ID || findNextId(storedData)
          : text[headerKey] || '';

        return (
          <>
            <label className="floating-label">
              <textarea
                className="textarea textarea-accent textarea-sm mb-3 w-full"
                placeholder={`${header.label} \n(Press ${index} on your keyboard after highlight a text)`}
                key={headerKey}
                onChange={(e) => handleInput(e, headerKey)}
                value={fieldValue as string}
                disabled={isIdField}
              />
              <span>{header.label}</span>
            </label>
          </>
        );
      })}

      {/* Lower BTN */}
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
