import * as React from 'react';
import { Tooltip, Spinner } from '@chakra-ui/react';
import { ThemingProps } from '@chakra-ui/system';
import { TiInfoOutline } from 'react-icons/ti';
import { CondComp } from '@/components/index';

//=======================
export const IdleUI: React.FC<{ children?: React.ReactElement }> = ({
  children,
}) => {
  return (
    <CondComp
      baseCond={!React.isValidElement(children)}
      fallback={children}
      className="pl-2 border-l-2 border-orange-800"
    >
      💡 Tip: To quickly find relevant definitions, find the right{' '}
      <Tooltip
        hasArrow
        label="i.e: noun, verb, adjective, adverb"
        aria-label="tooltip"
        className="italic"
      >
        <span className="italic text-orange-800">parts of speech</span>
      </Tooltip>{' '}
      and then the{' '}
      <Tooltip
        hasArrow
        label="i.e: computing, medicine, transport"
        aria-label="tooltip"
        className="italic"
      >
        <span className="italic text-orange-800">context</span>
      </Tooltip>{' '}
    </CondComp>
  );
};

//=======================
export const EmptyResponseUI: React.FC<{
  children?: React.ReactElement;
  textPlaceholder?: string;
}> = ({ children, textPlaceholder }) => {
  return (
    <CondComp baseCond={!React.isValidElement(children)} fallback={children}>
      <TiInfoOutline size="30" className="mx-auto text-orange-700" />
      <p className="text-center">
        {textPlaceholder ? textPlaceholder : 'Nothing found'}
      </p>
    </CondComp>
  );
};

interface LoadingIndicatorT extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactElement;
  size?: ThemingProps<'Spinner'>['size'];
}
//=======================
export const LoadingIndicator: React.FC<LoadingIndicatorT> = ({
  children,
  size = 'md',
  ...props
}) => {
  return (
    <CondComp
      baseCond={!React.isValidElement(children)}
      fallback={children}
      isFragment
    >
      <div
        data-testid="loading-indicator"
        className="w-full p-1 text-center"
        {...props}
      >
        <Spinner size={size} />
      </div>
    </CondComp>
  );
};
