Coverage report from CLI

```bash
─❯ npm run test -- --coverage --watch=false

> scrap@0.0.0 test
> vitest --reporter=verbose --coverage --watch=false

 RUN  v3.2.4 /scrap
      Coverage enabled with v8

 ✓ src/__tests__/WorkStarter.test.tsx (4 tests) 114ms
   ✓ WorkStarter Component (4)
     ✓ should render the "START" button 35ms
     ✓ should call all chrome APIs in order when button is clicked 41ms
     ✓ should not call sidePanel APIs if no tab ID is found 15ms
     ✓ should log an error if sidePanel.open fails 21ms

 ✓ src/__tests__/ThemeSwitcher.test.tsx (1 test) 100ms
   ✓ ThemeSwitcher component (1)
     ✓ should switch dark and light theme according to user interaction 97ms
 ✓ src/__tests__/WorkStopper.test.tsx (2 tests) 83ms
   ✓ WorkStopper Component (2)
     ✓ should render the "STOP" button and info text 42ms
     ✓ should call all chrome APIs to disable the side panel when clicked 39ms
 ✓ src/__tests__/Welcoming.test.tsx (4 tests) 125ms
   ✓ Welcoming component (4)
     ✓ shows menu components 64ms
     ✓ shows Disclaimer component when agreement is false or null 27ms
     ✓ shows ControlCenter component when agreement is true in localStorage 15ms
     ✓ shows skeleton loading state initially 16ms
 ✓ src/__tests__/ControlCenterPopup.test.tsx (7 tests) 165ms
   ✓ ControlCenter Component (7)
     ✓ should render Cell Names collapse and Mocked WorkStarter 59ms
     ✓ should initialize showSidePanel to false if it does not exist in storage 14ms
     ✓ should NOT initialize showSidePanel if it already exists in storage 15ms
     ✓ should initialize HEADERS with default data if it does not exist in storage 14ms
     ✓ should NOT initialize HEADERS if it already exists in storage 23ms
     ✓ should initialize DATA with empty array if it does not exist in storage 18ms
     ✓ should NOT initialize DATA if it already exists in storage 17ms
 ✓ src/__tests__/Disclaimer.test.tsx (6 tests) 176ms
   ✓ Disclaimer component (6)
     ✓ shows disclaimer writings 39ms
     ✓ shows checkbox and button 16ms
     ✓ button is disabled as default 6ms
     ✓ click on checkbox enables button 53ms
     ✓ set agreement to local storage and updates state when user agrees 41ms
     ✓ does not set localStorage if checkbox is not checked 19ms
 ✓ src/__tests__/CellNames.test.tsx (8 tests) 405ms
   ✓ CellNames Component (8)
     ✓ should load headers from chrome storage on mount 38ms
     ✓ should add a new empty input field when "+" button is clicked 38ms
     ✓ should remove the last input field when "-" button is clicked 32ms
     ✓ should disable the "-" button when only the mandatory ID input remains 24ms
     ✓ should update the header label and key when a non-ID input changes 98ms
     ✓ should NOT update the header label or key when the ID input changes 7ms
     ✓ should save non-empty headers, preserving the mandatory ID header 136ms
     ✓ should save only the ID header if all other fields are empty 30ms
 ✓ src/__tests__/SidePanelListener.test.ts (5 tests) 7ms
   ✓ SidePanelListener (5)
     ✓ chrome.tabs.onUpdated listener should be registered 3ms
     ✓ onUpdated callback should enable side panel when showSidePanel is true 1ms
     ✓ onUpdated callback should disable side panel when showSidePanel is false 0ms
     ✓ onUpdated callback should do nothing if tab.url is missing 0ms
     ✓ onUpdated callback should register onActivated listener 0ms
 ✓ src/__tests__/ControlCenterSidePanel.test.tsx (1 test) 46ms
   ✓ SidePanel/ControlCenter Component (1)
     ✓ should render child components and layout 45ms

 Test Files  9 passed (9)
      Tests  38 passed (38)
   Start at  23:24:44
   Duration  2.05s (transform 380ms, setup 205ms, collect 2.28s, tests 1.22s, environment 3.69s, prepare 970ms)

 % Coverage report from v8
------------------------------------|---------|----------|---------|---------|-------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |   99.75 |    91.17 |     100 |   99.75 |                   
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
 src/SidePanel/WorkStopper          |     100 |      100 |     100 |     100 |                   
  WorkStopper.tsx                   |     100 |      100 |     100 |     100 |                   
 src/background/SidePanel/listeners |     100 |      100 |     100 |     100 |                   
  SidePanelListener.ts              |     100 |      100 |     100 |     100 |                   
------------------------------------|---------|----------|---------|---------|-------------------
```
