import React, { useEffect, useState } from 'react';
import { type CsvStorage } from '../ControlCenter';

const CSV_DATA_KEY = 'csvDataRecords';

export const CellNames = () => {
  const [headers, setHeaders] = useState<string[]>(['']);

  useEffect(() => {
    chrome.storage.local.get(CSV_DATA_KEY, (result) => {
      const storedData = result[CSV_DATA_KEY] as CsvStorage;

      if (storedData && storedData.headers && storedData.headers.length > 0) {
        // Eğer kayıtlı başlıklar varsa, state'i onlarla başlat
        setHeaders(storedData.headers);
      }
    });
  }, []);

  const handleAddButton = () => {
    setHeaders((prevHeaders) => [...prevHeaders, '']);
  };

  const handleSubButton = () => {
    setHeaders((prevHeaders) => prevHeaders.slice(0, -1));
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newHeaderName = e.target.value;

    setHeaders((prevHeaders) => {
      const updatedHeaders = [...prevHeaders];
      updatedHeaders[index] = newHeaderName;
      return updatedHeaders;
    });
  };

  const handleSave = () => {
    // Sadece başlıkları güncellemek için mevcut veriyi okumalıyız
    chrome.storage.local.get(CSV_DATA_KEY, (result) => {
      const storedData = result[CSV_DATA_KEY] as CsvStorage;

      // Mevcut kayıtları koruyarak sadece başlıkları güncelle
      const updatedData: CsvStorage = {
        headers: headers.filter((h) => h.trim() !== ''), // Boş başlıkları filtrele
        records: storedData ? storedData.records : [], // Kayıtları koru
      };

      chrome.storage.local.set({ [CSV_DATA_KEY]: updatedData });
    });
  };
  return (
    <>
      {/* Cells */}
      {headers.map((header, index) => (
        <input
          type="text"
          placeholder="Field name"
          className="input mb-3"
          key={index}
          onChange={(e) => handleInput(e, index)}
          value={header}
        />
      ))}

      {/* Add - Sub buttons */}
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

        <button
          className="btn btn-circle btn-error ml-3"
          disabled={headers.length <= 1}
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
