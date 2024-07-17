// VideoAudio.tsx
import React from 'react';
import VideoComponent from '../LiveKit/components/VideoComponent';
import AudioComponent from '../LiveKit/components/AudioComponent'; // Update import statement
import { useVoiceChatStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

interface VoiceChatProps {
  quizResult: any;
}

const MyCameraOtherVoice: React.FC<VoiceChatProps> = () => {
  const { localTrack, remoteTracks } = useVoiceChatStore();
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
