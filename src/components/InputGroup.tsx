import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { Spinner, Tooltip } from '@chakra-ui/react';
import { CondComp, Input } from '@/components/index';
import { GetInputPropsOptions, GetLabelPropsOptions } from 'downshift';
import { useIsFetching } from 'react-query';
//=======================
export const InputGroup: React.FC<{
  inputValue: string;
  setInputValue: (prvState: string) => void;
  getLabelProps: (options?: GetLabelPropsOptions) => any;
  getInputProps: <T>(options?: T) => T & GetInputPropsOptions;
}> = ({ getLabelProps, getInputProps, inputValue, setInputValue }) => {
  //--------------------------------------hooks
  const isFetchingLingua = !!useIsFetching('lingua');
  const inputRef = React.useRef<HTMLInputElement>(null);
  //--------------------------------------functions
  const handleClear = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };
  const onBlur = () => {
    setInputValue(inputValue);
  };
  return (
    <>
      <label {...getLabelProps()} className="w-full">
        <Input
          cn="pl-3 bg-blueGray-800 text-blueGray-200"
          {...getInputProps()}
          value={inputValue}
          onBlur={onBlur}
          disabled={isFetchingLingua}
          ref={inputRef}
        />
      </label>
      <div className="flex items-center text-trueGray-500 bg-blueGray-800">
        <CondComp baseCond={inputValue?.length > 0} isFragment>
          <Tooltip hasArrow label="clear" aria-label="a tooltip">
            <button
              onClick={handleClear}
              disabled={isFetchingLingua}
              aria-label="clear"
              type="reset"
              data-testid="del-btn"
              className="btn w-12 h-12 rounded-none text-blueGray-200"
            >
              <MdClear size="20" className="mx-auto" />
            </button>
          </Tooltip>
          <div className="w-1 h-8 border-r" />
        </CondComp>
        <CondComp
          baseCond={!isFetchingLingua}
          fallback={
            <div className="grid w-12 h-12 place-items-center text-lightBlue-300">
              <Spinner size="sm" />
            </div>
          }
          className="grid w-12 h-12 place-items-center"
        >
          <Tooltip hasArrow label="submit" aria-label="a tooltip">
            <button
              disabled={inputValue.length === 0 || isFetchingLingua}
              role="button"
              type="submit"
              aria-label="submit"
              className="icon-btn w-12 h-12 rounded-none text-blueGray-200"
            >
              <BsSearch className="mx-auto" />
            </button>
          </Tooltip>
        </CondComp>
      </div>
    </>
  );
};
