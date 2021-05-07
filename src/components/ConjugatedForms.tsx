import { Tooltip } from '@chakra-ui/react';
import * as React from 'react';
//=======================
type formLabels =
  | 'Infinitive'
  | 'Simple past'
  | 'Past participle'
  | 'Continous';
export type ConjugatedFormsT = [formLabels, string][];

//=======================
export const Pipe: React.FC = () => (
  <span className="text-blueGray-300">|</span>
);

export const ConjugatedForms: React.FC<{
  forms: ConjugatedFormsT;
}> = ({ forms }) => {
  //======================================return
  return (
    <>
      {forms.map((a, i) => (
        <React.Fragment key={i}>
          <Tooltip hasArrow label={[a[0]]} aria-label="a tooltip">
            {a[1]}
          </Tooltip>
          {forms.length - 1 > i ? <Pipe /> : null}
        </React.Fragment>
      ))}
    </>
  );
};
