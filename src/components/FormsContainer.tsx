import { CondComp } from '@/components/index';

export const FormsContainer: React.FC<{ baseCond: boolean }> = ({
  baseCond,
  children,
}) => (
  <CondComp
    baseCond={baseCond}
    className="flex flex-wrap items-start font-semibold rounded gap-x-2 gap-y-1 text-blueGray-600"
  >
    <span className="label">forms</span>
    {children}
  </CondComp>
);
