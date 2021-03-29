import * as React from 'react';
import { TiInfoOutline } from 'react-icons/ti';
import { EmptyResponseUI, LoadingIndicator } from '@/components/index';

//-------------------------------
interface CondCompT extends React.ComponentPropsWithoutRef<'div'> {
  baseCond: boolean;
  fallback?: React.ReactElement;
  isFragment?: boolean;
}
//=======================CondComp stands for conditional component
export const CondComp: React.FC<CondCompT> = ({
  baseCond,
  children,
  fallback = null,
  isFragment = false,
  ...props
}) => {
  return baseCond && !isFragment ? (
    <div data-testid="cc-container" {...props}>
      {children}{' '}
    </div>
  ) : baseCond && isFragment ? (
    <>{children} </>
  ) : (
    fallback
  );
};
//--------------------------------------
interface AsyncCondCompT extends React.ComponentPropsWithoutRef<'div'> {
  status?: 'idle' | 'success' | 'loading' | 'error';
  isSuccess: boolean;
  isIdle?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isFragment?: boolean;
  isResponseEmpty?: boolean;
  customEmptyResponse?: React.ReactElement;
  customFallbackComp?: React.ReactElement;
  customLoadingComp?: React.ReactElement;
  customIdleComp?: React.ReactElement;
}
//=======================Async CondComp
export const AsyncCondComp: React.FC<AsyncCondCompT> = ({
  isSuccess,
  children,
  isIdle,
  isLoading = false,
  isError = false,
  isFragment = false,
  isResponseEmpty,
  customLoadingComp,
  customFallbackComp,
  customEmptyResponse,
  customIdleComp,
  ...props
}) => {
  try {
    return (isSuccess || status === 'success') && isFragment ? (
      <>{children}</>
    ) : (isSuccess || status === 'success') && !isFragment ? (
      <div {...props}>{children} </div>
    ) : isLoading || status === 'loading' ? (
      <CondComp
        baseCond={React.isValidElement(customLoadingComp)}
        fallback={<LoadingIndicator />}
      >
        {customLoadingComp}
      </CondComp>
    ) : isResponseEmpty ? (
      <CondComp
        baseCond={React.isValidElement(customEmptyResponse)}
        fallback={<EmptyResponseUI />}
      >
        {customEmptyResponse}
      </CondComp>
    ) : isIdle || status === 'idle' ? (
      <CondComp
        baseCond={React.isValidElement(customIdleComp)}
        fallback={undefined}
      >
        {customIdleComp}
      </CondComp>
    ) : isError || status === 'error' ? (
      <CondComp
        baseCond={React.isValidElement(customFallbackComp)}
        fallback={
          <div
            data-testid="fallback-error"
            role="alert"
            className="flex flex-col items-center"
          >
            <TiInfoOutline size="30" className="text-orange-700 " />
            <p>Something went wrong!</p>
          </div>
        }
      >
        {customFallbackComp}
      </CondComp>
    ) : null;
  } catch (error) {
    return React.isValidElement(customFallbackComp) ? (
      customFallbackComp
    ) : (
      <div
        data-testid="fallback-error"
        role="alert"
        className="flex flex-col items-center"
      >
        <TiInfoOutline size="30" className="text-orange-700" />
        <p>Something went wrong!</p>
      </div>
    );
  }
};
