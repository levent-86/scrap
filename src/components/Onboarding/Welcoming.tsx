/* 
    Welcoming.tsx Component

    This component displays a welcome screen for the Chrome extension.
    It checks if the user has agreed to the disclaimer via localStorage.
    If not agreed, it shows the Disclaimer component; otherwise, it shows a placeholder.
*/

import { useEffect, useState } from 'react';
import { Disclaimer } from './Disclaimer';
import { ControlCenter } from '../ControlCenter/ControlCenter';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Logo } from './Logo';

export const Welcoming = () => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  useEffect(() => {
    const agreement = localStorage.getItem('isUserAgreed');
    if (agreement === 'true') {
      setIsAgreed(true);
    }
  }, [isAgreed, setIsAgreed]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <Logo />
        <ThemeSwitcher />
      </div>
      <article className="prose">
        <h2 className="text-base-content/50 text-center">
          NeuraLetter Suite: Scrap
        </h2>
        {!isAgreed ? (
          <Disclaimer setIsAgreed={setIsAgreed} />
        ) : (
          <ControlCenter />
        )}
      </article>
    </>
  );
};
