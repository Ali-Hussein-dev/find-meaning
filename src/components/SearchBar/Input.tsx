import * as React from 'react';
import { SearchCtx } from '@/components/index';
interface InputProps extends React.ComponentPropsWithRef<'input'> {
  cn?: string;
}

export type inputRefType = React.RefObject<HTMLInputElement>;

//=======================
const InputWithRef = (props: InputProps, ref: inputRefType) => {
  const {
    cn = 'bg-blueGray-800 text-blueGray-200 focus:opacity-90 focus:bg-blueGray-700 pl-3',
  } = props;
  const {
    inputValue,
    setInputValue,
    isFetchingLingua,
    combobox,
    setEnableAutocomplete,
    setShouldInputFocus,
  } = React.useContext(SearchCtx);
  const { getInputProps, getLabelProps, closeMenu } = combobox;
  return (
    <>
      <label {...getLabelProps()} />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        accessKey="j"
        type="text"
        lang="en"
        placeholder="start looking up words..."
        className={`w-full h-12 py-1 text-lg disabled:text-trueGray-400 disabled:cursor-not-allowed focus:outline-none ${cn}`}
        {...getInputProps({
          ref,
          disabled: isFetchingLingua,
          onBlur: () => {
            setEnableAutocomplete(false);
            closeMenu();
            setShouldInputFocus(false);
          },
        })}
      />
    </>
  );
};
export const Input = React.forwardRef(InputWithRef);
