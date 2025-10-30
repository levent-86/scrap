import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { type Header, type Data } from '../Popup/ControlCenter';
import { Fields } from '../SidePanel/Fields/Fields';

const HEADERS = 'headers';
const DATA = 'data';

// Mock Funcs
const mockStorageGet = chrome.storage.local.get as Mock;
const mockStorageSet = chrome.storage.local.set as Mock;
const mockTabsQuery = chrome.tabs.query as Mock;
const mockTabsRemove = chrome.tabs.remove as Mock;

// Default Test Data
const MOCK_HEADERS: Header[] = [
  { label: 'ID', key: 'ID' },
  { label: 'Name', key: 'Name' },
  { label: 'Note', key: 'Note' },
];

const MOCK_STORED_DATA: Data[] = [
  { ID: 1, Name: 'John', note: 'Note 1' },
  { ID: 2, Name: 'Jane', note: 'Note 2' },
];

// Mock settings
const setupMocks = (
  headers: Header[] | undefined,
  data: Data[] | undefined
) => {
  mockStorageGet.mockImplementation((keys, callback) => {
    const result: Record<string, unknown> = {};
    if (keys === HEADERS) {
      result[HEADERS] = headers;
    } else if (keys === DATA) {
      result[DATA] = data;
    }
    callback(result);
  });
};

beforeEach(() => {
  vi.resetAllMocks();

  setupMocks(MOCK_HEADERS, MOCK_STORED_DATA);
  mockTabsQuery.mockResolvedValue([
    { id: 101, active: false }, // Another tab
    { id: 102, active: true }, // Active tab
  ]);
  mockTabsRemove.mockResolvedValue(true);
});

describe('Fields Component', () => {
  it('should show skeleton until headers are loaded', () => {
    setupMocks(undefined, undefined);
    render(<Fields />);

    expect(screen.queryByText(/ID no:/i)).toBeNull();

    const skeletonDiv = screen.getByTestId('skeleton');
    expect(skeletonDiv).toBeTruthy();
  });

  it('should render all fields once headers and data are loaded', async () => {
    render(<Fields />);

    await waitFor(() => {
      expect(screen.getAllByRole('textbox')).toHaveLength(3);

      expect(screen.getByPlaceholderText('ID')).toBeTruthy();
      expect(screen.getByPlaceholderText('Name')).toBeTruthy();
      expect(screen.getByPlaceholderText('Note')).toBeTruthy();
    });

    // ID fiel disabled and and show indicator
    const idField = screen.getByPlaceholderText('ID') as HTMLTextAreaElement;
    expect(idField.disabled).toBe(true);
    expect(idField.value).toBe('ID no: 3'); // should be 3 after MOCK_STORED_DATA's data
  });

  it('should calculate the next ID correctly for empty data', async () => {
    setupMocks(MOCK_HEADERS, []); // Empty data
    render(<Fields />);

    await waitFor(() => {
      const idField = screen.getByPlaceholderText('ID') as HTMLTextAreaElement;
      expect(idField.value).toBe('ID no: 1');
    });
  });

  it('should update the text state on input change', async () => {
    const user = userEvent.setup();
    render(<Fields />);

    const nameField = (await screen.findByPlaceholderText(
      'Name'
    )) as HTMLTextAreaElement;
    const testValue = 'Joan';

    // Act: Write entry
    await user.type(nameField, testValue);

    // Assert: Feild value updated
    expect(nameField.value).toBe(testValue);
  });

  it('should disable the Save button when only the ID is present (no user input)', async () => {
    render(<Fields />);

    const saveButton = (await screen.findByRole('button', {
      name: /Save and Close Tab/i,
    })) as HTMLButtonElement;

    expect(saveButton.disabled).toBe(true);
  });

  it('should enable the Save button when user input is present (Object.keys(text).length > 1)', async () => {
    const user = userEvent.setup();
    render(<Fields />);

    const nameField = await screen.findByPlaceholderText('Name');
    const saveButton = screen.getByRole('button', {
      name: /Save and Close Tab/i,
    }) as HTMLButtonElement;

    // Act: Type
    await user.type(nameField, 'Test Data');

    // Assert: Button enable
    expect(saveButton.disabled).toBe(false);
  });

  it('should save the new record, update ID, and close the active tab', async () => {
    const user = userEvent.setup();
    render(<Fields />);

    const nameField = await screen.findByPlaceholderText('Name');
    const saveButton = screen.getByRole('button', {
      name: /Save and Close Tab/i,
    }) as HTMLButtonElement;

    // Act 1: Write inputs
    await user.type(nameField, 'Kate');
    await user.type(screen.getByPlaceholderText('Note'), 'Fast Record');

    // Act 2: Click save
    await user.click(saveButton);

    // 1. Assert: New record should be with the new ID
    const expectedNewRecord: Data = {
      ID: 3,
      Name: 'Kate',
      Note: 'Fast Record',
    };
    const expectedUpdatedData: Data[] = [
      ...MOCK_STORED_DATA,
      expectedNewRecord,
    ];

    // mockStorageSet gets callback as a function
    // with 'expect.any(Function)' usage, skip callback function
    await waitFor(() => {
      expect(mockStorageSet).toHaveBeenCalledWith(
        { [DATA]: expectedUpdatedData },
        expect.any(Function)
      );
    });

    // 2. Assert (ID Reset): ID value updated to the next value
    const idField = screen.getByPlaceholderText('ID') as HTMLTextAreaElement;
    expect(idField.value).toBe('ID no: 4');

    // 3. Assert (Close tab): Call tab close (Active tab ID: 102)
    await waitFor(() => {
      expect(mockTabsRemove).toHaveBeenCalledWith(102);
    });
  });

  it('should NOT close the tab if only one tab is open', async () => {
    // Arrange: Only one tab active
    mockTabsQuery.mockResolvedValue([{ id: 101, active: true }]);
    render(<Fields />);

    const user = userEvent.setup();
    const nameField = await screen.findByPlaceholderText('Name');
    const saveButton = screen.getByRole('button', {
      name: /Save and Close Tab/i,
    });

    // Act: Save a new entry
    await user.type(nameField, 'One Tab');
    await user.click(saveButton);

    // Assert: Tab close didn't called
    await waitFor(() => {
      expect(mockTabsRemove).not.toHaveBeenCalled();
    });

    // Also entry saved
    expect(mockStorageSet).toHaveBeenCalled();
  });
});
