import * as React from 'react';
interface InputProps extends React.ComponentPropsWithRef<'input'> {
  cn?: string;
}
export type inputRefType = React.ForwardedRef<HTMLInputElement>;

//=======================
const InputWithRef = (props: InputProps, ref: inputRefType) => {
  const {
    cn = 'bg-blueGray-800 text-blueGray-200 focus:opacity-90 focus:bg-blueGray-700 pl-3',
  } = props;
  return (
    <>
      <label htmlFor="search-input" />
      <input
        accessKey="j"
        type="text"
        lang="en"
        name="search-input"
        aria-label="search-input"
        placeholder="start looking up words..."
        className={`w-full h-12 py-1 text-lg disabled:text-trueGray-400 disabled:cursor-not-allowed focus:outline-none ${cn}`}
        ref={ref}
        {...props}
      />
    </>
  );
};
export const Input = React.forwardRef(InputWithRef);
