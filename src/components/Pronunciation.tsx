import * as React from 'react';
import { TiVolumeUp } from 'react-icons/ti';
//=======================
export const Pronunciation: React.FC<{ audioSrc: string }> = ({ audioSrc }) => {
  // hooks
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>();
  //--------------------------------------
  // functions
  const playAudio = () => {
    audioRef?.current?.load();
    audioRef?.current?.play();
  };
  //--------------------------------------
  return (
    <div className="grid place-items-center">
      <button
        className="transform text-lightBlue-400 disabled:text-blueGray-400 focus:outline-none focus:scale-90"
        aria-label="audio-btn"
        onClick={playAudio}
        disabled={isPlaying}
        role="button"
      >
        <TiVolumeUp size="25" className="" />
      </button>
      <audio
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
    </div>
  );
};
