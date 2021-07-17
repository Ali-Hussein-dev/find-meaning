import Zoom from 'react-reveal/Zoom';
import { MdKeyboard } from 'react-icons/md';

export const FocusBtn = ({ shouldInputFocus, setShouldInputFocus }) => {
  return !shouldInputFocus ? (
    <Zoom wait={100}>
      <button
        onMouseDown={() => {
          setShouldInputFocus(true);
        }}
        type="button"
        className="icon-btn fixed z-10 w-12 h-12 p-2 shadow-xl from-lightBlue-700 to-emerald-400 bg-gradient-to-tl bottom-2 right-2 text-blueGray-200 rounded-xl press-effect opacity-80"
      >
        <MdKeyboard className="mx-auto" size="25" />
      </button>
    </Zoom>
  ) : null;
};
