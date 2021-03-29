import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { useFetch } from 'src/utils';
import { CondComp, Input } from '@/components/index';

//=======================
export const SearchBar: React.FC = () => {
  // hooks
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState('');
  const [enabledFetching, setEnabledFetching] = React.useState(false);
  // eslint-disable-next-line prefer-const
  let query = inputValue;
  if (typeof router.query.q !== 'string') {
    router.query.q = '';
  }

  const linguaResponse = useFetch(['lingua', query], 'lingua', enabledFetching);
  const { status } = linguaResponse;

  React.useEffect(() => {
    if (typeof router.query?.q === 'string') {
      setInputValue(router.query.q);
    }
    if (enabledFetching) {
      setEnabledFetching(false);
    }
  }, [router.query.q]);
  //--------------------------------------
  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length === 0) {
      console.error('query must be a string and not empty');
    } else {
      setEnabledFetching(true);
    }
    router.push({ query: { q: inputValue.trim().toLowerCase() } });
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
          <CondComp baseCond={inputValue.length > 0}>
            <button
              onClick={() => setInputValue('')}
              disabled={status === 'loading'}
              aria-label="delete-button"
              type="button"
              className="w-12 h-12 rounded-none btn focus:bg-blueGray-500 text-blueGray-200"
            >
              <MdClear size="20" className="mx-auto" />
            </button>
          </CondComp>
          <div className="w-1 h-8 border-r" />
          <span className="grid w-12 h-12 place-items-center">
            <CondComp
              baseCond={status !== 'loading'}
              fallback={<Spinner size="sm" className="text-lightBlue-300" />}
            >
              <button
                disabled={inputValue.length === 0 || status === 'loading'}
                role="button"
                type="submit"
                aria-label="submit"
                className="w-12 h-12 icon-btn focus:bg-blueGray-500 text-blueGray-200"
              >
                <BsSearch className="mx-auto" />
              </button>
            </CondComp>
          </span>
        </div>
      </form>
    </div>
  );
};
