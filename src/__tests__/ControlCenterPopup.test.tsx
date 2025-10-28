import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ControlCenter } from '../Popup/ControlCenter';

// Mock WorkStarter ve CellNames
vi.mock('../WorkStarter/WorkStarter', () => ({
  WorkStarter: () => <button>Mocked WorkStarter</button>,
}));

vi.mock('../Options/CellNames', () => ({
  CellNames: () => <div>Mocked Cell Names</div>,
}));

// Constants
const PANEL_KEY = 'showSidePanel';
const HEADERS = 'headers';
const DATA = 'data';

// Mock Funs
const mockStorageGet = chrome.storage.local.get as Mock;
const mockStorageSet = chrome.storage.local.set as Mock;

beforeEach(() => {
  vi.resetAllMocks();
  mockStorageGet.mockImplementation((keys, callback) => {
    const result: Record<string, unknown> = {};
    const keyArray = Array.isArray(keys) ? keys : [keys];

    keyArray.forEach((key) => {
      result[key] = undefined;
    });

    callback(result);
  });
});

describe('ControlCenter Component', () => {
  it('should render Cell Names collapse and Mocked WorkStarter', async () => {
    render(<ControlCenter />);

    expect(screen.getByText('Cell Names')).toBeTruthy();
    waitFor(() => expect(screen.getByText('Mocked Cell Names')).toBeTruthy());

    waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Mocked WorkStarter/i })
      ).toBeTruthy()
    );
  });

  it('should initialize showSidePanel to false if it does not exist in storage', async () => {
    render(<ControlCenter />);

    await waitFor(() => {
      expect(mockStorageSet).toHaveBeenCalledWith({ showSidePanel: false });
    });
  });

  it('should NOT initialize showSidePanel if it already exists in storage', async () => {
    // 1. Arrange: return data for PANEL_KEY
    mockStorageGet.mockImplementation((keys, callback) => {
      const result: Record<string, unknown> = {};
      const keyArray = Array.isArray(keys) ? keys : [keys];

      keyArray.forEach((key) => {
        if (key === PANEL_KEY) {
          result[PANEL_KEY] = true;
        } else {
          result[key] = undefined;
        }
      });
      callback(result);
    });

    // 2. Act: Render
    render(<ControlCenter />);

    // 3. Assert: should call set for showSidePanel
    await waitFor(() => {
      expect(mockStorageSet).not.toHaveBeenCalledWith({ showSidePanel: false });
    });
  });

  it('should initialize HEADERS with default data if it does not exist in storage', async () => {
    // 1. Arrange
    render(<ControlCenter />);

    // 2. Assert
    const expectedHeaders = [{ label: 'ID', key: 'ID' }];
    await waitFor(() => {
      expect(mockStorageSet).toHaveBeenCalledWith({
        [HEADERS]: expectedHeaders,
      });
    });
  });

  it('should NOT initialize HEADERS if it already exists in storage', async () => {
    // 1. Arrange: return data for HEADERS
    const existingHeaders = [{ label: 'Name', key: 'name' }];
    mockStorageGet.mockImplementation((keys, callback) => {
      const result: Record<string, unknown> = {};
      const keyArray = Array.isArray(keys) ? keys : [keys];

      keyArray.forEach((key) => {
        if (key === HEADERS) {
          result[HEADERS] = existingHeaders;
        } else {
          result[key] = undefined;
        }
      });
      callback(result);
    });

    // 2. Act: Render
    render(<ControlCenter />);

    // 3. Assert: should call set for HEADERS
    const expectedHeaders = [{ label: 'ID', key: 'ID' }];
    await waitFor(() => {
      expect(mockStorageSet).not.toHaveBeenCalledWith({
        [HEADERS]: expectedHeaders,
      });
    });
  });

  it('should initialize DATA with empty array if it does not exist in storage', async () => {
    // 1. Arrange
    render(<ControlCenter />);

    // 2. Assert
    const expectedData: [] = [];
    await waitFor(() => {
      expect(mockStorageSet).toHaveBeenCalledWith({
        [DATA]: expectedData,
      });
    });
  });

  it('should NOT initialize DATA if it already exists in storage', async () => {
    // 1. Arrange: return data for DATA
    const existingData = [{ ID: 'some_id' }];
    mockStorageGet.mockImplementation((keys, callback) => {
      const result: Record<string, unknown> = {};
      const keyArray = Array.isArray(keys) ? keys : [keys];

      keyArray.forEach((key) => {
        if (key === DATA) {
          result[DATA] = existingData;
        } else {
          result[key] = undefined;
        }
      });
      callback(result);
    });

    // 2. Act: Render
    render(<ControlCenter />);

    // 3. Assert: should call set for DATA
    const expectedData: [] = [];
    await waitFor(() => {
      expect(mockStorageSet).not.toHaveBeenCalledWith({
        [DATA]: expectedData,
      });
    });
  });
});
