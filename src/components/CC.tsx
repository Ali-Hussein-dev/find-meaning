interface Div extends React.ComponentPropsWithoutRef<'div'> {
  isTrue: any;
}
//=======================
export const CC: React.FC<Div> = ({ isTrue, children, ...props }) => {
  // hooks
  //--------------------------------------
  // functions
  //--------------------------------------
  return isTrue ? <div {...props}>{children} </div> : null;
};
