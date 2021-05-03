import { Skeleton, Image } from '@chakra-ui/react';
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
            <Image
              key={i}
              role="img"
              alt={'image-' + i}
              src={o.images?.fixed_height?.webp}
              className="flex-shrink-0 overflow-hidden rounded w-28 h-28"
              fallback={
                <div className="rounded w-28 h-28 " aria-label="image-fallback">
                  <Skeleton height="7rem" width="7rem" />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
