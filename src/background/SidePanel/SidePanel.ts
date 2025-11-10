/* 
SidePanel.ts

All side panel workers are declared on here
*/

import { KeyboardListener } from './listeners/KeyboardListener';
import { SidePanelListener } from './listeners/SidePanelListener';

export const SidePanel = () => {
  SidePanelListener();
  KeyboardListener();
};
