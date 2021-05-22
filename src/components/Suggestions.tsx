import * as React from 'react';
import { isMobile } from 'react-device-detect';
import {
  GetItemPropsOptions,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  StateChangeOptions,
} from 'downshift';
import { HighlightSubstring } from '@/components/index';
import Zoom from 'react-reveal/Zoom';
//-------------------------------types
interface Item {
  w: string;
}
interface SuggestionsPropsT {
  isOpen: boolean;
  highlightedIndex: number;
  getItemProps: (options: GetItemPropsOptions<Item>) => any;
  getMenuProps: (
    options?: GetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions,
  ) => any;
  selectItem: (
    item: Item,
    otherStateToSet?: Partial<StateChangeOptions<Item>>,
    cb?: () => void,
  ) => void;
  inputValue: string;
  list: Item[];
}
//=======================
export const Suggestions: React.FC<SuggestionsPropsT> = ({
  inputValue,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectItem,
  list,
  isOpen,
}) => {
  //======================================return
  switch (isMobile) {
    case true:
      return (
        <div
          className="flex w-full h-10 px-2 pt-2 overflow-y-hidden text-blueGray-200 gap-x-1 focus:outline-none opacity-90"
          hidden={!(isOpen && list.length > 0)}
        >
          <ul
            {...getMenuProps()}
            className="flex h-16 pl-1 overflow-x-scroll overflow-y-hidden gap-x-3"
          >
            {list.map((o, i) => (
              <Zoom key={i} duration={300 + i * 100}>
                <li
                  {...getItemProps({ item: o, index: i, key: o.w })}
                  onClick={() => {
                    selectItem(o);
                  }}
                  className={`${
                    highlightedIndex === i
                      ? 'rounded-t border-b-2'
                      : 'rounded-lg'
                  } flex items-center h-6 px-3 bg-blueGray-700 text-lightBlue-400 whitespace-nowrap  `}
                >
                  <HighlightSubstring
                    inputValue={inputValue}
                    suggestion={o.w}
                  />
                </li>
              </Zoom>
            ))}
          </ul>
        </div>
      );
      break;
    default:
      return (
        <ul
          {...getMenuProps()}
          className="absolute z-30 w-full py-2 text-lg tracking-wide rounded-b-lg shadow-lg b bg-blueGray-800 top-12 text-lightBlue-300"
          hidden={!(isOpen && list.length > 0)}
        >
          {list.map((o, i) => {
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
                <HighlightSubstring inputValue={inputValue} suggestion={o.w} />
              </li>
            );
          })}
        </ul>
      );
      break;
  }
};
