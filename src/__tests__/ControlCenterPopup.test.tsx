import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ControlCenter } from '../Popup/ControlCenter';

// Mock WorkStarter and CellNames
vi.mock('../WorkStarter/WorkStarter', () => ({
  WorkStarter: () => <button>Mocked WorkStarter</button>,
}));

vi.mock('../Options/CellNames', () => ({
  CellNames: () => <div>Mocked Cell Names</div>,
}));

// Mock Funcs
const mockStorageGet = chrome.storage.local.get as Mock;
const mockStorageSet = chrome.storage.local.set as Mock;

const PANEL_KEY = 'showSidePanel';
const CSV_DATA_KEY = 'csvDataRecords';

beforeEach(() => {
  vi.resetAllMocks();
  mockStorageGet.mockImplementation((keys, callback) => {
    const result: Record<string, unknown> = {};
    if (Array.isArray(keys)) {
      keys.forEach((key) => (result[key] = undefined));
    } else if (typeof keys === 'string') {
      result[keys] = undefined;
    }

    callback(result);
  });
});

describe('ControlCenter Component', () => {
  it('should render Cell Names collapse and Mocked WorkStarter', async () => {
    render(<ControlCenter />);

    expect(screen.getByText('Cell Names')).toBeTruthy();
    waitFor(() => {
      expect(screen.getByText('Mocked Cell Names')).toBeTruthy();
      expect(
        screen.getByRole('button', { name: /Mocked WorkStarter/i })
      ).toBeTruthy();
    });
  });

  it('should initialize showSidePanel to false if it does not exist in storage', async () => {
    // 1. Arrange: returning undefined for PANEL_KEY and CSV_DATA_KEY
    render(<ControlCenter />);

    // 2. Assert: did chrome.storage.local.set called for PANEL_KEY
    await waitFor(() => {
      expect(mockStorageSet).toHaveBeenCalledWith({ showSidePanel: false });
    });
  });

  it('should initialize CSV data with empty headers/records if it does not exist in storage', async () => {
    // 1. Arrange
    render(<ControlCenter />);

    // 2. Assert
    const expectedCsvData = { headers: [], records: [] };
    await waitFor(() => {
      expect(mockStorageSet).toHaveBeenCalledWith({
        [CSV_DATA_KEY]: expectedCsvData,
      });
    });
  });

  it('should NOT initialize showSidePanel if it already exists in storage', async () => {
    // 1. Arrange
    mockStorageGet.mockImplementation((keys, callback) => {
      const result: Record<string, unknown> = {};
      if (Array.isArray(keys) && keys.includes(PANEL_KEY)) {
        result[PANEL_KEY] = true;
      }
      result[CSV_DATA_KEY] = undefined;
      callback(result);
    });

    // 2. Act: Render
    render(<ControlCenter />);

    // 3. Assert: showSidePanel should NOT called
    await waitFor(() => {
      expect(mockStorageSet).not.toHaveBeenCalledWith({ showSidePanel: false });
    });
  });

  it('should NOT initialize CSV data if it already exists in storage', async () => {
    // 1. Arrange
    const existingData = { headers: ['ID'], records: [] };
    mockStorageGet.mockImplementation((keys, callback) => {
      const result: Record<string, unknown> = {};
      result[PANEL_KEY] = undefined;
      if (typeof keys === 'string' && keys === CSV_DATA_KEY) {
        result[CSV_DATA_KEY] = existingData;
      }
      callback(result);
    });

    // 2. Act: Render
    render(<ControlCenter />);

    // 3. Assert: CSV_DATA_KEY should NOT called
    const expectedCsvData = { headers: [], records: [] };
    await waitFor(() => {
      expect(mockStorageSet).not.toHaveBeenCalledWith({
        [CSV_DATA_KEY]: expectedCsvData,
      });
    });
  });
});
