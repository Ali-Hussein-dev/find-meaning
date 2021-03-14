import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/spinner';
import { useFetch } from 'src/utils';
import { CC } from './CC';
import { Input } from './Input';

//=======================
export const SearchBar: React.FC = () => {
  // hooks
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState('');
  const [isEnabled, setIsEnabled] = React.useState(false);

  let query;
  // eslint-disable-next-line prefer-const
  query = typeof router.query?.q === 'string' ? router.query?.q : inputValue;

  React.useEffect(() => {
    if (typeof router.query?.q !== 'string') {
      router.push({ query: { q: inputValue.toLowerCase() } });
    }
    setInputValue(query);
  }, []);

  const { status } = useFetch(query, query ? true : isEnabled);
  //--------------------------------------
  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({ query: { q: inputValue.toLowerCase() } });
    setIsEnabled(true);
  };
  //--------------------------------------
  return (
    <div className="w-full pt-5 mb-3 text-trueGray-600">
      <form
        className="flex items-center overflow-hidden border-b rounded-t-lg focus-within:border-lightBlue-400 focus-within:bg-blueGray-700 focus-within:opacity-90 border-blueGray-400 focus-within:border-b-2"
        onSubmit={handleSubmit}
        role="form"
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={status === 'loading'}
        />
        <div className="flex items-center text-trueGray-500 bg-blueGray-800">
          <CC isTrue={inputValue.length > 0}>
            <button
              onClick={() => setInputValue('')}
              disabled={status === 'loading'}
              aria-label="delete-button"
              type="button"
              className="w-12 h-12 transform focus:outline-none active:scale-90 focus:bg-blueGray-500 disabled:text-trueGray-400 disabled:cursor-not-allowed text-blueGray-200"
            >
              <MdClear size="20" className="mx-auto" />
            </button>
          </CC>
          <div className="w-1 h-8 border-r" />
          <span className="grid w-12 h-12 place-items-center">
            {status === 'loading' ? (
              <Spinner size="sm" className=" text-lightBlue-300" />
            ) : (
              <label>
                <button
                  disabled={inputValue.length === 0}
                  role="button"
                  type="submit"
                  aria-label="submit"
                  className="focus:outline-none focus:bg-blueGray-500 text-blueGray-200"
                >
                  <BsSearch />
                </button>
              </label>
            )}
          </span>
        </div>
      </form>
    </div>
  );
};
