/* 
vitest.setup.ts

This is a main structure of testing chrome API
All used chrome APIs are belongs here.
*/

import { vi } from 'vitest';

const chromeMock = {
  tabs: {
    onUpdated: {
      addListener: vi.fn(),
    },
    onActivated: {
      addListener: vi.fn(),
    },
    query: vi.fn(() => Promise.resolve([])),
  },
  storage: {
    local: {
      get: vi.fn(() => Promise.resolve({})),
      set: vi.fn(() => Promise.resolve()),
    },
  },
  sidePanel: {
    setOptions: vi.fn(() => Promise.resolve()),
    setPanelBehavior: vi.fn(() => Promise.resolve()),
    open: vi.fn(() => Promise.resolve()),
  },
  runtime: {
    // onMessage: { ... } for future features...
  },
};

vi.stubGlobal('chrome', chromeMock);
