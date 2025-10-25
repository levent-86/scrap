/* 
Menu.tsx

This is navbar like menu for both side panel and popup.
DaisyUI Menu
*/

import { ThemeSwitcher } from './ThemeSwitcher';

export const Menu = () => {
  return (
    <>
      <ul className="menu menu-horizontal bg-base-200 rounded-box justify-between w-full mb-3">
        <li>
          <a
            href="https://example.com"
            className="tooltip tooltip-bottom"
            data-tip="Visit Us"
            target="_blank"
          >
            <img
              src={'/pick.svg'}
              alt="MLF Developer Logo"
              width={24}
              height={24}
              className="mr-1"
            />
          </a>
        </li>
        <li className="self-center">Neuraletter Suite: Scrap</li>
        <li>
          <div className="tooltip tooltip-bottom" data-tip="Switch Theme">
            <ThemeSwitcher />
          </div>
        </li>
      </ul>
    </>
  );
};
