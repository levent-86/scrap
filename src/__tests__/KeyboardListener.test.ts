import { vi, describe, it, expect, beforeEach } from 'vitest';
import { KeyboardListener } from '../background/SidePanel/listeners/KeyboardListener';
import { type Mock } from 'vitest';

// Mocks
const mockExecuteScript = vi.fn();
const mockTabsQuery = vi.fn();
const mockOnActivatedAddListener = vi.fn();
const mockOnUpdatedAddListener = vi.fn();
const mockSendMessage = vi.fn(() => Promise.resolve());

// Mock Global Chrome object
global.chrome = {
  tabs: {
    query: mockTabsQuery,
    onActivated: {
      addListener: mockOnActivatedAddListener,
    },
    onUpdated: {
      addListener: mockOnUpdatedAddListener,
    },
  },
  scripting: {
    executeScript: mockExecuteScript,
  },
  runtime: {
    sendMessage: mockSendMessage,
  },
} as unknown as typeof chrome;

describe('KeyboardListener', () => {

  beforeEach(() => {
    // Clean mocks
    vi.clearAllMocks();
  });
  
  describe('Content Script Injection', () => {
    
    it('should inject content.js into non-chrome tabs', async () => {
      // Arrange: Define 4 tabs one is undefined
      const tabs = [
        { id: 101, url: 'https://example.com/', active: false }, // Geçerli
        { id: 102, url: 'chrome://settings', active: true },      // Hariç
        { id: undefined, url: 'https://test.net/', active: false },// Hariç (ID yok)
        { id: 104, url: 'https://google.com/', active: true },      // Geçerli
      ];
      mockTabsQuery.mockResolvedValue(tabs);

      // Act
      await KeyboardListener();

      // Assert 1: executeScript should be called only for two tabs
      expect(mockExecuteScript).toHaveBeenCalledTimes(2);
      
      // Assert 2: injected to first tab
      expect(mockExecuteScript).toHaveBeenCalledWith({
        target: { tabId: 101 },
        files: ['content.js'],
      });
      
      // Assert 3: injected to second tab
      expect(mockExecuteScript).toHaveBeenCalledWith({
        target: { tabId: 104 },
        files: ['content.js'],
      });
      
      // Assert 4: not injected to chrome:// tab
      expect(mockExecuteScript).not.toHaveBeenCalledWith({
        target: { tabId: 102 },
        files: ['content.js'],
      });
    });

    it('should log error if executeScript fails', async () => {
      // Arrange
      const error = new Error('Scripting failed');
      mockTabsQuery.mockResolvedValue([{ id: 201, url: 'https://error.com/' }]);
      mockExecuteScript.mockRejectedValue(error); // ExecuteScript error
      const mockConsoleError = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await KeyboardListener();

      // Assert
      expect(mockExecuteScript).toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Failed to inject into Tab ID: 201:',
        error
      );
      
      mockConsoleError.mockRestore();
    });
  });


  describe('Tab listeners', () => {
    
    const getTabListener = (mockListener: Mock) => {
      expect(mockListener).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      return mockListener.mock.calls[0][0] as Function;
    };

    it('should register listeners for onActivated and onUpdated', async () => {
      // Arrange
      mockTabsQuery.mockResolvedValue([]); // Skip injection

      // Act
      await KeyboardListener();

      // Assert: Listeners called
      expect(mockOnActivatedAddListener).toHaveBeenCalledTimes(1);
      expect(mockOnUpdatedAddListener).toHaveBeenCalledTimes(1);
    });

    it('should send "tabSwitched" message when tab is activated', async () => {
      // Arrange
      mockTabsQuery.mockResolvedValue([]); 
      await KeyboardListener();
      const onActivatedListener = getTabListener(mockOnActivatedAddListener);
      
      // Act: trigger onActivated listener
      await onActivatedListener({ tabId: 301, windowId: 1 });

      // Assert
      expect(mockSendMessage).toHaveBeenCalledWith({ action: 'tabSwitched' });
    });

    it('should send "tabSwitched" message when tab update is complete and active', async () => {
      // Arrange
      mockTabsQuery.mockResolvedValue([]);
      await KeyboardListener();
      const onUpdatedListener = getTabListener(mockOnUpdatedAddListener);
      
      // Act: trigger onUpdated listener
      await onUpdatedListener(
        302, // tabId
        { status: 'complete', url: 'new-url' }, // changeInfo
        { id: 302, active: true } // tab
      );

      // Assert
      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      expect(mockSendMessage).toHaveBeenCalledWith({ action: 'tabSwitched' });
    });

    it('should NOT send message if tab update status is not complete', async () => {
      // Arrange
      mockTabsQuery.mockResolvedValue([]);
      await KeyboardListener(); 
      const onUpdatedListener = getTabListener(mockOnUpdatedAddListener);

      await onUpdatedListener(
        303, 
        { status: 'loading' }, 
        { id: 303, active: true }
      );

      // Assert
      expect(mockSendMessage).not.toHaveBeenCalled();
    });
    
    it('should NOT send message if tab update is complete but not active', async () => {
      // Arrange
      mockTabsQuery.mockResolvedValue([]);
      await KeyboardListener(); 
      const onUpdatedListener = getTabListener(mockOnUpdatedAddListener);
      
      // Act: Complete, but not active
      await onUpdatedListener(
        304, 
        { status: 'complete' }, 
        { id: 304, active: false }
      );

      // Assert
      expect(mockSendMessage).not.toHaveBeenCalled();
    });

    it('should handle sendMessage failure gracefully', async () => {
      // Arrange
      mockTabsQuery.mockResolvedValue([]);
      mockSendMessage.mockRejectedValue(new Error('Send failed'));
      const mockConsoleError = vi.spyOn(console, 'log').mockImplementation(() => {});

      await KeyboardListener();
      const onActivatedListener = getTabListener(mockOnActivatedAddListener);
      
      // Act
      await onActivatedListener({ tabId: 401, windowId: 1 });

      // Assert: Show error on console
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Failed to send message to side panel:',
        expect.any(Error)
      );
      
      mockConsoleError.mockRestore();
    });
  });
});
