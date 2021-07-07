import * as React from 'react';
import {
  useSearch,
  Input,
  Delete,
  Suggestions,
  Submit,
} from '@/components/index';
//--------------------------------------
export const SearchCtx = React.createContext(undefined);
//--------------------------------------
export const SearchBar: React.FC = () => {
  const searchbarStore = useSearch();
  const { handleSubmit, combobox } = searchbarStore;
  const { getComboboxProps } = combobox;
  return (
    <SearchCtx.Provider value={{ ...searchbarStore }}>
      <div className="relative flex flex-col w-full">
        <form
          onSubmit={handleSubmit}
          className={`relative flex items-center justify-between w-full focus-within:bg-blueGray-700 focus-within:opacity-90 border-lightBlue-400 focus-within:border-lightBlue-400 focus-within:border-b-2 border-b`}
          {...getComboboxProps()}
        >
          <Input />
          <Delete />
          <Submit />
        </form>
        <Suggestions />
      </div>
    </SearchCtx.Provider>
  );
};
