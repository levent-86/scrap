Coverage report from CLI

```bash
─❯ npm run test -- --coverage --watch=false

> scrap@0.0.0 test
> vitest --reporter=verbose --coverage --watch=false


 RUN  v3.2.4 /scrap
      Coverage enabled with v8

 ✓ src/__tests__/Logo.test.tsx (1 test) 37ms
   ✓ Logo component (1)
     ✓ should render the link and ensure it points to the project website 35ms
 ✓ src/__tests__/ControlCenter.test.tsx (1 test) 33ms
   ✓ ControlCenter component (1)
     ✓ shows accordeon elements 31ms
 ✓ src/__tests__/ThemeSwitcher.test.tsx (1 test) 61ms
   ✓ ThemeSwitcher component (1)
     ✓ should switch dark and light theme according to user interaction 59ms
 ✓ src/__tests__/Welcoming.test.tsx (3 tests) 115ms
   ✓ Welcoming component (3)
     ✓ shows logo and theme switcher 52ms
     ✓ shows welcoming text 9ms
     ✓ shows the disclaimer text by default and switches to ControlCenter component contents once the user agrees 51ms
 ✓ src/__tests__/Disclaimer.test.tsx (6 tests) 136ms
   ✓ Disclaimer component (6)
     ✓ shows disclaimer writings 40ms
     ✓ shows checkbox and button 20ms
     ✓ button is disabled as default 5ms
     ✓ click on checkbox enables button 31ms
     ✓ set agreement to local storage and updates state when user agrees 24ms
     ✓ does not set localStorage if checkbox is not checked 14ms

 Test Files  5 passed (5)
      Tests  12 passed (12)
   Start at  22:20:10
   Duration  1.07s (transform 137ms, setup 0ms, collect 1.07s, tests 383ms, environment 1.70s, prepare 505ms)

 % Coverage report from v8
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |     100 |      100 |     100 |     100 |                   
 ControlCenter      |     100 |      100 |     100 |     100 |                   
  ControlCenter.tsx |     100 |      100 |     100 |     100 |                   
 Onboarding         |     100 |      100 |     100 |     100 |                   
  Disclaimer.tsx    |     100 |      100 |     100 |     100 |                   
  Logo.tsx          |     100 |      100 |     100 |     100 |                   
  ThemeSwitcher.tsx |     100 |      100 |     100 |     100 |                   
  Welcoming.tsx     |     100 |      100 |     100 |     100 |                   
--------------------|---------|----------|---------|---------|-------------------
```
