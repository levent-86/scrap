import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { WorkStarter } from '../Popup/WorkStarter/WorkStarter';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('WorkStarter Component', () => {
  it('should render the "START" button', () => {
    render(<WorkStarter />);

    expect(screen.getByRole('button', { name: /start/i })).toBeTruthy();
  });

  it('should call all chrome APIs in order when button is clicked', async () => {
    // Create a mock tab
    const mockTab = { id: 123, url: 'https://example.com' };
    (chrome.tabs.query as Mock).mockResolvedValue([mockTab]);

    render(<WorkStarter />);
    const user = userEvent.setup();
    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);

    // storage.set called?
    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      showSidePanel: true,
    });

    // tabs.query called?
    expect(chrome.tabs.query).toHaveBeenCalledWith({
      active: true,
      currentWindow: true,
    });

    // sidePanel.setOptions called?
    expect(chrome.sidePanel.setOptions).toHaveBeenCalledWith({
      tabId: mockTab.id,
      path: 'sidepanel.html',
      enabled: true,
    });

    // sidePanel.open called?
    expect(chrome.sidePanel.open).toHaveBeenCalledWith({ tabId: mockTab.id });
  });

  it('should not call sidePanel APIs if no tab ID is found', async () => {
    (chrome.tabs.query as Mock).mockResolvedValue([]);

    render(<WorkStarter />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /start/i }));

    // Assert
    // storage.set and tabs.query called
    expect(chrome.storage.local.set).toHaveBeenCalledTimes(1);
    expect(chrome.tabs.query).toHaveBeenCalledTimes(1);

    // if (!tab?.id) return; failed and not called
    expect(chrome.sidePanel.setOptions).not.toHaveBeenCalled();
    expect(chrome.sidePanel.open).not.toHaveBeenCalled();
  });

  it('should log an error if sidePanel.open fails', async () => {
    const user = userEvent.setup();
    const mockError = new Error('API Failure');

    // Watch console.error
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // 1. Arrange
    const mockTab = { id: 456 };
    (chrome.tabs.query as Mock).mockResolvedValue([mockTab]);

    // Provide reject on sidePanel.open
    (chrome.sidePanel.open as Mock).mockRejectedValue(mockError);

    // 2. Act
    render(<WorkStarter />);
    await user.click(screen.getByRole('button', { name: /start/i }));

    // 3. Assert
    // Other APIs will be called
    expect(chrome.storage.local.set).toHaveBeenCalled();
    expect(chrome.sidePanel.setOptions).toHaveBeenCalled();

    // sidePanel.open called
    expect(chrome.sidePanel.open).toHaveBeenCalledWith({ tabId: mockTab.id });

    // try/catch catch error and called console.error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Side panel could not be opened programmatically:',
      mockError
    );

    consoleErrorSpy.mockRestore();
  });
});
