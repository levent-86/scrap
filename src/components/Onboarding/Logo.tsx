/* 
Logo.tsx component

Component uses NeuraLetter Suite logo
It links to the developer's website (via the <a> tag)
and provides a hover effect for enhanced UX.
*/

export const Logo = () => {
  return (
    <a href="https://example.com" target="_blank">
      <div
        className={`avatar w-6 rounded-full hover:opacity-80 transition-opacity transform`}
      >
        <img
          src={'/pick.svg'}
          alt="MLF Developer Logo"
          width={32}
          height={32}
        />
      </div>
    </a>
  );
};
