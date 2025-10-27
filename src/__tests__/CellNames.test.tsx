import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CellNames } from '../Popup/Options/CellNames';
import { type CsvStorage } from '../Popup/ControlCenter';

const mockedChrome = global.chrome;

describe('CellNames component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();

    vi.mocked(mockedChrome.storage.local.get).mockImplementation(
      (keys, callback) => {
        const key = Array.isArray(keys) ? keys[0] : keys;
        if (callback) {
          callback({ [key]: undefined });
        }
      }
    );

    vi.mocked(mockedChrome.storage.local.set).mockResolvedValue(undefined);
    render(<CellNames />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render an empty imput as default', async () => {
    await waitFor(() => {
      const inputs = screen.getAllByPlaceholderText('Field name');
      expect(inputs).to.have.lengthOf(1);

      expect((inputs[0] as HTMLInputElement).value).to.equal('');
    });

    expect(screen.getByRole('button', { name: /save changes/i })).toBeTruthy();
  });

  it('should load headers from storage when mounted', async () => {
    const storedData: CsvStorage = {
      headers: ['First Name', 'Last Name'],
      records: [],
    };

    vi.mocked(mockedChrome.storage.local.get).mockImplementation(
      (keys, callback) => {
        const key = Array.isArray(keys) ? keys[0] : keys;

        // DÜZELTME (Hata 4): callback'in varlığını kontrol et
        if (callback) {
          callback({ [key]: storedData });
        }
      }
    );

    render(<CellNames />);

    await waitFor(() => {
      const inputs = screen.getAllByPlaceholderText('Field name');

      // DÜZELTME (Hata 5 & 6): .toHaveValue yerine .value özelliğini kontrol et
      waitFor(() => {
        expect(inputs).to.have.lengthOf(3);
        expect((inputs[0] as HTMLInputElement).value).to.equal('First Name');
        expect((inputs[1] as HTMLInputElement).value).to.equal('Last Name');
      });
    });
  });

  it('should be added a new input when clicked to add button', async () => {
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText('Field name')).to.have.lengthOf(1);
    });

    const allButtons = screen.getAllByRole('button');
    const addButton = allButtons[0];

    await user.click(addButton);

    await waitFor(() => {
      const inputs = screen.getAllByPlaceholderText('Field name');
      expect(inputs).to.have.lengthOf(2);

      // DÜZELTME: .toHaveValue yerine .value özelliğini kontrol et
      expect((inputs[1] as HTMLInputElement).value).to.equal('');
    });
  });

  it('should remove last input when clicked to the subtract button', async () => {
    const allButtons = screen.getAllByRole('button');
    const addButton = allButtons[0];
    const subButton = allButtons[1];

    await user.click(addButton);
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText('Field name')).to.have.lengthOf(2);
      expect((subButton as HTMLButtonElement).disabled).toBeFalsy();
    });

    await user.click(subButton);

    await waitFor(() => {
      expect(screen.getAllByPlaceholderText('Field name')).to.have.lengthOf(1);
      expect((subButton as HTMLButtonElement).disabled).toBeTruthy();
    });
  });

  it('should update the value in the input', async () => {
    const input = (
      await screen.findAllByPlaceholderText('Field name')
    )[0] as HTMLInputElement;

    await user.type(input, 'Email');

    expect(input.value).to.equal('Email');
  });
});
