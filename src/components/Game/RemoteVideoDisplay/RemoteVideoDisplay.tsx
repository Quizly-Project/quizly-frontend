// RemoteVideoDisplay.tsx
import React from 'react';
import VideoComponent from '../LiveKit/components/VideoComponent';
import AudioComponent from '../LiveKit/components/AudioComponent'; // Update import statement
import { useLiveKitStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

const RemoteVideoDisplay: React.FC<{ participantId: string }> = ({
  participantId,
}) => {
  const remoteVideoTrack = useLiveKitStore(state =>
    state.remoteVideoTracks.get(participantId)
  );

  // console.log('remoteVideoTrack', participantId, remoteVideoTrack);

  if (!remoteVideoTrack) return null;

  return (
    <VideoComponent
      track={remoteVideoTrack}
      participantIdentity={participantId}
      local={false}
    />
  );
};

export default RemoteVideoDisplay;
