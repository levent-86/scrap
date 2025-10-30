import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { Export } from '../SidePanel/Export/Export';
import { type Header, type Data } from '../Popup/ControlCenter';

interface JsonToCsvDownloadProps {
  headers: Header[] | undefined;
  data: Data[];
  filename: string;
  onDownload: () => void;
  className: string;
  children: React.ReactNode;
}

// Mock funcs for CSV download
const mockJsonToCsvDownload = vi.fn((props) => (
  <button onClick={props.onDownload} data-testid="export-button">
    {props.children}
  </button>
));

vi.mock('@simuratli/react-json-csv-converter', () => ({
  JsonToCsvDownload: (props: JsonToCsvDownloadProps) =>
    mockJsonToCsvDownload(props),
}));
// ---

const HEADERS = 'headers';
const DATA = 'data';

// Mock Functions
const mockStorageGet = chrome.storage.local.get as Mock;
const mockStorageSet = chrome.storage.local.set as Mock;

// default datas
const MOCK_HEADERS: Header[] = [
  { label: 'ID', key: 'ID' },
  { label: 'Name', key: 'Name' },
];
const MOCK_DATA: Data[] = [
  { ID: 1, Name: 'Alice' },
  { ID: 2, Name: 'Bob' },
];

const DEFAULT_ID_HEADER: Header[] = [{ label: 'ID', key: 'ID' }];

// Mock settings
const setupMocks = (
  headers: Header[] | undefined,
  data: Data[] | undefined
) => {
  mockStorageGet.mockImplementation((keys, callback) => {
    const result: Record<string, unknown> = {};
    if (Array.isArray(keys)) {
      if (keys.includes(HEADERS)) result[HEADERS] = headers;
      if (keys.includes(DATA)) result[DATA] = data;
    } else {
      if (keys === HEADERS) result[HEADERS] = headers;
      if (keys === DATA) result[DATA] = data;
    }

    callback(result);
  });
};

beforeEach(() => {
  vi.clearAllMocks();
  mockJsonToCsvDownload.mockClear();
});

describe('Export Component', () => {
  it('should load headers and data from storage on mount', async () => {
    // Arrange
    setupMocks(MOCK_HEADERS, MOCK_DATA);

    // Act
    render(<Export />);

    // Assert
    await waitFor(() => {
      expect(mockJsonToCsvDownload).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: MOCK_HEADERS,
          data: MOCK_DATA,
          filename: 'neuraletter_suite_scrap.CSV',
        })
      );

      expect(screen.getByText('Export as CSV')).toBeTruthy();
    });
  });

  it('should load empty data if storage returns undefined', async () => {
    // Arrange
    setupMocks(DEFAULT_ID_HEADER, undefined);

    // Act
    render(<Export />);

    // Assert
    await waitFor(() => {
      expect(mockJsonToCsvDownload).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: DEFAULT_ID_HEADER,
          data: [],
        })
      );
    });
  });

  it('should reset headers and data in storage after download', async () => {
    // Arrange: Render with data at first
    setupMocks(MOCK_HEADERS, MOCK_DATA);
    render(<Export />);

    const exportButton = await screen.findByTestId('export-button');

    // Act: click on Export button
    fireEvent.click(exportButton);

    const expectedDefaultData: Data[] = [];
    const expectedDefaultHeaders: Header[] = [{ label: 'ID', key: 'ID' }];

    await waitFor(() => {
      // 1. HEADERS reset called
      expect(mockStorageSet).toHaveBeenCalledWith({
        [HEADERS]: expectedDefaultHeaders,
      });

      // 2. DATA reset called
      expect(mockStorageSet).toHaveBeenCalledWith({
        [DATA]: expectedDefaultData,
      });
    });

    // Assert 2: Component state reset called
    await waitFor(() => {
      expect(mockJsonToCsvDownload).toHaveBeenCalledTimes(3);
      expect(mockJsonToCsvDownload).toHaveBeenLastCalledWith(
        expect.objectContaining({
          headers: expectedDefaultHeaders,
          data: expectedDefaultData,
        })
      );
    });
  });
});
