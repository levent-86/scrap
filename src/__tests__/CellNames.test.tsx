import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { CellNames } from '../Popup/Options/CellNames';
import { type Header } from '../Popup/ControlCenter';

const HEADERS = 'headers';
const DEFAULT_ID_HEADER: Header = { label: 'ID', key: 'ID' };

// Mocks
const mockStorageGet = (
  data: Partial<Record<string, Header[] | undefined>>
) => {
  (chrome.storage.local.get as Mock).mockImplementation((keys, callback) => {
    const result: Record<string, Header[] | undefined> = {};
    if (Array.isArray(keys)) {
      keys.forEach((key) => (result[key] = data[key]));
    } else if (typeof keys === 'string') {
      result[keys] = data[keys];
    }

    callback(result);
  });
};

const mockStorageSet = chrome.storage.local.set as Mock;

beforeEach(() => {
  vi.resetAllMocks();

  mockStorageGet({
    [HEADERS]: [DEFAULT_ID_HEADER],
  });
});

describe('CellNames Component', () => {
  it('should load headers from chrome storage on mount', async () => {
    // Arrange
    const storedHeaders: Header[] = [
      DEFAULT_ID_HEADER,
      { label: 'Name', key: 'Name' },
      { label: 'Email', key: 'Email' },
    ];
    mockStorageGet({
      [HEADERS]: storedHeaders,
    });

    render(<CellNames />);

    // Assert
    const inputs = screen.getAllByPlaceholderText(
      'Field name'
    ) as HTMLInputElement[];
    expect(inputs).toHaveLength(3);

    expect(inputs[0].value).toBe('ID');
    expect(inputs[0].disabled).toBe(true);

    expect(inputs[1].value).toBe('Name');
    expect(inputs[2].value).toBe('Email');
  });

  it('should add a new empty input field when "+" button is clicked', async () => {
    const user = userEvent.setup();
    render(<CellNames />);

    // First input (ID)
    expect(screen.getAllByPlaceholderText('Field name')).toHaveLength(1);

    const addButton = screen.getByTestId('add-btn');
    await user.click(addButton);

    const inputsAfterAdd = screen.getAllByPlaceholderText(
      'Field name'
    ) as HTMLInputElement[];

    expect(inputsAfterAdd).toHaveLength(2);
    expect(inputsAfterAdd[1].value).toBe('');
  });

  it('should remove the last input field when "-" button is clicked', async () => {
    const user = userEvent.setup();
    render(<CellNames />);

    // Arrange: add one for second label
    const addButton = screen.getByTestId('add-btn');
    await user.click(addButton); // ['ID', '']

    expect(screen.getAllByPlaceholderText('Field name')).toHaveLength(2);

    const subButton = screen.getByTestId('sub-btn');
    await user.click(subButton);

    const idInput = screen.getAllByPlaceholderText(
      'Field name'
    )[0] as HTMLInputElement;

    // Latest one removed, only ID remains (1)
    expect(screen.getAllByPlaceholderText('Field name')).toHaveLength(1);
    expect(idInput.value).toBe('ID');
  });

  it('should disable the "-" button when only the mandatory ID input remains', async () => {
    render(<CellNames />);

    const subButton = screen.getByTestId('sub-btn') as HTMLInputElement;

    expect(subButton.disabled).toBe(true);

    const addButton = screen.getByTestId('add-btn');
    await userEvent.click(addButton);

    expect(subButton.disabled).toBe(false);
  });

  it('should update the header label and key when a non-ID input changes', async () => {
    const user = userEvent.setup();
    render(<CellNames />);

    // Arrange: Add a new input
    const addButton = screen.getByTestId('add-btn');
    await user.click(addButton);

    const inputs = screen.getAllByPlaceholderText('Field name');
    const inputField = inputs[1] as HTMLInputElement;

    const testValue = 'Customer_Name';

    // Act: Add a new value on input
    await user.type(inputField, testValue);

    // Assert: Input value should updated
    expect(inputField.value).toBe(testValue);
  });

  it('should NOT update the header label or key when the ID input changes', async () => {
    const user = userEvent.setup();
    render(<CellNames />);

    const idInput = screen.getAllByPlaceholderText(
      'Field name'
    )[0] as HTMLInputElement;

    // Assert: ID input should be disabled
    expect(idInput.disabled).toBe(true);

    // Act: Try enter a value
    await user.type(idInput, 'Deneme');

    // Assert: Value didn't change
    expect(idInput.value).toBe('ID');
  });

  it('should save non-empty headers, preserving the mandatory ID header', async () => {
    const user = userEvent.setup();

    // Arrange: ID and empty header
    mockStorageGet({
      [HEADERS]: [
        DEFAULT_ID_HEADER,
        { label: 'A', key: 'A' },
        { label: 'B', key: 'B' },
      ],
    });

    render(<CellNames />);

    const inputs = screen.getAllByPlaceholderText('Field name'); // ['ID', 'A', 'B']

    // 1. Update A
    await user.clear(inputs[1]);
    await user.type(inputs[1], 'New_A');

    // 2. Clear B
    await user.clear(inputs[2]);

    // 3. Add a field and fill
    const addButton = screen.getByTestId('add-btn');
    await user.click(addButton);

    const newInputs = screen.getAllByPlaceholderText('Field name');
    const inputForY = newInputs[3] as HTMLInputElement;
    await user.type(inputForY, 'FIELD_Y');

    // Act: Save
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    await user.click(saveButton);

    // Assert: Empty B should be filtered, ID, New_A ve FIELD_Y should be saved
    const expectedSaveData: Header[] = [
      DEFAULT_ID_HEADER,
      { label: 'New_A', key: 'New_A' },
      { label: 'FIELD_Y', key: 'FIELD_Y' },
    ];

    expect(mockStorageSet).toHaveBeenCalledWith({
      [HEADERS]: expectedSaveData,
    });
  });

  it('should save only the ID header if all other fields are empty', async () => {
    const user = userEvent.setup();

    // Arrange: ID and an empty header
    mockStorageGet({
      [HEADERS]: [DEFAULT_ID_HEADER, { label: '', key: '' }],
    });
    render(<CellNames />);

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    await user.click(saveButton);

    // Assert: only ID should be saved
    const expectedSaveData: Header[] = [DEFAULT_ID_HEADER];

    expect(mockStorageSet).toHaveBeenCalledWith({
      [HEADERS]: expectedSaveData,
    });
  });
});
