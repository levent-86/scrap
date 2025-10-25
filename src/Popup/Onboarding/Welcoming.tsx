/* 
Welcoming.tsx Component

This component displays a welcome screen for the Chrome extension.
It checks if the user has agreed to the disclaimer via localStorage.
If not agreed, it shows the Disclaimer component; otherwise, it shows a placeholder.
*/

import { useEffect, useState } from 'react';
import { Disclaimer } from './Disclaimer';
import { ControlCenter } from '../ControlCenter';
import { Menu } from '../../Menu';

export const Welcoming = () => {
  const [isAgreed, setIsAgreed] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const agreement = localStorage.getItem('isUserAgreed');
    if (agreement === 'true') {
      setIsAgreed(true);
    } else {
      setIsAgreed(false);
    }
  }, [isAgreed, setIsAgreed]);

  return (
    <>
      <Menu />
      <article className="prose">
        {isAgreed === undefined ? (
          <>
            <div className="flex w-full flex-col justify-center gap-4 mt-3">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </>
        ) : !isAgreed ? (
          <Disclaimer setIsAgreed={setIsAgreed} />
        ) : (
          <ControlCenter />
        )}
      </article>
    </>
  );
};
