// MyCameraOtherVoice.tsx
import React from 'react';
import VideoComponent from '../LiveKit/components/VideoComponent';
import AudioComponent from '../LiveKit/components/AudioComponent'; // Update import statement
import { useLiveKitStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';
import RemoteVideoDisplay from '../RemoteVideoDisplay/RemoteVideoDisplay';
import AudioControl from '../LiveKit/components/AudioControl';

interface LiveKitProps {
  quizResult: any;
  selectedStudent: string;
}

const MyCameraOtherVoice: React.FC<LiveKitProps> = ({ selectedStudent }) => {
  const { localTrack, remoteTracks } = useLiveKitStore();
  const { nickName } = useQuizRoomStore(state => state.quizRoom);
  return (
    <div id="room">
      <div id="layout-container">
        {selectedStudent ? (
          <RemoteVideoDisplay participantId={selectedStudent} />
        ) : (
          localTrack && (
          <div>  
            {/* <VideoComponent
              track={localTrack}
              participantIdentity={nickName}
              local={true}
            /> */}
            <AudioControl participantIdentity={nickName} isLocal={true} />
          </div>    
          )
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
