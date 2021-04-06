import * as React from 'react';
interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  cn?: string;
}

//=======================
export const Input: React.FC<InputProps> = ({
  cn = 'bg-blueGray-800 text-blueGray-200 focus:opacity-90 focus:bg-blueGray-700',
  ...props
}) => {
  // hooks
  //--------------------------------------
  // functions
  //--------------------------------------
  return (
    <>
      <label htmlFor="search-input" />
      <input
        accessKey="j"
        type="text"
        lang="en"
        name="search-input"
        aria-label="search-input"
        placeholder="start searching..."
        className={`w-full h-12 py-1 pl-3 text-lg disabled:text-trueGray-400 disabled:cursor-not-allowed focus:outline-none ${cn}`}
        {...props}
      />
    </>
  );
};
