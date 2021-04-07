import { HighlightSubstring } from '@/components/index';
import { render, screen } from '../testUtils';
describe('Highlight unmatched characters when typing', () => {
  it('Should unbold inputValue characters', () => {
    render(
      <HighlightSubstring inputValue={'sugg'} suggestion={'suggestion'} />,
    );
    const matched = screen.getByText('sugg');
    expect(matched).toHaveAttribute('class', 'text-blueGray-300');
  });
  //--------------------------------------
  it('Should display unhighlighted characters WHEN inputValue is empty', () => {
    const { container } = render(
      <HighlightSubstring inputValue="" suggestion="suggestion" />,
    );
    expect(container).toMatchSnapshot();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          <span
            class="text-blueGray-300"
          />
          <span>
            suggestion
          </span>
        </span>
      </div>
    `);
  });
  //--------------------------------------
});
