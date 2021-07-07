import * as React from 'react';
import { SearchCtx } from '@/components/index';
interface InputProps extends React.ComponentPropsWithRef<'input'> {
  cn?: string;
}
// export type inputRefType = React.ForwardedRef<HTMLInputElement>;
export type inputRefType = React.RefObject<HTMLInputElement>;

//=======================
const InputWithRef = (props: InputProps, _ref: inputRefType) => {
  const {
    cn = 'bg-blueGray-800 text-blueGray-200 focus:opacity-90 focus:bg-blueGray-700 pl-3',
  } = props;
  const {
    inputValue,
    setInputValue,
    isFetchingLingua,
    combobox,
    setEnableAutocomplete,
  } = React.useContext(SearchCtx);
  const { getInputProps, getLabelProps, closeMenu } = combobox;

  return (
    <>
      <label htmlFor="search-input" {...getLabelProps()} />
      <input
        value={inputValue}
        disabled={isFetchingLingua}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => {
          setEnableAutocomplete(false);
          closeMenu();
        }}
        accessKey="j"
        type="text"
        lang="en"
        name="search-input"
        aria-label="search-input"
        placeholder="start looking up words..."
        className={`w-full h-12 py-1 text-lg disabled:text-trueGray-400 disabled:cursor-not-allowed focus:outline-none ${cn}`}
        {...getInputProps()}
        {...props}
      />
    </>
  );
};
export const Input = React.forwardRef(InputWithRef);
