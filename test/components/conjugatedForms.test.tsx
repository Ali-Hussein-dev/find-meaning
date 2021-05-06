import { FormsContainer, ConjugatedForms } from '@/components/index';
import { render } from '../testUtils';
describe('Conjugated Forms', () => {
  const forms = {
    infinitive: 'to play',
    simplePast: 'played',
    pastParticiple: 'played',
    continous: 'playing',
  };
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
    expect(container).not.toHaveTextContent(forms.infinitive);
  });
  //--------------------------------------
});
