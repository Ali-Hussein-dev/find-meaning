//=======================
export const DefExm: React.FC<{
  def: string;
  exm: string | string[];
  context?: string[];
}> = ({ def, exm, context }) => {
  // hooks
  //--------------------------------------
  // functions
  //--------------------------------------
  return (
    <div className="flex items-start w-full mb-2 text-trueGray-600">
      <div className="w-8 pt-3 pl-3 xs:hidden ">
        <div className="w-1 h-1 rounded-lg bg-lightBlue-200" />
      </div>
      <div className="w-11/12">
        <p>
          <span className="italic text-lightBlue-300">{context?.join()} </span>
          {def}
        </p>
        {typeof exm === 'string' ? (
          <p className="text-blueGray-400">{exm}</p>
        ) : Array.isArray(exm) ? (
          exm?.map((str, i) => (
            <p className="text-blueGray-400" key={i}>
              {str}
            </p>
          ))
        ) : null}
      </div>
    </div>
  );
};
