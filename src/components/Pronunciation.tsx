import * as React from 'react';
import { TiVolumeUp } from 'react-icons/ti';
import { CondComp } from './CC';
//=======================
export const Pronunciation: React.FC<{ audioSrc: string | undefined }> = ({
  audioSrc,
}) => {
  // hooks
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>();
  //--------------------------------------
  // functions
  //--------------------------------------
  const playAudio = React.useCallback(() => {
    audioRef?.current?.load();
    if (audioRef?.current?.play() !== undefined) {
      audioRef?.current?.play();
    }
  }, []);
  return (
    <CondComp baseCond={!!audioSrc} isFragment>
      <button
        className=" text-lightBlue-400 press-effect icon-btn "
        aria-label="audio-btn"
        onClick={playAudio}
        disabled={isPlaying}
        role="button"
      >
        <TiVolumeUp size="30" />
      </button>
      <audio
        preload="auto"
        data-testid="audioTag"
        ref={audioRef}
        onPlaying={() => {
          setIsPlaying(!isPlaying);
        }}
        onEnded={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element!
      </audio>
    </CondComp>
  );
};
