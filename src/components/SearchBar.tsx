import * as React from 'react';
import { useRouter } from 'next/router';
import { fetcherPost } from 'src/utils';
import { Suggestions, InputGroup } from '@/components/index';
import Downshift from 'downshift';
import { BrowserView, MobileView } from 'react-device-detect';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
//=======================
export const SearchBar: React.FC<{
  pushRouter?: boolean;
}> = ({ pushRouter = false }) => {
  //--------------------------------------hooks
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState('');
  const [enabledFetching, setEnabledFetching] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<
    { h: string }[]
  >([]);
  // eslint-disable-next-line prefer-const
  let query = inputValue;
  if (typeof router.query.q !== 'string') {
    router.query.q = '';
  }
  useQuery(
    ['lingua', query],
    () => fetcherPost('api/handlers', { query, keyQuery: 'lingua' }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: enabledFetching,
      keepPreviousData: true,
    },
  );

  React.useEffect(() => {
    if (typeof router.query?.q === 'string') {
      setInputValue(router.query.q);
    }
    if (enabledFetching) {
      setEnabledFetching(false);
    }
  }, [router.query.q]);
  //--------------------------------------autocomplete-start
  const [debounceValue] = useDebounce(inputValue, 500);
  useQuery(
    ['autocomplete', debounceValue],
    () => fetcherPost('api/autocomplete', { query: inputValue.toLowerCase() }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!debounceValue,
      refetchOnWindowFocus: false,
      onSuccess: (d) => {
        setFilteredSuggestions(d.data?.suggestions[0]?.list || []);
      },
      onError: () => {
        setFilteredSuggestions([]);
      },
    },
  );
  //--------------------------------------autocomplete-end
  //--------------------------------------functions
  const handleSubmit = (e) => {
    e.preventDefault();
    setEnabledFetching(true);
    if (pushRouter) {
      router.push({
        pathname: '/search',
        query: { q: inputValue.toLowerCase().trim() },
      });
    } else {
      router.push({ query: { q: inputValue.trim().toLowerCase() } });
    }
    setFilteredSuggestions([]);
  };
  //=====================================return

  return (
    <>
      <MobileView>
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
            <div className="relative flex flex-col w-full">
              <Suggestions
                isOpen={isOpen}
                inputValue={inputValue}
                list={filteredSuggestions}
                selectItem={selectItem}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
              />
              {/* //--------------------------------------form */}
              <form
                className={`relative top-0 flex items-center justify-between w-full focus-within:bg-blueGray-700 focus-within:opacity-90 ${
                  isOpen && filteredSuggestions.length > 0
                    ? 'border-b-2 border-lightBlue-400'
                    : 'border-lightBlue-400 focus-within:border-lightBlue-400 focus-within:border-b-2 border-b'
                }`}
                action="handlers.ts"
                onSubmit={handleSubmit}
              >
                <InputGroup
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  getLabelProps={getLabelProps}
                  getInputProps={getInputProps}
                />
              </form>
            </div>
          )}
        </Downshift>
      </MobileView>
      <BrowserView>
        <Downshift
          onChange={(selection) => {
            return setInputValue(selection?.h || router.query.q);
          }}
          itemToString={(item) => (item ? item.h : '')}
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
            <div className="relative flex flex-col w-full">
              {/* //--------------------------------------form */}
              <form
                className={`relative flex items-center justify-between w-full focus-within:bg-blueGray-700 focus-within:opacity-90 ${
                  isOpen && filteredSuggestions.length > 0
                    ? 'border-b-2 border-lightBlue-400 shadow-lg'
                    : 'border-lightBlue-400 focus-within:border-lightBlue-400 focus-within:border-b-2 border-b'
                }`}
                action="handlers.ts"
                onSubmit={handleSubmit}
              >
                <InputGroup
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  getLabelProps={getLabelProps}
                  getInputProps={getInputProps}
                />
              </form>
              <Suggestions
                isOpen={isOpen}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
                selectItem={selectItem}
                inputValue={inputValue}
                list={filteredSuggestions}
              />
            </div>
          )}
        </Downshift>
      </BrowserView>
    </>
  );
};
