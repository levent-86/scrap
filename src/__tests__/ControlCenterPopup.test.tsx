import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ControlCenter } from '../Popup/ControlCenter';

// Imitate WorkStarter component
vi.mock('./WorkStarter/WorkStarter', () => ({
  WorkStarter: () => <button>Mocked WorkStarter</button>,
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Popup/ControlCenter Component', () => {
  it('should render preferences and WorkStarter', () => {
    render(<ControlCenter />);

    waitFor(() => expect(screen.getByText(/Preferences/i)).toBeTruthy());

    waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Mocked WorkStarter/i })
      ).toBeTruthy()
    );
  });

  it('should NOT set initial values if storage already has a value', () => {
    (chrome.storage.local.get as Mock).mockImplementation((_keys, callback) => {
      callback({ showSidePanel: true });
    });

    // Act
    render(<ControlCenter />);

    // Assert
    // 'get' called?
    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      ['showSidePanel'],
      expect.any(Function)
    );

    // 'result' truthy and 'set' should NOT called
    expect(chrome.storage.local.set).not.toHaveBeenCalled();
  });

  it('should set initial values if storage returns a falsy value', () => {
    (chrome.storage.local.get as Mock).mockImplementation((_keys, callback) => {
      callback(undefined);
    });

    // Act
    render(<ControlCenter />);

    // Assert
    // 'get' called?
    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      ['showSidePanel'],
      expect.any(Function)
    );

    // 'result' falsy and 'set' should NOT called
    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      showSidePanel: false,
    });
  });
});
