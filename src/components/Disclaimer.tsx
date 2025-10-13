/* 
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
          This extension is a manual tool designed to help you select and
          organize data from web pages. The extension does not collect any data
          automatically; all actions are initiated and controlled by you.
        </p>
        <p>
          <strong>Responsibility:</strong> You are solely responsible for
          ensuring that the data you collect (text, images, etc.) complies with
          the copyrights and terms of service of the website you are visiting.
        </p>
        <p>
          <strong>Legal Compliance:</strong> Unauthorized collection of personal
          data (such as names, phone numbers, or email addresses) is against the
          law. You bear all legal liability for the collection of such data.
        </p>
        <p>
          <strong>No Warranty:</strong> This extension is provided "as is". The
          developer cannot be held liable for any direct or indirect damages
          arising from its use.
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
