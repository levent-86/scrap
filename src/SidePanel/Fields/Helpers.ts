/*
Helpers.ts

Helper functions for Fields of Side Panel.
*/

import { type Data } from '../../Popup/ControlCenter';

// Find ID number in data
export const findNextId = (data: Data[] | undefined): number => {
  if (!data || data.length === 0) {
    return 1;
  }
  const maxId = data.reduce((max, current) => {
    const currentId = Number(current.ID) || 0;
    return Math.max(max, currentId);
  }, 0);

  return maxId + 1;
};
