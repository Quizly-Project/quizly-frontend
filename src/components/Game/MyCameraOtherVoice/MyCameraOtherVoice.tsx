// MyCameraOtherVoice.tsx
import React from 'react';
import VideoComponent from '../LiveKit/components/VideoComponent';
import AudioComponent from '../LiveKit/components/AudioComponent'; // Update import statement
import { useLiveKitStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

interface LiveKitProps {
  quizResult: any;
}

const MyCameraOtherVoice: React.FC<LiveKitProps> = () => {
  const { localTrack, remoteTracks } = useLiveKitStore();
  const { nickName } = useQuizRoomStore(state => state.quizRoom);

  return (
    <div id="room">
      <div id="layout-container">
        {localTrack && (
          <VideoComponent
            track={localTrack}
            participantIdentity={nickName}
            local={true}
          />
        )}
        {remoteTracks.map(remoteTrack => {
          const audioTrack = remoteTrack.trackPublication.audioTrack;
          return audioTrack ? (
            <AudioComponent
              key={remoteTrack.trackPublication.trackSid}
              track={audioTrack}
              {...{
                participantIdentity: remoteTrack.participantIdentity,
              }}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MyCameraOtherVoice;
