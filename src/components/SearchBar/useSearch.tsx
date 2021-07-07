import * as React from 'react';
import { useRouter } from 'next/router';
import { useIsFetching, useQuery } from 'react-query';
import { fetcherPost, fetcherPost2 } from 'src/utils';
import { useDebounce } from 'use-debounce';
import { useCombobox } from 'downshift';

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
    () =>
      fetcherPost2('api/autocomplete', {
        query: inputValue.toLowerCase(),
      }),
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
      enabled: enableFetching,
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
    setEnableFetching(true);
    closeMenu();
    if (router.pathname === '/') {
      router.push({
        pathname: '/search',
        query: { q: inputValue.toLowerCase().trim() },
      });
    } else {
      router.push({ query: { q: inputValue.trim().toLowerCase() } });
    }
    setEnableAutocomplete(false);
  };
  //--------------------------------------Deletion
  const handleClear = () => {
    setInputValue('');
  };
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
  };
};
