import * as React from 'react';
import {
  useSearch,
  Input,
  Delete,
  Suggestions,
  Submit,
  FocusBtn,
} from '@/components/index';
import { isMobile } from 'react-device-detect';

//--------------------------------------
export const SearchCtx = React.createContext(undefined);
//--------------------------------------
export const SearchBar: React.FC = () => {
  const searchbarStore = useSearch();
  const {
    handleSubmit,
    combobox,
    inputRef,
    shouldInputFocus,
    setShouldInputFocus,
  } = searchbarStore;
  const { getComboboxProps } = combobox;
  switch (isMobile) {
    case true:
      return (
        <SearchCtx.Provider value={{ ...searchbarStore }}>
          <div className="flex justify-center w-full bg-blueGray-200">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between w-full border-b border-lightBlue-400 focus-within:border-lightBlue-400 focus-within:border-b-2 bg-blueGray-800"
              {...getComboboxProps({}, { suppressRefError: true })}
            >
              <Input ref={inputRef} />
              <Delete />
              <Submit />
            </form>
            <Suggestions />
          </div>
          <FocusBtn
            shouldInputFocus={shouldInputFocus}
            setShouldInputFocus={setShouldInputFocus}
          />
        </SearchCtx.Provider>
      );
      break;
    default:
      return (
        <SearchCtx.Provider value={{ ...searchbarStore }}>
          <div className="relative flex justify-center w-full ">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between w-full border-b border-lightBlue-400 focus-within:border-lightBlue-400 focus-within:border-b-2 bg-blueGray-800"
              {...getComboboxProps({}, { suppressRefError: true })}
            >
              <Input ref={inputRef} />
              <Delete />
              <Submit />
            </form>
            <Suggestions />
          </div>
        </SearchCtx.Provider>
      );
      break;
  }
};
