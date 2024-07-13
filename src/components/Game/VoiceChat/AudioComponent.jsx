import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import { useEffect, useRef } from 'react';

const AudioComponent = ({ track }) => {
  const audioElement = useRef(null);

  useEffect(() => {
    console.log(track);

    if (audioElement.current) {
      track.attach(audioElement.current);
    }

    return () => {
      track.detach();
    };
  }, []);

  // return <audio ref={audioElement} id={track.sid} />;
  return <></>;
};

export default AudioComponent;
