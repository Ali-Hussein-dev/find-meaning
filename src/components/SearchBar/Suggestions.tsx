import * as React from 'react';
import { SearchCtx, HighlightSubstring } from '@/components/index';

//=======================
export const Suggestions: React.FC = () => {
  const { inputValue, combobox, filteredSuggestions } =
    React.useContext(SearchCtx);
  const { getMenuProps, getItemProps, selectItem, isOpen, highlightedIndex } =
    combobox;
  //======================================return
  return (
    <ul
      {...getMenuProps()}
      className="absolute z-30 w-full py-2 text-base tracking-wide rounded-b-lg shadow-lg b bg-blueGray-800 top-12 text-lightBlue-300"
      hidden={!(isOpen && filteredSuggestions.length > 0)}
    >
      {filteredSuggestions?.map((o, i) => {
        return (
          <li
            key={i}
            onClick={() => {
              selectItem(o);
            }}
            type="submit"
            className={`${
              highlightedIndex === i ? 'bg-blueGray-600 text-lightBlue-100' : ''
            } flex items-center justify-between py-1 pl-4 my-1 hover:cursor-default`}
            {...getItemProps({ item: o, index: i, key: o.h })}
          >
            <HighlightSubstring inputValue={inputValue} suggestion={o.h} />
          </li>
        );
      })}
    </ul>
  );
};
