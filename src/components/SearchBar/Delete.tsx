import * as React from 'react';
import { MdClear } from 'react-icons/md';
import { SearchCtx } from '@/components/index';
import { Tooltip } from '@chakra-ui/react';
//=======================Delete
export const Delete = () => {
  const { inputValue, isFetchingLingua, handleClear } =
    React.useContext(SearchCtx);
  return (
    inputValue && (
      <Tooltip hasArrow label="clear" aria-label="a tooltip">
        <button
          onClick={handleClear}
          onKeyDown={(e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
              e.preventDefault();
              handleClear();
            }
          }}
          disabled={isFetchingLingua}
          aria-label="clear"
          type="button"
          data-testid="del-btn"
          className="btn flex items-center w-12 h-12 rounded-none text-blueGray-200 gap-x-1 "
        >
          <MdClear size="20" className="mx-auto" />
          <div className="w-1 h-8 border-r" />
        </button>
      </Tooltip>
    )
  );
};
