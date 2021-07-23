import * as React from 'react';
import { useRouter } from 'next/router';
import { useIsFetching, useQuery } from 'react-query';
import { fetcherPost, fetcherGet } from 'src/utils';
import { useDebounce } from 'use-debounce';
import { useCombobox } from 'downshift';
import { useFocusEffect } from '@chakra-ui/react';

import create from 'zustand';

export type globalState = {
  isInputFocused: boolean;
  focusInput: () => void;
  blurInput: () => void;
};
export const useStore = create<globalState>((set) => ({
  isInputFocused: false,
  focusInput: () => set((_state) => ({ isInputFocused: true })),
  blurInput: () => set((_state) => ({ isInputFocused: false })),
}));
const storeSelector = (s) => ({
  focusInput: s.focusInput,
  blurInput: s.blurInput,
  isInputFocused: s.isInputFocused,
});
//--------------------------------------
export const useSearch = () => {
  const router = useRouter();
  // @ts-ignore
  const routerQuery: string = router.query.q ?? '';
  const [inputValue, setInputValue] = React.useState(routerQuery);
  //--------------------------------------autocomplete-start
  const [enableAutocomplete, setEnableAutocomplete] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<
    { h: string }[]
  >([]);
  const [debounceValue] = useDebounce(inputValue, 100);
  useQuery(
    ['autocomplete', debounceValue],
    () => fetcherGet({ query: inputValue.toLowerCase() }),
    {
      staleTime: 1000,
      cacheTime: Infinity,
      enabled: !inputValue ? false : enableAutocomplete,
      refetchOnWindowFocus: false,
      onSuccess: (d) => {
        setFilteredSuggestions(d?.suggestions[0]?.list || []);
      },
      onError: () => {
        setFilteredSuggestions([]);
      },
    },
  );
  //--------------------------------------Accessbility-downshift
  const combobox = useCombobox({
    items: filteredSuggestions,
    inputValue,
    itemToString: (item) => (item ? item.h : ''),
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue);
      setEnableAutocomplete(true);
    },
  });
  const { closeMenu } = combobox;
  //--------------------------------------Fetching definitions
  const isFetchingLingua = !!useIsFetching('lingua');
  const [enableFetching, setEnableFetching] = React.useState(false);
  const { status, data } = useQuery(
    ['lingua', routerQuery],
    () =>
      fetcherPost('api/handlers', {
        query: routerQuery,
        keyQuery: 'lingua',
      }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!inputValue && enableFetching,
      keepPreviousData: true,
    },
  );
  React.useEffect(() => {
    if (enableFetching) {
      setEnableFetching(false);
    }
    setInputValue(routerQuery);
  }, [routerQuery]);
  const handleSubmit = (e) => {
    e.preventDefault();
    closeMenu();
    setEnableFetching(true);
    if (router.pathname === '/') {
      router.push({
        pathname: '/search',
        query: { q: inputValue.toLowerCase().trim() },
      });
    } else {
      router.push({ query: { q: inputValue.trim().toLowerCase() } });
    }

    setEnableAutocomplete(false);
    blurInput();
  };
  //--------------------------------------inputFocus
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isInputFocused, focusInput, blurInput } = useStore(storeSelector);
  useFocusEffect(inputRef, { shouldFocus: isInputFocused });
  //--------------------------------------Deletion
  const handleClear = React.useCallback(() => {
    setInputValue('');
    focusInput();
  }, []);
  //--------------------------------------
  return {
    routerQuery,
    inputValue,
    data,
    status,
    isFetchingLingua,
    filteredSuggestions,
    setInputValue,
    handleSubmit,
    handleClear,
    combobox,
    setEnableAutocomplete,
    inputRef,
    router,
  };
};
