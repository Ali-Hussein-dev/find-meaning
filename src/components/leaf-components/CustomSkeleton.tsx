import { Skeleton } from '@chakra-ui/react';

export const CustomSkeleton: React.FC = () => (
  <div className="flex flex-col mb-5 gap-y-2">
    <Skeleton className="w-4/6" height="10px" />
    <Skeleton className="w-full" height="10px" />
    <Skeleton className="w-5/6" height="10px" />
    <Skeleton className="w-3/6" height="10px" />
  </div>
);
