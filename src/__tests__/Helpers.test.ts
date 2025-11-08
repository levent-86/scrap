import { describe, it, expect } from 'vitest';
import { findNextId } from '../SidePanel/Fields/Helpers';
import { type Data } from '../Popup/ControlCenter';

describe('findNextId Helper', () => {
  it('should return 1 when data array is empty', () => {
    const emptyData: Data[] = [];
    expect(findNextId(emptyData)).toBe(1);
  });

  it('should return 1 when data array is undefined', () => {
    expect(findNextId(undefined)).toBe(1);
  });

  it('should return max ID + 1 when IDs are sequential', () => {
    const data: Data[] = [
      { ID: 1, name: 'A' },
      { ID: 2, name: 'B' },
      { ID: 3, name: 'C' },
    ];
    // Max ID 3, expectation 4
    expect(findNextId(data)).toBe(4);
  });

  it('should return max ID + 1 when IDs are non-sequential', () => {
    const data: Data[] = [
      { ID: 5, name: 'A' },
      { ID: 1, name: 'B' },
      { ID: 10, name: 'C' },
    ];
    // Max ID 10, expectation 11
    expect(findNextId(data)).toBe(11);
  });

  it('should handle non-numeric or null ID values safely', () => {
    const data: Data[] = [
      { ID: 5, name: 'A' },
      { ID: null, name: 'B' },
      { ID: 'invalid', name: 'C' },
    ];

    // Max ID 5 (others are 0), expectation 6
    expect(findNextId(data)).toBe(6);
  });
});
