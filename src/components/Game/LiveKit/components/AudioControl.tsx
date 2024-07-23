import React, { useState, useEffect } from 'react';
import { useLiveKitStore } from '../../../../store/liveKitStore';
import { LocalParticipant, RemoteParticipant, Track } from 'livekit-client';

interface AudioControlProps {
  participantIdentity: string;
  isLocal: boolean;
}

const AudioControl: React.FC<AudioControlProps> = ({
  participantIdentity,
  isLocal,
}) => {
  const { room } = useLiveKitStore();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const participant = isLocal
      ? room?.localParticipant
      : room?.getParticipantByIdentity(participantIdentity);

    if (participant) {
      const audioTrack = participant.getTrackPublication(Track.Source.Microphone);
      setIsMuted(audioTrack?.isMuted || false);
    }
  }, [room, participantIdentity, isLocal]);

  const toggleMute = async () => {
    if (!room) return;

    const participant = isLocal
      ? room.localParticipant
      : room.getParticipantByIdentity(participantIdentity);

    if (participant) {
      if (isLocal) {
        await (participant as LocalParticipant).setMicrophoneEnabled(!isMuted);
      } else {
      //   const audioTrack = (participant as RemoteParticipant).getTrackPublication(Track.Source.Microphone);
      //   if (audioTrack) {
      //     await room.localParticipant.setTrackEnabled(audioTrack.sid, !isMuted);
      //   }
        console.log("원격 참가자의 음소거 상태를 변경할 수 없습니다.")
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <button onClick={toggleMute}>{isMuted ? '음소거 해제' : '음소거'}</button>
  );
};

export default AudioControl;
