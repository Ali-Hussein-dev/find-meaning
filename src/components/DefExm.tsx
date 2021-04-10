//=======================
export const DefExm: React.FC<{
  def: string;
  exm: string | string[];
  context?: string[];
}> = ({ def, exm, context }) => {
  return (
    <div className="w-11/12 mb-3 text-blueGray-600">
      <p>
        <span className=" text-lightBlue-500">{context?.join()} </span>
        {def}
      </p>
      <>
        {typeof exm === 'string' ? (
          <p className="ml-1 italic font-light text-trueGray-600">{exm}</p>
        ) : Array.isArray(exm) ? (
          exm?.map((str, i) => (
            <p className="ml-1 italic font-light text-trueGray-600" key={i}>
              {str}
            </p>
          ))
        ) : null}
      </>
    </div>
  );
};
