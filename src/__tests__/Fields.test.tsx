import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { type Header, type Data } from '../Popup/ControlCenter';
import { Fields } from '../SidePanel/Fields/Fields';

vi.mock('../SidePanel/Fields/Helpers', () => ({
  findNextId: vi.fn((data: Data[] | undefined) => {
    if (!data || data.length === 0) return 1;
    const maxId = data.reduce(
      (max, current) => Math.max(max, (current.ID as number) || 0),
      0
    );
    return maxId + 1;
  }),
}));

const mockFindNextId = vi.mocked(
  (await import('../SidePanel/Fields/Helpers')).findNextId
);
// ---

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
  mockFindNextId.mockClear();

  mockFindNextId.mockReturnValue(3);

  setupMocks(MOCK_HEADERS, MOCK_STORED_DATA);
  mockTabsQuery.mockResolvedValue([
    { id: 101, active: false },
    { id: 102, active: true },
  ]);
  mockTabsRemove.mockResolvedValue(true);
  mockStorageSet.mockImplementation((_data, callback) => {
    if (callback) {
      callback();
    }
  });
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
    });

    const idField = screen.getByPlaceholderText('ID') as HTMLTextAreaElement;
    expect(idField.disabled).toBe(true);

    expect(idField.value).toBe('ID no: 3');
  });

  it('should calculate the next ID correctly for empty data', async () => {
    mockFindNextId.mockReturnValue(1);
    setupMocks(MOCK_HEADERS, []);
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

    await user.type(nameField, testValue);
    expect(nameField.value).toBe(testValue);
  });

  it('should disable the Save button when only the ID is present (no user input)', async () => {
    render(<Fields />);

    const saveButtons = (await screen.findAllByRole('button', {
      name: /Save and Close Tab/i,
    })) as HTMLButtonElement[];

    // Both buttons are disabled
    expect(saveButtons).toHaveLength(2);
    expect(saveButtons[0].disabled).toBe(true);
    expect(saveButtons[1].disabled).toBe(true);
  });

  it('should enable the Save button when user input is present (Object.keys(text).length > 1)', async () => {
    const user = userEvent.setup();
    render(<Fields />);

    const nameField = await screen.findByPlaceholderText('Name');

    const saveButtons = screen.getAllByRole('button', {
      name: /Save and Close Tab/i,
    }) as HTMLButtonElement[];

    await user.type(nameField, 'Test Data');

    expect(saveButtons[0].disabled).toBe(false);
    expect(saveButtons[1].disabled).toBe(false);
  });

  it('should save the new record, update ID, and close the active tab', async () => {
    const user = userEvent.setup();
    mockFindNextId.mockImplementationOnce(() => 3).mockReturnValue(4);

    render(<Fields />);

    const nameField = await screen.findByPlaceholderText('Name');

    const saveButton = screen.getAllByRole('button', {
      name: /Save and Close Tab/i,
    })[0] as HTMLButtonElement;

    await user.type(nameField, 'Kate');
    await user.type(screen.getByPlaceholderText('Note'), 'Fast Record');
    await user.click(saveButton);

    const expectedNewRecord: Data = {
      ID: 3,
      Name: 'Kate',
      Note: 'Fast Record',
    };
    const expectedUpdatedData: Data[] = [
      ...MOCK_STORED_DATA,
      expectedNewRecord,
    ];

    await waitFor(() => {
      expect(mockStorageSet).toHaveBeenCalledWith(
        { [DATA]: expectedUpdatedData },
        expect.any(Function)
      );

      expect(mockFindNextId).toHaveBeenCalledWith(expectedUpdatedData);
    });

    const idField = screen.getByPlaceholderText('ID') as HTMLTextAreaElement;
    expect(idField.value).toBe('ID no: 4');

    await waitFor(() => {
      expect(mockTabsRemove).toHaveBeenCalledWith(102);
    });
  });

  it('should NOT close the tab if only one tab is open', async () => {
    mockTabsQuery.mockResolvedValue([{ id: 101, active: true }]);
    render(<Fields />);

    const user = userEvent.setup();
    const nameField = await screen.findByPlaceholderText('Name');

    const saveButton = screen.getAllByRole('button', {
      name: /Save and Close Tab/i,
    })[0];

    await user.type(nameField, 'One Tab');
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockTabsRemove).not.toHaveBeenCalled();
    });

    expect(mockStorageSet).toHaveBeenCalled();
  });
});
