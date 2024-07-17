// VideoAudio.tsx
import React from 'react';
import VideoComponent from './components/VideoComponent';
import AudioComponent from './components/AudioComponent';
import { useVoiceChatStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

interface VoiceChatProps {
  quizResult: any;
}

const VideoAudio: React.FC<VoiceChatProps> = () => {
  // voice chat을 위해 필요한 정보 voice chat store에서 가져옴
  const { localTrack, remoteTracks } = useVoiceChatStore();

  // 클라이언트(본인)의 닉네임과 룸 코드를 store에서 꺼내온다.
  const { nickName } = useQuizRoomStore(state => state.quizRoom);

  return (
    <div id="room">
      <div id="layout-container">
        {/* 나 (Local) */}
        {localTrack && (
          <VideoComponent
            track={localTrack}
            participantIdentity={nickName}
            local={true}
          />
        )}
        {/* 다른 사람들 (Remote) */}
        {remoteTracks.map(remoteTrack =>
          remoteTrack.trackPublication.kind === 'video' ? (
            <VideoComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.videoTrack!}
              participantIdentity={remoteTrack.participantIdentity}
            />
          ) : (
            <AudioComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.audioTrack!}
            />
          )
        )}
      </div>
    </div>
  );
};

export default VideoAudio;
