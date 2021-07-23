import Zoom from 'react-reveal/Zoom';
import { MdKeyboard } from 'react-icons/md';
import * as React from 'react';
import { useStore } from './useSearch';

const storeSelector = (s) => ({
  focusInput: s.focusInput,
  isInputFocused: s.isInputFocused,
});
export const FocusBtn = () => {
  const { focusInput, isInputFocused } = useStore(storeSelector);
  return !isInputFocused ? (
    <Zoom wait={100}>
      <button
        onMouseDown={() => {
          focusInput();
        }}
        type="button"
        className="icon-btn fixed z-10 w-12 h-12 p-2 shadow-xl from-lightBlue-700 to-emerald-400 bg-gradient-to-tl bottom-2 right-2 text-blueGray-200 rounded-xl press-effect opacity-80"
      >
        <MdKeyboard className="mx-auto" size="25" />
      </button>
    </Zoom>
  ) : null;
};
