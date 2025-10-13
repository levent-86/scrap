Coverage report from CLI

```bash
─❯ npm run test -- --coverage --watch=false

> scrap@0.0.0 test
> vitest --reporter=verbose --coverage --watch=false


 RUN  v3.2.4 /scrap
      Coverage enabled with v8

 ✓ src/__tests__/Welcoming.test.tsx (2 tests) 66ms
   ✓ Welcoming (2)
     ✓ shows welcoming text 24ms
     ✓ shows the disclaimer text by default and switches to "TODO" content once the user agrees 40ms
 ✓ src/__tests__/Disclaimer.test.tsx (6 tests) 97ms
   ✓ Disclaimer (6)
     ✓ shows disclaimer writings 27ms
     ✓ shows checkbox and button 10ms
     ✓ button is disabled as default 4ms
     ✓ click on checkbox enables button 25ms
     ✓ set agreement to local storage and updates state when user agrees 20ms
     ✓ does not set localStorage if checkbox is not checked 10ms

 Test Files  2 passed (2)
      Tests  8 passed (8)
   Start at  19:30:50
   Duration  838ms (transform 59ms, setup 0ms, collect 376ms, tests 163ms, environment 483ms, prepare 146ms)

 % Coverage report from v8
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 |                   
 Disclaimer.tsx |     100 |      100 |     100 |     100 |                   
 Welcoming.tsx  |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------
```
