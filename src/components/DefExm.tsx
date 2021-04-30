import * as react from 'react';
import { Text } from '@chakra-ui/react';

//=======================
export const LongText: React.FC = ({ children }) => {
  //--------------------------------------hooks
  const [lines, setLines] = react.useState<undefined | number[]>([2, 3, 3]);
  //--------------------------------------functions
  function handleClick() {
    typeof lines === 'undefined' ? setLines([2, 3, 4]) : setLines(undefined);
  }
  return (
    <>
      <Text
        data-testid="text-expand"
        className="mb-3 leading-5 break-words cursor-default text-blueGray-600"
        onClick={() => handleClick()}
        as="div"
        noOfLines={lines}
      >
        {children}
      </Text>
    </>
  );
};

//=======================
export const DefExm: React.FC<{
  def: string;
  exm: string | string[];
  context?: string[];
}> = ({ def, exm, context }) => {
  return (
    <div className="mb-3 text-blueGray-600">
      <LongText>
        <span className=" text-lightBlue-500">{context?.join()} </span>
        {def}
      </LongText>
      <>
        {typeof exm === 'string' ? (
          <LongText>
            <p className="italic font-light text-fuchsia-800">{exm}</p>
          </LongText>
        ) : Array.isArray(exm) ? (
          exm?.map((str, i) => (
            <LongText key={i}>
              <p className="italic font-light text-fuchsia-800">{str}</p>
            </LongText>
          ))
        ) : null}
      </>
    </div>
  );
};
