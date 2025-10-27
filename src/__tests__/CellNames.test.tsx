import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { CellNames } from '../Popup/Options/CellNames';
import { type CsvStorage } from '../Popup/ControlCenter';

const CSV_DATA_KEY = 'csvDataRecords';

// Mocks
const mockStorageGet = (
  data: Partial<Record<string, CsvStorage | undefined>>
) => {
  (chrome.storage.local.get as Mock).mockImplementation((keys, callback) => {
    const result: Record<string, CsvStorage | undefined> = {};
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
  mockStorageGet({});
});

describe('CellNames Component', () => {
  it('should render an initial empty input field', async () => {
    // 1. Arrange
    mockStorageGet({
      [CSV_DATA_KEY]: { headers: [''], records: [] },
    });

    // 2. Act: Render
    render(<CellNames />);

    // 3. Assert
    const inputs = screen.getAllByPlaceholderText(
      'Field name'
    ) as HTMLInputElement[];
    expect(inputs).toHaveLength(1);
    expect(inputs[0].value).toBe('');
  });

  it('should load headers from chrome storage on mount', async () => {
    // 1. Arrange
    const storedHeaders = ['Name', 'Email', 'Phone'];
    mockStorageGet({
      [CSV_DATA_KEY]: { headers: storedHeaders, records: [] },
    });

    // 2. Act: Render
    render(<CellNames />);

    // 3. Assert
    const inputs = screen.getAllByPlaceholderText(
      'Field name'
    ) as HTMLInputElement[];
    expect(inputs).toHaveLength(3);
    expect(inputs.map((i) => i.value)).toEqual(storedHeaders);
  });

  it('should add a new empty input field when "+" button is clicked', async () => {
    const user = userEvent.setup();
    render(<CellNames />);

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

    // 1. Arrange: Add 2 inputs
    const addButton = screen.getByTestId('add-btn');
    await user.click(addButton);

    expect(screen.getAllByPlaceholderText('Field name')).toHaveLength(2);

    const subButton = screen.getByTestId('sub-btn');

    await user.click(subButton);

    expect(screen.getAllByPlaceholderText('Field name')).toHaveLength(1);
  });

  it('should disable the "-" button when only one input remains', async () => {
    render(<CellNames />);

    // 1. Arrange: Sub btn
    const subButton = screen.getByTestId('sub-btn') as HTMLInputElement;

    expect(subButton.disabled).toBe(true);

    // 2. Act: Ekle ve disabled durumunu kontrol et
    const addButton = screen.getByTestId('add-btn');
    await userEvent.click(addButton);

    expect(subButton.disabled).toBe(false);

    // 3. Act: Çıkar ve disabled durumunu tekrar kontrol et
    await userEvent.click(subButton);

    expect(subButton.disabled).toBe(true);
  });

  it('should update the header name when input changes', async () => {
    const user = userEvent.setup();
    render(<CellNames />);

    const inputField = screen.getByPlaceholderText(
      'Field name'
    ) as HTMLInputElement;
    const testValue = 'New Name';

    await user.type(inputField, testValue);

    expect(inputField.value).toBe(testValue);
  });

  it('should save non-empty headers to storage, preserving existing records', async () => {
    const user = userEvent.setup();

    // 1. Arrange
    const existingRecords = [{ field1: 'value1' }];
    const initialStorageData: CsvStorage = {
      headers: ['A', 'B'],
      records: existingRecords,
    };
    mockStorageGet({ [CSV_DATA_KEY]: initialStorageData });

    // 2. Act: Render
    render(<CellNames />);

    const inputs = screen.getAllByPlaceholderText('Field name');

    // Başlıkları güncelle
    await user.clear(inputs[0]);
    await user.type(inputs[0], 'FIELD_X');
    await user.clear(inputs[1]); // Bu boş kalacak

    // Yeni bir alan ekle ve doldur
    const addButton = screen.getByTestId('add-btn');
    await user.click(addButton);

    const newInputs = screen.getAllByPlaceholderText('Field name');
    const inputForY = newInputs[2] as HTMLInputElement;
    await user.type(inputForY, 'FIELD_Y');

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    await user.click(saveButton);

    // 3. Assert: Boş (clear edilen) başlık B filtrelenmiş olmalı
    const expectedSaveData: CsvStorage = {
      headers: ['FIELD_X', 'FIELD_Y'],
      records: existingRecords,
    };

    expect(mockStorageSet).toHaveBeenCalledWith({
      [CSV_DATA_KEY]: expectedSaveData,
    });
  });

  it('should save headers when existing records are null/undefined', async () => {
    const user = userEvent.setup();

    // 1. Arrange: Records: [] döndürmesini simüle ediyoruz
    mockStorageGet({
      [CSV_DATA_KEY]: { headers: ['Old'], records: [] },
    });

    render(<CellNames />);

    const inputField = screen.getByPlaceholderText(
      'Field name'
    ) as HTMLInputElement;
    await user.clear(inputField);
    await user.type(inputField, 'NEW_HEADER');

    // 2. Act: Save
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    await user.click(saveButton);

    // 3. Assert: Kayıtlar boş bir dizi olarak kaydedildi mi?
    const expectedSaveData: CsvStorage = {
      headers: ['NEW_HEADER'],
      records: [],
    };

    expect(mockStorageSet).toHaveBeenCalledWith({
      [CSV_DATA_KEY]: expectedSaveData,
    });
  });
});
