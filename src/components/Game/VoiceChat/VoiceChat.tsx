import React, { useState, useEffect, useRef } from 'react';
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from 'livekit-client';
import VideoComponent from './components/VideoComponent';
import AudioComponent from './components/AudioComponent';

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

// let APPLICATION_SERVER_URL = '//ganjyul.shop/webrtc/';
let APPLICATION_SERVER_URL = '';
let LIVEKIT_URL = '';
// let LIVEKIT_URL = 'https://quizly.site';

const configureUrls = () => {
  if (!APPLICATION_SERVER_URL) {
    if (window.location.hostname === 'localhost') {
      APPLICATION_SERVER_URL = 'http://localhost:3003/webrtc/';
    } else {
      APPLICATION_SERVER_URL = 'https://' + window.location.hostname + ':6443/';
    }
  }

  if (!LIVEKIT_URL) {
    if (window.location.hostname === 'localhost') {
      LIVEKIT_URL = 'ws://localhost:7880/';
    } else {
      LIVEKIT_URL = 'wss://' + window.location.hostname + ':7443/';
    }
  }
};

configureUrls();

interface VoiceChatProps {
  roomCode: string;
  nickName: string;
  sortedParticipants: { nickName: string; totalScore: number }[];
}

const VoiceChat: React.FC<VoiceChatProps> = ({
  roomCode,
  nickName,
  sortedParticipants,
}) => {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined
  );
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
  const roomRef = useRef<Room | null>(null);

  // console.log(sortedParticipants);

  useEffect(() => {
    console.log('join room.');
    joinRoom();
    return () => {
      leaveRoom();
    };
  }, []); // 빈 의존성 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  async function joinRoom() {
    if (roomRef.current) {
      return; // 이미 방에 참가한 경우
    }
    const room = new Room();
    roomRef.current = room;
    setRoom(room);

    room.on(
      RoomEvent.TrackSubscribed,
      (
        _track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => {
        setRemoteTracks(prev => [
          ...prev,
          {
            trackPublication: publication,
            participantIdentity: participant.identity,
          },
        ]);
      }
    );

    room.on(
      RoomEvent.TrackUnsubscribed,
      (_track: RemoteTrack, publication: RemoteTrackPublication) => {
        setRemoteTracks(prev =>
          prev.filter(
            track => track.trackPublication.trackSid !== publication.trackSid
          )
        );
      }
    );

    try {
      console.log(roomCode, nickName);
      const token = await getToken(roomCode, nickName);
      await room.connect(LIVEKIT_URL, token);
      await room.localParticipant.enableCameraAndMicrophone();
      setLocalTrack(
        room.localParticipant.videoTrackPublications.values().next().value
          .videoTrack
      );
    } catch (error) {
      console.log(
        'There was an error connecting to the room:',
        (error as Error).message
      );
      await leaveRoom();
    }
  }

  const isParticipantInTopThree = (participantIdentity: string) => {
    console.log(sortedParticipants);
    return sortedParticipants?.some(
      participant => participant.nickName === participantIdentity
    );
  };

  async function leaveRoom() {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  }

  async function getToken(roomName: string, participantName: string) {
    console.log(roomName, participantName);
    const response = await fetch(APPLICATION_SERVER_URL + 'token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName: roomName,
        participantName: participantName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get token: ${error.errorMessage}`);
    }

    const data = await response.json();
    return data.token;
  }

  return (
    <div id="room">
      <div id="layout-container">
        {/* 나 (Local) */}
        {localTrack && isParticipantInTopThree(nickName) && (
          <VideoComponent
            track={localTrack}
            participantIdentity={nickName}
            local={true}
          />
        )}
        {/* 다른 사람들 (Remote) */}
        {remoteTracks.map(remoteTrack =>
          isParticipantInTopThree(remoteTrack.participantIdentity) ? (
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
          ) : null
        )}
      </div>
    </div>
  );
};

export default VoiceChat;
