Coverage report from CLI

```bash
─❯ npm run test -- --coverage --watch=false

> scrap@0.0.0 test
> vitest --reporter=verbose --coverage --watch=false

 RUN  v3.2.4 /scrap
      Coverage enabled with v8

 ✓ src/__tests__/WorkStarter.test.tsx (4 tests) 91ms
   ✓ WorkStarter Component (4)
     ✓ should render the "START" button 36ms
     ✓ should call all chrome APIs in order when button is clicked 25ms
     ✓ should not call sidePanel APIs if no tab ID is found 14ms
     ✓ should log an error if sidePanel.open fails 13ms
 ✓ src/__tests__/WorkStopper.test.tsx (2 tests) 71ms
   ✓ WorkStopper Component (2)
     ✓ should render the "STOP" button and info text 40ms
     ✓ should call all chrome APIs to disable the side panel when clicked 29ms
 ✓ src/__tests__/Welcoming.test.tsx (4 tests) 116ms
   ✓ Welcoming component (4)
     ✓ shows menu components 56ms
     ✓ shows Disclaimer component when agreement is false or null 29ms
     ✓ shows ControlCenter component when agreement is true in localStorage 16ms
     ✓ shows skeleton loading state initially 13ms
 ✓ src/__tests__/ControlCenterPopup.test.tsx (7 tests) 162ms
   ✓ ControlCenter Component (7)
     ✓ should render Cell Names collapse and Mocked WorkStarter 70ms
     ✓ should initialize showSidePanel to false if it does not exist in storage 21ms
     ✓ should NOT initialize showSidePanel if it already exists in storage 12ms
     ✓ should initialize HEADERS with default data if it does not exist in storage 16ms
     ✓ should NOT initialize HEADERS if it already exists in storage 20ms
     ✓ should initialize DATA with empty array if it does not exist in storage 10ms
     ✓ should NOT initialize DATA if it already exists in storage 11ms
 ✓ src/__tests__/Disclaimer.test.tsx (6 tests) 135ms
   ✓ Disclaimer component (6)
     ✓ shows disclaimer writings 34ms
     ✓ shows checkbox and button 16ms
     ✓ button is disabled as default 3ms
     ✓ click on checkbox enables button 36ms
     ✓ set agreement to local storage and updates state when user agrees 31ms
     ✓ does not set localStorage if checkbox is not checked 12ms
 ✓ src/__tests__/CellNames.test.tsx (8 tests) 341ms
   ✓ CellNames Component (8)
     ✓ should load headers from chrome storage on mount 36ms
     ✓ should add a new empty input field when "+" button is clicked 41ms
     ✓ should remove the last input field when "-" button is clicked 24ms
     ✓ should disable the "-" button when only the mandatory ID input remains 15ms
     ✓ should update the header label and key when a non-ID input changes 77ms
     ✓ should NOT update the header label or key when the ID input changes 11ms
     ✓ should save non-empty headers, preserving the mandatory ID header 114ms
     ✓ should save only the ID header if all other fields are empty 20ms
 ✓ src/__tests__/Fields.test.tsx (11 tests) 351ms
   ✓ Fields Component (11)
     ✓ should show skeleton until headers are loaded 31ms
     ✓ should render all fields once headers and data are loaded 19ms
     ✓ should calculate the next ID correctly for empty data 5ms
     ✓ should update the text state on input change 45ms
     ✓ should disable the Save button when only the ID is present (no user input) 10ms
     ✓ should enable the Save button when user input is present (Object.keys(text).length > 1) 47ms
     ✓ should save the new record, update ID, and close the active tab 95ms
     ✓ should NOT close the tab if only one tab is open 52ms
     ✓ should register and cleanup the chrome.runtime.onMessage listener 13ms
     ✓ should reset ID field when "tabSwitched" message is received 19ms
     ✓ should fill the target field when "fillField" message is received 13ms
 ✓ src/__tests__/KeyboardListener.test.ts (7 tests) 48ms
   ✓ KeyboardListener (7)
     ✓ Content Script Injection (2)
       ✓ should inject content.js into non-chrome tabs 33ms
       ✓ should log error if executeScript fails 1ms
     ✓ Tab listeners (5)
       ✓ should register listeners for onActivated and onUpdated 0ms
       ✓ should send "tabSwitched" message when tab is activated 1ms
       ✓ should NOT send message if tab update status is not complete 0ms
       ✓ should NOT send message if tab update is complete but not active 0ms
       ✓ should handle sendMessage failure gracefully 2ms
 ✓ src/__tests__/content.test.ts (4 tests) 12ms
   ✓ Content Script (content.ts) (4)
     ✓ should send "fillField" message and prevent default on selected text + [1-9] keypress 5ms
     ✓ should NOT send message or prevent default if no text is selected 1ms
     ✓ should NOT send message if key is outside [1-9] range 3ms
     ✓ should NOT send message if CTRL, ALT, or SHIFT key is pressed 0ms
 ✓ src/__tests__/Export.test.tsx (3 tests) 54ms
   ✓ Export Component (3)
     ✓ should load headers and data from storage on mount 37ms
     ✓ should load empty data if storage returns undefined 4ms
     ✓ should reset headers and data in storage after download 10ms
 ✓ src/__tests__/ThemeSwitcher.test.tsx (1 test) 87ms
   ✓ ThemeSwitcher component (1)
     ✓ should switch dark and light theme according to user interaction 85ms
 ✓ src/__tests__/ControlCenterSidePanel.test.tsx (1 test) 64ms
   ✓ SidePanel/ControlCenter Component (1)
     ✓ should render child components and layout 62ms
 ✓ src/__tests__/Helpers.test.ts (5 tests) 4ms
   ✓ findNextId Helper (5)
     ✓ should return 1 when data array is empty 2ms
     ✓ should return 1 when data array is undefined 0ms
     ✓ should return max ID + 1 when IDs are sequential 0ms
     ✓ should return max ID + 1 when IDs are non-sequential 0ms
     ✓ should handle non-numeric or null ID values safely 0ms
 ✓ src/__tests__/SidePanelListener.test.ts (5 tests) 10ms
   ✓ SidePanelListener (5)
     ✓ chrome.tabs.onUpdated listener should be registered 5ms
     ✓ onUpdated callback should enable side panel when showSidePanel is true 2ms
     ✓ onUpdated callback should disable side panel when showSidePanel is false 1ms
     ✓ onUpdated callback should do nothing if tab.url is missing 0ms
     ✓ onUpdated callback should register onActivated listener 1ms

 Test Files  14 passed (14)
      Tests  68 passed (68)
   Start at  12:38:56
   Duration  2.46s (transform 480ms, setup 230ms, collect 3.32s, tests 1.55s, environment 6.33s, prepare 1.52s)

 % Coverage report from v8
------------------------------------|---------|----------|---------|---------|-------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |   95.08 |    90.07 |   96.66 |   95.08 |                   
 src                                |     100 |      100 |     100 |     100 |                   
  Menu.tsx                          |     100 |      100 |     100 |     100 |                   
  ThemeSwitcher.tsx                 |     100 |      100 |     100 |     100 |                   
 src/Popup                          |     100 |      100 |     100 |     100 |                   
  ControlCenter.tsx                 |     100 |      100 |     100 |     100 |                   
 src/Popup/Onboarding               |     100 |      100 |     100 |     100 |                   
  Disclaimer.tsx                    |     100 |      100 |     100 |     100 |                   
  Welcoming.tsx                     |     100 |      100 |     100 |     100 |                   
 src/Popup/Options                  |   96.55 |    76.92 |     100 |   96.55 |                   
  CellNames.tsx                     |   96.55 |    76.92 |     100 |   96.55 | 27-29,49          
 src/Popup/WorkStarter              |     100 |      100 |     100 |     100 |                   
  WorkStarter.tsx                   |     100 |      100 |     100 |     100 |                   
 src/SidePanel                      |     100 |      100 |     100 |     100 |                   
  ControlCenter.tsx                 |     100 |      100 |     100 |     100 |                   
 src/SidePanel/Export               |   91.66 |      100 |   66.66 |   91.66 |                   
  Export.tsx                        |   91.66 |      100 |   66.66 |   91.66 | 34-37             
 src/SidePanel/Fields               |   90.85 |     87.8 |     100 |   90.85 |                   
  Fields.tsx                        |   88.46 |    85.71 |     100 |   88.46 | 78-94,150-151     
  Helpers.ts                        |     100 |      100 |     100 |     100 |                   
  content.ts                        |     100 |     87.5 |     100 |     100 | 19                
 src/SidePanel/WorkStopper          |     100 |      100 |     100 |     100 |                   
  WorkStopper.tsx                   |     100 |      100 |     100 |     100 |                   
 src/background/SidePanel/listeners |   84.28 |       90 |     100 |   84.28 |                   
  KeyboardListener.ts               |   76.08 |    86.66 |     100 |   76.08 | 50-58,62-65       
  SidePanelListener.ts              |     100 |      100 |     100 |     100 |                   
------------------------------------|---------|----------|---------|---------|-------------------
```
