/*
ThemeSwitcher.tsx Component

This component provides a toggle switch to control the application's theme.
It reads and persists the 'isdark' preference in localStorage, defaulting to 'false' (lofi - light theme).
The switch visually controls the theme by setting the 'data-theme' attribute on the <html> tag,
which relies on the DaisyUI configuration for 'sunset' and 'lofi' themes.
*/

import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const storedTheme = localStorage.getItem('isdark');
  const [isdark, setIsdark] = useState(
    storedTheme !== null ? JSON.parse(storedTheme) : false
  );

  useEffect(() => {
    localStorage.setItem('isdark', JSON.stringify(isdark));
  }, [isdark]);

  return (
    <>
      <label className="toggle text-base-content">
        <input
          type="checkbox"
          value="sunset"
          className="theme-controller"
          checked={isdark}
          onChange={() => setIsdark(!isdark)}
        />

        <svg
          aria-label="sun"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </g>
        </svg>

        <svg
          aria-label="moon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </g>
        </svg>
      </label>
    </>
  );
};
