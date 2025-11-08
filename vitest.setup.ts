/* 
vitest.setup.ts

This is a main structure of testing chrome API
All used chrome APIs are belongs here.
*/

import { vi } from 'vitest';

const mockRemoveListener = vi.fn();

const chromeMock = {
  tabs: {
    onUpdated: {
      addListener: vi.fn(),
    },
    onActivated: {
      addListener: vi.fn(),
    },
    query: vi.fn(() => Promise.resolve([])),
    remove: vi.fn(() => Promise.resolve()),
  },
  storage: {
    local: {
      get: vi.fn((_keys, callback) => {
        if (callback) {
          callback({});
        }
      }),
      set: vi.fn((_keys, callback) => {
        if (callback) {
          callback();
        }
      }),
    },
    onChanged: {
      addListener: vi.fn(),
      removeListener: mockRemoveListener,
    },
  },
  sidePanel: {
    setOptions: vi.fn(() => Promise.resolve()),
    setPanelBehavior: vi.fn(() => Promise.resolve()),
    open: vi.fn(() => Promise.resolve()),
  },
};

vi.stubGlobal('chrome', chromeMock);
