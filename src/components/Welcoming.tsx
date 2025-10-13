/* 
  This component displays a welcome screen for the Chrome extension.
  It checks if the user has agreed to the disclaimer via localStorage.
  If not agreed, it shows the Disclaimer component; otherwise, it shows a placeholder.
*/

import { useEffect, useState } from 'react';
import { Disclaimer } from './Disclaimer';

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
      <article className="prose">
        <h2 className="text-base-content/50">NeuraLetter Suite: Scrap</h2>
        {!isAgreed ? <Disclaimer setIsAgreed={setIsAgreed} /> : <p>TODO</p>}
      </article>
    </>
  );
};
