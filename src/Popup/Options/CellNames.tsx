/* 
CellNames.tsx

This component accepts cell names to save to chrome.storage.
CRUD operations - add, remove, and change cell names.
*/

import React, { useEffect, useState } from 'react';
import { type Header } from '../ControlCenter';

const HEADERS = 'headers';

export const CellNames = () => {
  const [headers, setHeaders] = useState<Header[] | undefined>(undefined);

  useEffect(() => {
    chrome.storage.local.get(HEADERS, (result) => {
      const storedHeaders = result[HEADERS] as Header[] | undefined;

      if (Array.isArray(storedHeaders)) {
        setHeaders(storedHeaders);
      }
    });
  }, []);

  const handleAddButton = () => {
    setHeaders((prevHeaders) => {
      const currentHeaders = prevHeaders || [{ label: 'ID', key: 'ID' }];

      const newHeader: Header = { label: ``, key: `` };

      return [...currentHeaders, newHeader];
    });
  };

  const handleSubButton = () => {
    setHeaders((prevHeaders) => {
      if (!prevHeaders) return undefined;

      if (prevHeaders.length > 1) {
        return prevHeaders.slice(0, -1);
      }
      return prevHeaders;
    });
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newLabel = e.target.value;

    setHeaders((prevHeaders) => {
      if (!prevHeaders) return undefined;
      if (index === 0) return prevHeaders;

      const updatedHeaders = [...prevHeaders];

      updatedHeaders[index] = {
        label: newLabel,
        key: newLabel.length > 0 ? newLabel : '',
      };

      return updatedHeaders;
    });
  };

  const handleSave = () => {
    if (!headers) return;

    const headersToSave = headers.filter((header, index) => {
      if (index === 0) return true;

      return header.label !== '';
    });

    chrome.storage.local.set({ [HEADERS]: headersToSave });
  };
  return (
    <>
      {/* Cells */}
      {headers?.map((header, index) => (
        <input
          type="text"
          placeholder={'Field name'}
          className="input mb-3"
          key={index}
          onChange={(e) => handleInput(e, index)}
          value={header.label}
          disabled={index === 0}
        />
      ))}

      {/* Add button */}
      <div className="flex flex-row justify-center w-full">
        <button
          className="btn btn-circle btn-success"
          onClick={handleAddButton}
          data-testid="add-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        {/* Sub button */}
        <button
          className="btn btn-circle btn-error ml-3"
          disabled={headers !== undefined && headers.length <= 1}
          onClick={handleSubButton}
          data-testid="sub-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col w-full">
        <button className="btn btn-success mb-3" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </>
  );
};
