import * as React from 'react';
import { SearchCtx, HighlightSubstring } from '@/components/index';
import Slide from 'react-reveal/Slide';

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
      className="absolute z-30 w-full py-2 text-base tracking-wide rounded-b-lg shadow-lg b bg-blueGray-800 top-12 text-blueGray-300"
      hidden={!(isOpen && filteredSuggestions.length > 0)}
    >
      {filteredSuggestions?.map((o, i) => {
        return (
          <Slide bottom duration={i * 100 + 200} key={i}>
            <li
              onClick={() => {
                selectItem(o);
              }}
              type="submit"
              className={`${
                highlightedIndex === i
                  ? 'bg-blueGray-600 text-lightBlue-100'
                  : ''
              } flex items-center justify-between py-1 pl-4 my-1 hover:cursor-default`}
              {...getItemProps({ item: o, index: i, key: o.h })}
            >
              <HighlightSubstring inputValue={inputValue} suggestion={o.h} />
            </li>
          </Slide>
        );
      })}
    </ul>
  );
};
