Coverage report from CLI

```bash
─❯ npm run test -- --coverage --watch=false

> scrap@0.0.0 test
> vitest --reporter=verbose --coverage --watch=false

 RUN  v3.2.4 /scrap
      Coverage enabled with v8

 ✓ src/__tests__/WorkStarter.test.tsx (4 tests) 82ms
   ✓ WorkStarter Component (4)
     ✓ should render the "START" button 29ms
     ✓ should call all chrome APIs in order when button is clicked 27ms
     ✓ should not call sidePanel APIs if no tab ID is found 12ms
     ✓ should log an error if sidePanel.open fails 12ms
 ✓ src/__tests__/ThemeSwitcher.test.tsx (1 test) 71ms
   ✓ ThemeSwitcher component (1)
     ✓ should switch dark and light theme according to user interaction 69ms
 ✓ src/__tests__/Welcoming.test.tsx (4 tests) 107ms
   ✓ Welcoming component (4)
     ✓ shows menu components 56ms
     ✓ shows Disclaimer component when agreement is false or null 24ms
     ✓ shows ControlCenter component when agreement is true in localStorage 13ms
     ✓ shows skeleton loading state initially 12ms
 ✓ src/__tests__/ControlCenterPopup.test.tsx (7 tests) 141ms
   ✓ ControlCenter Component (7)
     ✓ should render Cell Names collapse and Mocked WorkStarter 57ms
     ✓ should initialize showSidePanel to false if it does not exist in storage 13ms
     ✓ should NOT initialize showSidePanel if it already exists in storage 12ms
     ✓ should initialize HEADERS with default data if it does not exist in storage 12ms
     ✓ should NOT initialize HEADERS if it already exists in storage 17ms
     ✓ should initialize DATA with empty array if it does not exist in storage 15ms
     ✓ should NOT initialize DATA if it already exists in storage 14ms
 ✓ src/__tests__/Disclaimer.test.tsx (6 tests) 150ms
   ✓ Disclaimer component (6)
     ✓ shows disclaimer writings 36ms
     ✓ shows checkbox and button 13ms
     ✓ button is disabled as default 4ms
     ✓ click on checkbox enables button 38ms
     ✓ set agreement to local storage and updates state when user agrees 43ms
     ✓ does not set localStorage if checkbox is not checked 14ms
 ✓ src/__tests__/Fields.test.tsx (8 tests) 297ms
   ✓ Fields Component (8)
     ✓ should show skeleton until headers are loaded 32ms
     ✓ should render all fields once headers and data are loaded 20ms
     ✓ should calculate the next ID correctly for empty data 4ms
     ✓ should update the text state on input change 42ms
     ✓ should disable the Save button when only the ID is present (no user input) 18ms
     ✓ should enable the Save button when user input is present (Object.keys(text).length > 1) 45ms
     ✓ should save the new record, update ID, and close the active tab 87ms
     ✓ should NOT close the tab if only one tab is open 46ms
 ✓ src/__tests__/CellNames.test.tsx (8 tests) 328ms
   ✓ CellNames Component (8)
     ✓ should load headers from chrome storage on mount 35ms
     ✓ should add a new empty input field when "+" button is clicked 25ms
     ✓ should remove the last input field when "-" button is clicked 28ms
     ✓ should disable the "-" button when only the mandatory ID input remains 16ms
     ✓ should update the header label and key when a non-ID input changes 80ms
     ✓ should NOT update the header label or key when the ID input changes 9ms
     ✓ should save non-empty headers, preserving the mandatory ID header 119ms
     ✓ should save only the ID header if all other fields are empty 15ms
 ✓ src/__tests__/SidePanelListener.test.ts (5 tests) 10ms
   ✓ SidePanelListener (5)
     ✓ chrome.tabs.onUpdated listener should be registered 5ms
     ✓ onUpdated callback should enable side panel when showSidePanel is true 2ms
     ✓ onUpdated callback should disable side panel when showSidePanel is false 0ms
     ✓ onUpdated callback should do nothing if tab.url is missing 1ms
     ✓ onUpdated callback should register onActivated listener 1ms
 ✓ src/__tests__/ControlCenterSidePanel.test.tsx (1 test) 39ms
   ✓ SidePanel/ControlCenter Component (1)
     ✓ should render child components and layout 38ms
 ✓ src/__tests__/WorkStopper.test.tsx (2 tests) 55ms
   ✓ WorkStopper Component (2)
     ✓ should render the "STOP" button and info text 26ms
     ✓ should call all chrome APIs to disable the side panel when clicked 28ms
 ✓ src/__tests__/Export.test.tsx (3 tests) 46ms
   ✓ Export Component (3)
     ✓ should load headers and data from storage on mount 29ms
     ✓ should load empty data if storage returns undefined 4ms
     ✓ should reset headers and data in storage after download 11ms

 Test Files  11 passed (11)
      Tests  49 passed (49)
   Start at  23:35:52
   Duration  2.08s (transform 384ms, setup 169ms, collect 2.59s, tests 1.33s, environment 4.33s, prepare 1.11s)

 % Coverage report from v8
------------------------------------|---------|----------|---------|---------|-------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |   99.46 |    90.09 |     100 |   99.46 |                   
 src                                |     100 |      100 |     100 |     100 |                   
  Menu.tsx                          |     100 |      100 |     100 |     100 |                   
  ThemeSwitcher.tsx                 |     100 |      100 |     100 |     100 |                   
 src/Popup                          |     100 |      100 |     100 |     100 |                   
  ControlCenter.tsx                 |     100 |      100 |     100 |     100 |                   
 src/Popup/Onboarding               |     100 |      100 |     100 |     100 |                   
  Disclaimer.tsx                    |     100 |      100 |     100 |     100 |                   
  Welcoming.tsx                     |     100 |      100 |     100 |     100 |                   
 src/Popup/Options                  |   99.09 |    76.92 |     100 |   99.09 |                   
  CellNames.tsx                     |   99.09 |    76.92 |     100 |   99.09 | 43                
 src/Popup/WorkStarter              |     100 |      100 |     100 |     100 |                   
  WorkStarter.tsx                   |     100 |      100 |     100 |     100 |                   
 src/SidePanel                      |     100 |      100 |     100 |     100 |                   
  ControlCenter.tsx                 |     100 |      100 |     100 |     100 |                   
 src/SidePanel/Export               |     100 |      100 |     100 |     100 |                   
  Export.tsx                        |     100 |      100 |     100 |     100 |                   
 src/SidePanel/Fields               |   98.01 |    85.18 |     100 |   98.01 |                   
  Fields.tsx                        |   98.01 |    85.18 |     100 |   98.01 | 102-103           
 src/SidePanel/WorkStopper          |     100 |      100 |     100 |     100 |                   
  WorkStopper.tsx                   |     100 |      100 |     100 |     100 |                   
 src/background/SidePanel/listeners |     100 |      100 |     100 |     100 |                   
  SidePanelListener.ts              |     100 |      100 |     100 |     100 |                   
------------------------------------|---------|----------|---------|---------|-------------------
```
