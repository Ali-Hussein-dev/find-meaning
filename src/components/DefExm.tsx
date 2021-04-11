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
          <p className="italic font-light text-fuchsia-800">{exm}</p>
        ) : Array.isArray(exm) ? (
          exm?.map((str, i) => (
            <p className="italic font-light text-fuchsia-800" key={i}>
              {str}
            </p>
          ))
        ) : null}
      </>
    </div>
  );
};
