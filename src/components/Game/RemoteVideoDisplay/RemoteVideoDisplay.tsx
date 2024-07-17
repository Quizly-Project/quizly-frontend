// VideoAudio.tsx
import React from 'react';
import VideoComponent from '../LiveKit/components/VideoComponent';
import AudioComponent from '../LiveKit/components/AudioComponent'; // Update import statement
import { useVoiceChatStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

interface VoiceChatProps {
  quizResult: any;
}

const RemoteVideoDisplay: React.FC<{ participantId: string }> = ({
  participantId,
}) => {
  const remoteVideoTrack = useVoiceChatStore(state =>
    state.remoteVideoTracks.get(participantId)
  );

  console.log('remoteVideoTrack', participantId, remoteVideoTrack);

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
