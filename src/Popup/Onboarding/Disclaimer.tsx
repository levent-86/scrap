/* 
Disclaimer.tsx component

This component fulfills the Terms of Use and Disclaimer requirements. 
The user clicks a checkbox indicating their acceptance, 
and when they click the "Continue" button, the information 
"isUserAgreed": "true" is stored in localStorage.
*/

import React, { useState } from 'react';

interface DisclaimerProps {
  setIsAgreed: (value: boolean) => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ setIsAgreed }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const checkHandler = () => {
    localStorage.setItem('isUserAgreed', String(checked));
    setIsAgreed(true);
  };

  return (
    <>
      <article className="prose">
        <h3>
          <strong>Terms of Use and Disclaimer</strong>
        </h3>
        <p>
          <strong>1. Data Collection and Privacy:</strong> This extension is a
          strictly manual tool designed to help you select and organize data
          from web pages. The extension DOES NOT collect, store, transmit, or
          process any personal or non-personal data automatically from your
          browser or device; all actions are initiated and controlled by you.
        </p>
        <p>
          <strong>2. User Responsibility (Legal Compliance):</strong>
          You, the user, are solely responsible for all data collected
          (including text, images, and other content). You must ensure that your
          data collection methods comply with the copyrights, terms of service,
          and all applicable local and international laws (such as GDPR or KVKK)
          of the websites you visit. Unauthorized collection of personal data
          (e.g., names, email addresses, phone numbers) is prohibited, and the
          user bears all legal liability for such actions.
        </p>

        <p>
          <strong>3. No Warranty:</strong>
          This extension is provided "AS IS," without warranty of any kind,
          express or implied. The developer makes no guarantees regarding its
          functionality, reliability, or suitability for a particular purpose
          and cannot be held liable for any direct or indirect damages arising
          from its use.
        </p>

        <p>
          By using this extension, you declare that you have read, understood,
          and agreed to the terms outlined above.
        </p>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-64 border p-4">
          <legend className="fieldset-legend">Agreement</legend>
          <label className="label">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="checkbox"
            />
            I have read and agree to the terms and conditions.
          </label>
        </fieldset>
      </article>

      <button
        className="btn"
        disabled={!checked && true}
        onClick={checkHandler}
      >
        Continue
      </button>
    </>
  );
};
