import * as React from 'react';
type InputProps = React.ComponentPropsWithoutRef<'input'>;
//=======================
export const Input: React.FC<InputProps> = ({ ...props }) => {
  // hooks
  //--------------------------------------
  // functions
  //--------------------------------------
  return (
    <>
      <label htmlFor="search-input" />
      <input
        type="text"
        name="search-input"
        aria-label="search-input"
        placeholder="find meaning..."
        className="w-full h-12 py-1 pl-3 text-lg disabled:text-trueGray-400 disabled:cursor-not-allowed focus:outline-none"
        {...props}
      />
    </>
  );
};
