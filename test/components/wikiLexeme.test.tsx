import { WikiLexeme } from '@/components/WikiLexeme';
import { render } from '@/test/testUtils';
import mockedData from '@/test/mockedData.json';
describe('WikiLexeme', () => {
  const lexemes = mockedData.wikiResponse.entries[0].lexemes;
  test('expect definitions', () => {
    const { container } = render(
      lexemes.map((o, i) => <WikiLexeme key={i} lexeme={o} />),
    );
    expect(container).toHaveTextContent('noun');
    expect(container).toHaveTextContent('verb');
    expect(container).toHaveTextContent('adjective');
  });
});
