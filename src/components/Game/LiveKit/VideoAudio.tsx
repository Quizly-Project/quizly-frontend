// VideoAudio.tsx
import React from 'react';
import VideoComponent from './components/VideoComponent';
import AudioComponent from './components/AudioComponent';
import AudioControl from './components/AudioControl'; // 새로 추가된 import
import { useLiveKitStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';
import { AudioTrack, VideoTrack, Track } from 'livekit-client';

interface LiveKitProps {
  quizResult: any;
}

const VideoAudio: React.FC<LiveKitProps> = () => {
  // voice chat을 위해 필요한 정보 voice chat store에서 가져옴
  const { localTrack, remoteTracks } = useLiveKitStore();

  // 클라이언트(본인)의 닉네임과 룸 코드를 store에서 꺼내온다.
  const { nickName } = useQuizRoomStore(state => state.quizRoom);

  return (
    <div id="room">
      <div id="layout-container">
        {/* 나 (Local) */}
        {localTrack && (
          <div>
            {/* <VideoComponent
              track={localTrack}
              participantIdentity={nickName}
              local={true}
            /> */}
            <AudioControl participantIdentity={nickName} isLocal={true} />
          </div>
        )}
        {/* 다른 사람들 (Remote) */}
        {remoteTracks.map(remoteTrack => {
          const track = remoteTrack.trackPublication.track;
          if (!track) return null;

          if (track.source === Track.Source.Camera) {
            return (
              <div key={remoteTrack.trackPublication.trackSid}>
                <VideoComponent
                  track={track as VideoTrack}
                  participantIdentity={remoteTrack.participantIdentity}
                />
                <AudioControl
                  participantIdentity={remoteTrack.participantIdentity}
                  isLocal={false}
                />
              </div>
            );
          } else if (track.source === Track.Source.Microphone) {
            return (
              <div key={remoteTrack.trackPublication.trackSid}>
                <AudioComponent track={track as AudioTrack} />
                <AudioControl
                  participantIdentity={remoteTrack.participantIdentity}
                  isLocal={false}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default VideoAudio;
