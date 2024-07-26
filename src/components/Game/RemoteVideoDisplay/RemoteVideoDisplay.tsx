import React from 'react';
import VideoComponent from '../LiveKit/components/VideoComponent';
import { useLiveKitStore } from '../../../store/liveKitStore';

interface RemoteVideoDisplayProps {
  participantId: string;
}

const RemoteVideoDisplay: React.FC<RemoteVideoDisplayProps> = ({
  participantId,
}) => {
  const localTrack = useLiveKitStore(state => state.localTrack);
  const remoteVideoTracks = useLiveKitStore(state => state.remoteVideoTracks);
  const room = useLiveKitStore(state => state.room);

  const isLocal = room?.localParticipant.identity === participantId;
  const videoTrack = isLocal
    ? localTrack
    : remoteVideoTracks.get(participantId);

  if (!videoTrack) return null;

  return (
    <VideoComponent
      track={videoTrack}
      participantIdentity={participantId}
      local={isLocal}
    />
  );
};

export default RemoteVideoDisplay;
