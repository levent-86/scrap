Coverage report from CLI

```bash
─❯ npm run test -- --coverage --watch=false

> scrap@0.0.0 test
> vitest --reporter=verbose --coverage --watch=false

 RUN  v3.2.4 /scrap
      Coverage enabled with v8

 ✓ src/__tests__/WorkStarter.test.tsx (4 tests) 103ms
   ✓ WorkStarter Component (4)
     ✓ should render the "START" button 42ms
     ✓ should call all chrome APIs in order when button is clicked 29ms
     ✓ should not call sidePanel APIs if no tab ID is found 16ms
     ✓ should log an error if sidePanel.open fails 15ms
 ✓ src/__tests__/ThemeSwitcher.test.tsx (1 test) 94ms
   ✓ ThemeSwitcher component (1)
     ✓ should switch dark and light theme according to user interaction 92ms
 ✓ src/__tests__/ControlCenterPopup.test.tsx (5 tests) 78ms
   ✓ ControlCenter Component (5)
     ✓ should render Cell Names collapse and Mocked WorkStarter 41ms
     ✓ should initialize showSidePanel to false if it does not exist in storage 9ms
     ✓ should initialize CSV data with empty headers/records if it does not exist in storage 7ms
     ✓ should NOT initialize showSidePanel if it already exists in storage 6ms
     ✓ should NOT initialize CSV data if it already exists in storage 12ms
 ✓ src/__tests__/Disclaimer.test.tsx (6 tests) 126ms
   ✓ Disclaimer component (6)
     ✓ shows disclaimer writings 35ms
     ✓ shows checkbox and button 11ms
     ✓ button is disabled as default 5ms
     ✓ click on checkbox enables button 38ms
     ✓ set agreement to local storage and updates state when user agrees 25ms
     ✓ does not set localStorage if checkbox is not checked 9ms
 ✓ src/__tests__/WorkStopper.test.tsx (2 tests) 70ms
   ✓ WorkStopper Component (2)
     ✓ should render the "STOP" button and info text 39ms
     ✓ should call all chrome APIs to disable the side panel when clicked 28ms
 ✓ src/__tests__/Welcoming.test.tsx (4 tests) 118ms
   ✓ Welcoming component (4)
     ✓ shows menu components 59ms
     ✓ shows Disclaimer component when agreement is false or null 28ms
     ✓ shows ControlCenter component when agreement is true in localStorage 16ms
     ✓ shows skeleton loading state initially 12ms
 ✓ src/__tests__/CellNames.test.tsx (8 tests) 347ms
   ✓ CellNames Component (8)
     ✓ should render an initial empty input field 42ms
     ✓ should load headers from chrome storage on mount 8ms
     ✓ should add a new empty input field when "+" button is clicked 44ms
     ✓ should remove the last input field when "-" button is clicked 32ms
     ✓ should disable the "-" button when only one input remains 24ms
     ✓ should update the header name when input changes 42ms
     ✓ should save non-empty headers to storage, preserving existing records 110ms
     ✓ should save headers when existing records are null/undefined 44ms
 ✓ src/__tests__/SidePanelListener.test.ts (5 tests) 8ms
   ✓ SidePanelListener (5)
     ✓ chrome.tabs.onUpdated listener should be registered 4ms
     ✓ onUpdated callback should enable side panel when showSidePanel is true 2ms
     ✓ onUpdated callback should disable side panel when showSidePanel is false 0ms
     ✓ onUpdated callback should do nothing if tab.url is missing 0ms
     ✓ onUpdated callback should register onActivated listener 0ms
 ✓ src/__tests__/ControlCenterSidePanel.test.tsx (1 test) 35ms
   ✓ SidePanel/ControlCenter Component (1)
     ✓ should render child components and layout 34ms

 Test Files  9 passed (9)
      Tests  36 passed (36)
   Start at  22:38:25
   Duration  1.84s (transform 327ms, setup 168ms, collect 2.35s, tests 978ms, environment 3.49s, prepare 903ms)

 % Coverage report from v8
------------------------------------|---------|----------|---------|---------|-------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |     100 |    98.24 |     100 |     100 |                   
 src                                |     100 |      100 |     100 |     100 |                   
  Menu.tsx                          |     100 |      100 |     100 |     100 |                   
  ThemeSwitcher.tsx                 |     100 |      100 |     100 |     100 |                   
 src/Popup                          |     100 |      100 |     100 |     100 |                   
  ControlCenter.tsx                 |     100 |      100 |     100 |     100 |                   
 src/Popup/Onboarding               |     100 |      100 |     100 |     100 |                   
  Disclaimer.tsx                    |     100 |      100 |     100 |     100 |                   
  Welcoming.tsx                     |     100 |      100 |     100 |     100 |                   
 src/Popup/Options                  |     100 |    94.44 |     100 |     100 |                   
  CellNames.tsx                     |     100 |    94.44 |     100 |     100 | 49                
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
