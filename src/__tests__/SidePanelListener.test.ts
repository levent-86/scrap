import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { SidePanelListener } from '../background/SidePanel/listeners/SidePanelListener';

// Clean mocks
beforeEach(() => {
  vi.clearAllMocks();

  (chrome.storage.local.get as Mock).mockResolvedValue({});
  (chrome.sidePanel.setOptions as Mock).mockResolvedValue(undefined);
  (chrome.sidePanel.setPanelBehavior as Mock).mockResolvedValue(undefined);
});

describe('SidePanelListener', () => {
  it('chrome.tabs.onUpdated listener should be registered', () => {
    SidePanelListener();
    expect(chrome.tabs.onUpdated.addListener).toHaveBeenCalledTimes(1);
    expect(chrome.tabs.onUpdated.addListener).toHaveBeenCalledWith(
      expect.any(Function)
    );
  });

  it('onUpdated callback should enable side panel when showSidePanel is true', async () => {
    const storageGetMock = (chrome.storage.local.get as Mock).mockResolvedValue(
      {
        showSidePanel: true,
      }
    );

    SidePanelListener();

    const onUpdatedCallback = (chrome.tabs.onUpdated.addListener as Mock).mock
      .calls[0][0];

    const mockTabId = 123;
    const mockTab = { url: 'https://example.com' };
    await onUpdatedCallback(mockTabId, { status: 'complete' }, mockTab);

    expect(storageGetMock).toHaveBeenCalledWith(['showSidePanel']);
    expect(chrome.sidePanel.setOptions).toHaveBeenCalledWith({
      tabId: mockTabId,
      path: 'sidepanel.html',
      enabled: true,
    });
    expect(chrome.sidePanel.setPanelBehavior).toHaveBeenCalledWith({
      openPanelOnActionClick: true,
    });
  });

  it('onUpdated callback should disable side panel when showSidePanel is false', async () => {
    const storageGetMock = (chrome.storage.local.get as Mock).mockResolvedValue(
      {
        showSidePanel: false,
      }
    );

    SidePanelListener();

    const onUpdatedCallback = (chrome.tabs.onUpdated.addListener as Mock).mock
      .calls[0][0];

    const mockTabId = 456;
    const mockTab = { url: 'https://example.com' };
    await onUpdatedCallback(mockTabId, {}, mockTab);

    expect(storageGetMock).toHaveBeenCalledWith(['showSidePanel']);
    expect(chrome.sidePanel.setOptions).toHaveBeenCalledWith({
      tabId: mockTabId,
      path: 'sidepanel.html',
      enabled: false,
    });
    expect(chrome.sidePanel.setPanelBehavior).toHaveBeenCalledWith({
      openPanelOnActionClick: false,
    });
  });

  it('onUpdated callback should do nothing if tab.url is missing', async () => {
    SidePanelListener();

    const onUpdatedCallback = (chrome.tabs.onUpdated.addListener as Mock).mock
      .calls[0][0];

    const mockTabId = 789;
    const mockTab = { url: undefined };
    await onUpdatedCallback(mockTabId, {}, mockTab);

    expect(chrome.storage.local.get).not.toHaveBeenCalled();
    expect(chrome.sidePanel.setOptions).not.toHaveBeenCalled();
    expect(chrome.sidePanel.setPanelBehavior).not.toHaveBeenCalled();
  });

  it('onUpdated callback should register onActivated listener', async () => {
    (chrome.storage.local.get as Mock).mockResolvedValue({
      showSidePanel: true,
    });

    SidePanelListener();

    const onUpdatedCallback = (chrome.tabs.onUpdated.addListener as Mock).mock
      .calls[0][0];

    await onUpdatedCallback(1, {}, { url: 'https://example.com' });

    expect(chrome.tabs.onActivated.addListener).toHaveBeenCalledTimes(1);

    const onActivatedCallback = (chrome.tabs.onActivated.addListener as Mock)
      .mock.calls[0][0];

    const storageGetMock = (chrome.storage.local.get as Mock).mockResolvedValue(
      { showSidePanel: false }
    );

    await onActivatedCallback();

    expect(storageGetMock).toHaveBeenCalledTimes(2);
    expect(storageGetMock).toHaveBeenLastCalledWith(['showSidePanel']);

    expect(chrome.sidePanel.setOptions).toHaveBeenLastCalledWith({
      path: 'sidepanel.html',
      enabled: false,
    });

    expect(chrome.sidePanel.setPanelBehavior).toHaveBeenLastCalledWith({
      openPanelOnActionClick: false,
    });
  });
});
