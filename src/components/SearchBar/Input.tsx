import * as React from 'react';
import { SearchCtx } from '@/components/index';
import { useStore } from './useSearch';
interface InputProps extends React.ComponentPropsWithRef<'input'> {
  cn?: string;
}

export type inputRefType = React.RefObject<HTMLInputElement>;
const storeSelector = (s) => ({
  blurInput: s.blurInput,
  focusInput: s.focusInput,
});
//=======================
const InputWithRef = (props: InputProps, ref: inputRefType) => {
  const { focusInput, blurInput } = useStore(storeSelector);
  const { cn = 'bg-blueGray-800 text-blueGray-200 pl-3' } = props;
  const {
    inputValue,
    setInputValue,
    isFetchingLingua,
    combobox,
    setEnableAutocomplete,
  } = React.useContext(SearchCtx);
  const { getInputProps, getLabelProps } = combobox;
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
            blurInput();
          },
          onFocus: () => {
            focusInput();
          },
        })}
      />
    </>
  );
};
export const Input = React.forwardRef(InputWithRef);
