import * as React from 'react';
import { Spinner, Tooltip } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { SearchCtx } from '@/components/index';

//=======================Submit
export const Submit = () => {
  const { inputValue, isFetchingLingua } = React.useContext(SearchCtx);
  return isFetchingLingua ? (
    <div className="grid w-12 h-12 place-items-center text-lightBlue-300">
      <Spinner size="sm" />
    </div>
  ) : (
    <Tooltip hasArrow label="submit" aria-label="a tooltip">
      <button
        disabled={inputValue.length === 0 || isFetchingLingua}
        role="button"
        type="submit"
        aria-label="submit"
        className="icon-btn w-12 h-12 rounded-none text-blueGray-100 disabled:text-blueGray-300"
      >
        <BsSearch className="mx-auto" />
      </button>
    </Tooltip>
  );
};
