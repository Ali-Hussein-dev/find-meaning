import * as React from 'react';

interface Div extends React.ComponentPropsWithoutRef<'div'> {
  isTrue: any;
  fallback?: React.ReactElement;
}
//======================= CC stands for conditional component
export const CC: React.FC<Div> = ({
  isTrue,
  children,
  fallback = null,
  ...props
}) => {
  return isTrue ? <div {...props}>{children} </div> : fallback;
};
