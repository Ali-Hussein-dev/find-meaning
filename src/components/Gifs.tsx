import * as React from 'react';
//=======================
export const Gifs: React.FC<{ list: any[] }> = ({ list }) => {
  // hooks
  //--------------------------------------
  // functions
  //--------------------------------------
  return (
    <div className="flex flex-col">
      <div className="flex w-full mb-1 overflow-y-hidden h-28 gap-x-1">
        <div className="flex overflow-x-scroll overflow-y-hidden h-36 gap-x-1">
          {list.map((o: any, i: number) => (
            <img
              key={i}
              src={o.images.fixed_height.webp}
              className="flex-shrink-0 overflow-hidden rounded w-28 h-28"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
