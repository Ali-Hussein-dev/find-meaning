import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { throttledGetSuggestions, storeSuggestion, useFetch } from 'src/utils';
import { CondComp, Input, HighlightSubstring } from '@/components/index';
import Downshift from 'downshift';

//=======================
export const SearchBar: React.FC<{ pushRouter?: boolean }> = ({
  pushRouter = false,
}) => {
  //--------------------------------------hooks
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState('');
  const [enabledFetching, setEnabledFetching] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState(
    throttledGetSuggestions('wik', inputValue),
  );
  // eslint-disable-next-line prefer-const
  let query = inputValue.trim();
  if (typeof router.query.q !== 'string') {
    router.query.q = '';
  }
  const linguaResponse = useFetch(['lingua', query], 'lingua', enabledFetching);
  const { status } = linguaResponse;

  React.useEffect(() => {
    if (typeof router.query?.q === 'string') {
      setInputValue(router.query.q);
    }
    if (enabledFetching) {
      setEnabledFetching(false);
    }
  }, [router.query.q]);

  React.useEffect(() => {
    setFilteredSuggestions(throttledGetSuggestions('wik', inputValue));
  }, [inputValue]);
  //--------------------------------------functions
  const handleSubmit = (e) => {
    e.preventDefault();
    setEnabledFetching(true);
    if (pushRouter) {
      router.push({
        pathname: '/search',
        query: { q: inputValue.toLowerCase() },
      });
    } else {
      router.push({ query: { q: inputValue.trim().toLowerCase() } });
    }
    setFilteredSuggestions([]); // this to remove the dropdown when submitting
    storeSuggestion('wik', inputValue);
  };
  //=====================================return
  return (
    <div className="w-full pt-5 mb-3 text-trueGray-600">
      <Downshift
        onChange={(selection) => {
          return setInputValue(selection?.w || router.query.q);
        }}
        itemToString={(item) => (item ? item.w : '')}
        onInputValueChange={(inputValue) => {
          setInputValue(inputValue);
        }}
        onOuterClick={(_stateAndHelpers) => {
          setInputValue(inputValue);
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
          selectItem,
        }) => (
          <div className="relative flex flex-col w-full h-full">
            <form
              className={`relative top-0 flex items-center justify-between w-full overflow-hidden rounded-t-lg focus-within:bg-blueGray-700 focus-within:opacity-90 ${
                isOpen && filteredSuggestions.length > 0
                  ? 'border-b-2 border-lightBlue-400'
                  : 'border-lightBlue-400  focus-within:border-lightBlue-400 focus-within:border-b-2 border-b'
              }`}
              onSubmit={handleSubmit}
              role="form"
              action="handlers.ts"
            >
              <label {...getLabelProps()} className="w-full">
                <Input
                  {...getInputProps()}
                  value={inputValue}
                  onBlur={() => {
                    setInputValue(inputValue);
                  }}
                  disabled={status === 'loading'}
                />
              </label>
              <div className="flex items-center text-trueGray-500 bg-blueGray-800">
                <CondComp baseCond={inputValue?.length > 0} isFragment>
                  <button
                    onClick={() => setInputValue('')}
                    disabled={status === 'loading'}
                    aria-label="delete-button"
                    type="button"
                    data-testid="del-btn"
                    className="btn w-12 h-12 rounded-none focus:bg-blueGray-500 text-blueGray-200"
                  >
                    <MdClear size="20" className="mx-auto" />
                  </button>
                  <div className="w-1 h-8 border-r" />
                </CondComp>
                <CondComp
                  baseCond={status !== 'loading'}
                  fallback={
                    <div className="grid w-12 h-12 place-items-center text-lightBlue-300">
                      <Spinner size="sm" />
                    </div>
                  }
                  className="grid w-12 h-12 place-items-center"
                >
                  <button
                    disabled={inputValue.length === 0 || status === 'loading'}
                    role="button"
                    type="submit"
                    aria-label="submit"
                    className="icon-btn w-12 h-12 rounded-none focus:bg-blueGray-500 text-blueGray-200"
                  >
                    <BsSearch className="mx-auto" />
                  </button>
                </CondComp>
              </div>
            </form>
            <CondComp
              baseCond={isOpen && filteredSuggestions.length > 0 ? true : false}
              isFragment
            >
              <ul
                {...getMenuProps()}
                className="absolute z-30 w-full py-2 text-lg tracking-wide rounded-b-lg shadow-lg b bg-blueGray-800 top-12 text-lightBlue-300"
              >
                {filteredSuggestions.map((o, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        selectItem(o);
                      }}
                      className={`${
                        highlightedIndex === i
                          ? 'bg-blueGray-600 text-lightBlue-100'
                          : ''
                      } flex items-center justify-between py-1 pl-4 my-1 hover:cursor-default`}
                      {...getItemProps({ item: o, index: i, key: o.w })}
                    >
                      <HighlightSubstring
                        inputValue={inputValue}
                        suggestion={o.w}
                      />
                    </li>
                  );
                })}
              </ul>
            </CondComp>
          </div>
        )}
      </Downshift>
    </div>
  );
};
