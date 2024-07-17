// OpenVidu.tsx
import React, { useEffect, useRef } from 'react';
import {
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from 'livekit-client';
import { useVoiceChatStore } from '../../../store/liveKitStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

// Configuration for URLs
let APPLICATION_SERVER_URL = import.meta.env.VITE_APPLICATION_SERVER_URL || '';
let LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || '';
// let APPLICATION_SERVER_URL = '//ganjyul.shop/webrtc/';
// let LIVEKIT_URL = 'https://quizly.site';

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

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
  quizResult: any;
}

// const LiveKit: React.FC<VoiceChatProps> = () => {
const LiveKit = () => {
  // voice chat을 위해 필요한 정보 voice chat store에서 가져옴
  const {
    room,
    localTrack,
    remoteTracks,
    isJoined,
    setRoom,
    setLocalTrack,
    addRemoteTrack,
    removeRemoteTrack,
    setIsJoined,
    setRemoteVideoTrack,
  } = useVoiceChatStore();

  // 클라이언트(본인)의 닉네임과 룸 코드를 store에서 꺼내온다.
  const { roomCode, nickName } = useQuizRoomStore(state => state.quizRoom);

  const roomRef = useRef<Room | null>(null);

  useEffect(() => {
    if (!isJoined) {
      joinRoom();
    }
  }, []);

  async function joinRoom() {
    console.log(roomRef);
    if (roomRef.current) {
      console.log('already joined');
      return;
    }
    console.log('join room');

    const newRoom = new Room();
    roomRef.current = newRoom;
    setRoom(newRoom);

    newRoom.on(
      RoomEvent.TrackSubscribed,
      (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => {
        if (track.kind === 'audio') {
          addRemoteTrack({
            trackPublication: publication,
            participantIdentity: participant.identity,
          });
        } else if (track.kind === 'video') {
          setRemoteVideoTrack(participant.identity, track as any);
        }
      }
    );

    newRoom.on(
      RoomEvent.TrackUnsubscribed,
      (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => {
        if (track.kind === 'audio') {
          removeRemoteTrack(publication.trackSid);
        } else if (track.kind === 'video') {
          setRemoteVideoTrack(participant.identity, null);
        }
      }
    );

    try {
      console.log('livKit: roomCOde, nickName', roomCode, nickName);
      const token = await getToken(roomCode, nickName);
      await newRoom.connect(LIVEKIT_URL, token);
      await newRoom.localParticipant.enableCameraAndMicrophone();

      setLocalTrack(
        newRoom.localParticipant.videoTrackPublications.values().next().value
          .videoTrack
      );
      setIsJoined(true);
    } catch (error) {
      console.log(
        'There was an error connecting to the room:',
        (error as Error).message
      );
      await leaveRoom();
    }
  }

  async function leaveRoom() {
    console.log('leave');
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }
    setRoom(null);
    setLocalTrack(null);
    setIsJoined(false);
  }

  async function getToken(roomName: string, participantName: string) {
    console.log('getToken', roomName, participantName);
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

  return <></>;
};

export default LiveKit;
