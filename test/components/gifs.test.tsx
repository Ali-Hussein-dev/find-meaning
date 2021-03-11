import { Gifs } from '@/components/Gifs';
import { render, screen } from '@/test/testUtils';
import mockedData from '@/test/mockedData.json';
describe('Gifs', () => {
  // test('expect an instance of gif when mounted', async () => {
  //   render(<Gifs list={mockedData.giphyResponse.data} />);
  //   const img0 = screen.queryByRole('img', {
  //     name: /image-0/i,
  //   });
  //   const imgs = screen.queryAllByRole('img');

  //   expect(img0).toBeInstanceOf(HTMLImageElement);
  //   expect(imgs?.length).toBe(7);
  // });
  test('expect fallback:Spinner', () => {
    const brokenSrc = '';
    render(<Gifs list={[brokenSrc]} />);
    const loading = screen.getByText(/loading\.\.\./i);
    expect(loading).toBeVisible();
  });
});
