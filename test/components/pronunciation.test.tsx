import { Pronunciation } from '@/components/Pronunciation';
import { render, screen } from '@/test/testUtils';

describe('Pronunciation', () => {
  test('expect... when...', () => {
    render(<Pronunciation audioSrc="" />);
    const audioTag = screen.getByTestId('audioTag');
    expect(audioTag).toBeInstanceOf(HTMLAudioElement);
  });
});
