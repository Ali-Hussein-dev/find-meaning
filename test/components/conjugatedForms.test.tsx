import {
  FormsContainer,
  ConjugatedForms,
  ConjugatedFormsT,
} from '@/components/index';
import { render } from '../testUtils';
describe('Conjugated Forms', () => {
  const forms: ConjugatedFormsT = [
    ['Infinitive', 'to play'],
    ['Simple past', 'played'],
    ['Past participle', 'played'],
    ['Continous', 'playing'],
  ];
  it('Should be in the document', () => {
    const { container } = render(
      <FormsContainer baseCond={true}>
        <ConjugatedForms forms={forms} />
      </FormsContainer>,
    );
    expect(container).toBeInTheDocument();
  });
  //--------------------------------------
  it('Should NOT be in the document', () => {
    const { container } = render(
      <FormsContainer baseCond={false}>
        <ConjugatedForms forms={forms} />
      </FormsContainer>,
    );
    expect(container).not.toHaveTextContent('Infinitive');
  });
  //--------------------------------------
});
