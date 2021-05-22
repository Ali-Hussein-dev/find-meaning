import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { Spinner, Tooltip } from '@chakra-ui/react';
import { CondComp, Input } from '@/components/index';
import { GetInputPropsOptions, GetLabelPropsOptions } from 'downshift';

//=======================
export const InputGroup: React.FC<{
  status: 'loading' | 'idle' | 'error' | 'success';
  inputValue: string;
  setInputValue: (prvState: string) => void;
  getLabelProps: (options?: GetLabelPropsOptions) => any;
  getInputProps: <T>(options?: T) => T & GetInputPropsOptions;
}> = ({ getLabelProps, getInputProps, status, inputValue, setInputValue }) => {
  //--------------------------------------hooks
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
          disabled={status === 'loading'}
          ref={inputRef}
        />
      </label>
      <div className="flex items-center text-trueGray-500 bg-blueGray-800">
        <CondComp baseCond={inputValue?.length > 0} isFragment>
          <Tooltip hasArrow label="clear" aria-label="a tooltip">
            <button
              onClick={handleClear}
              disabled={status === 'loading'}
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
          baseCond={status !== 'loading'}
          fallback={
            <div className="grid w-12 h-12 place-items-center text-lightBlue-300">
              <Spinner size="sm" />
            </div>
          }
          className="grid w-12 h-12 place-items-center"
        >
          <Tooltip hasArrow label="submit" aria-label="a tooltip">
            <button
              disabled={inputValue.length === 0 || status === 'loading'}
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
