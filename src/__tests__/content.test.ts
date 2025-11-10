import { vi, describe, it, expect, afterEach } from 'vitest';
import '../SidePanel/Fields/content';
import { waitFor } from '@testing-library/dom';

// Mocking funcs
// (window.getSelection) and Chrome API mock
const mockSendMessage = vi.fn();
global.chrome = {
  runtime: {
    sendMessage: mockSendMessage,
  } as unknown as typeof chrome.runtime,
} as unknown as typeof chrome;

// Highlighting text mock
const mockRemoveAllRanges = vi.fn();
const mockSelection = {
  toString: vi.fn(),
  removeAllRanges: mockRemoveAllRanges,
};
global.window.getSelection = vi.fn(() => mockSelection as unknown as Selection);

// Keyboard event mock
function dispatchKeydown(
  key: string,
  ctrl = false,
  alt = false,
  shift = false,
  preventDefault = vi.fn()
) {
  const event = new KeyboardEvent('keydown', {
    key: key,
    ctrlKey: ctrl,
    altKey: alt,
    shiftKey: shift,
    bubbles: true,
    cancelable: true,
  });

  // event.preventDefault() mock
  event.preventDefault = preventDefault;
  document.dispatchEvent(event);

  return preventDefault;
}

describe('Content Script (content.ts)', () => {
  afterEach(() => {
    // Clean mocks
    mockSendMessage.mockClear();
    mockSelection.toString.mockClear();
    mockRemoveAllRanges.mockClear();
  });

  it('should send "fillField" message and prevent default on selected text + [1-9] keypress', () => {
    // Arrange
    const selectedText = 'Selected Name Data';
    mockSelection.toString.mockReturnValue(selectedText);
    const mockPreventDefault = vi.fn();

    // Act
    dispatchKeydown('1', false, false, false, mockPreventDefault);

    // Assert 1: Should be called highlighted text
    expect(mockSelection.toString).toHaveBeenCalled();

    // Assert 2: Message sended with right payload (index 1 = key '1')
    expect(mockSendMessage).toHaveBeenCalledWith({
      action: 'fillField',
      index: 1, // parseInt('1', 10)
      data: selectedText,
    });

    // Assert 3: Default behavior blocked
    expect(mockPreventDefault).toHaveBeenCalled();

    // Assert 4: Highlight cleaned
    expect(mockRemoveAllRanges).toHaveBeenCalled();
  });

  it('should NOT send message or prevent default if no text is selected', () => {
    // Arrange
    mockSelection.toString.mockReturnValue(''); // Metin seçili değil
    const mockPreventDefault = vi.fn();

    // Act
    dispatchKeydown('2', false, false, false, mockPreventDefault);

    // Assert: Nothing called
    expect(mockSendMessage).not.toHaveBeenCalled();
    expect(mockPreventDefault).not.toHaveBeenCalled();
    expect(mockRemoveAllRanges).not.toHaveBeenCalled();
  });

  // ---

  it('should NOT send message if key is outside [1-9] range', () => {
    // Arrange
    mockSelection.toString.mockReturnValue('Some Text');
    const mockPreventDefault = vi.fn();

    // Act
    dispatchKeydown('a', false, false, false, mockPreventDefault);
    dispatchKeydown('0', false, false, false, mockPreventDefault);
    dispatchKeydown('10', false, false, false, mockPreventDefault);

    // Assert: Send nothing
    waitFor(() => {
      expect(mockSendMessage).not.toHaveBeenCalled();
      expect(mockPreventDefault).not.toHaveBeenCalled();
    });
  });

  it('should NOT send message if CTRL, ALT, or SHIFT key is pressed', () => {
    // Arrange
    mockSelection.toString.mockReturnValue('Some Text');
    const mockPreventDefault = vi.fn();

    // Act
    dispatchKeydown('3', true, false, false, mockPreventDefault); // CTRL
    dispatchKeydown('4', false, true, false, mockPreventDefault); // ALT
    dispatchKeydown('5', false, false, true, mockPreventDefault); // SHIFT

    // Assert: Send nothing
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });
});
