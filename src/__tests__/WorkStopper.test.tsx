import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkStopper } from '../SidePanel/WorkStopper/WorkStopper';

// Clean mocks
beforeEach(() => {
  vi.resetAllMocks();
});

describe('WorkStopper Component', () => {
  it('should render the "STOP" button and info text', () => {
    render(<WorkStopper />);

    expect(screen.getByRole('button', { name: /stop/i })).toBeTruthy();
    expect(screen.getByText(/Click the Stop button to close/i)).toBeTruthy();
  });

  it('should call all chrome APIs to disable the side panel when clicked', async () => {
    render(<WorkStopper />);

    const user = userEvent.setup();
    const stopButton = screen.getByRole('button', { name: /stop/i });

    await user.click(stopButton);

    // storage.set called?
    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      showSidePanel: false,
    });

    // sidePanel.setOptions called?
    expect(chrome.sidePanel.setOptions).toHaveBeenCalledWith({
      path: 'sidepanel.html',
      enabled: false,
    });

    // sidePanel.setPanelBehavior called?
    expect(chrome.sidePanel.setPanelBehavior).toHaveBeenCalledWith({
      openPanelOnActionClick: false,
    });
  });
});
