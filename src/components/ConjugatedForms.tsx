import { Tooltip } from '@chakra-ui/react';
import * as React from 'react';
//=======================
export interface ConjugatedFormsT {
  infinitive: string;
  simplePast: string;
  pastParticiple: string;
  continous: string;
}
//=======================
export const Pipe: React.FC = () => (
  <span className="text-blueGray-300">|</span>
);

export const ConjugatedForms: React.FC<{
  forms: ConjugatedFormsT;
}> = ({ forms }) => {
  const entries = Object.entries(forms);
  //======================================return
  return (
    <>
      {entries.map((a, i) => (
        <React.Fragment key={i}>
          <Tooltip hasArrow label={[a[0]]} aria-label="a tooltip">
            {a[1]}
          </Tooltip>
          {entries.length - 1 > i ? <Pipe /> : null}
        </React.Fragment>
      ))}
    </>
  );
};
