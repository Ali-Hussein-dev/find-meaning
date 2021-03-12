import { Pronunciation } from '@/components/Pronunciation';
import { render, screen } from '@/test/testUtils';

describe('Pronunciation', () => {
  test('render UI WHEN audioSrc is true', () => {
    render(
      <Pronunciation audioSrc="https://api.linguarobot.io/media/pronunciations/en/local-us.mp3" />,
    );
    const audioTag = screen.getByTestId('audioTag');
    expect(audioTag).toBeInstanceOf(HTMLAudioElement);
  });
  test('render null WHEN audio src is not defined', () => {
    const { container } = render(<Pronunciation audioSrc={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});
