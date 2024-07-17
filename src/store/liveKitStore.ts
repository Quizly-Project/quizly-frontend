// voiceChatStore.ts
import { create } from 'zustand';
import {
  LocalVideoTrack,
  RemoteTrackPublication,
  Room,
  RemoteVideoTrack,
} from 'livekit-client';

export type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

export type Participant = {
  nickName: string;
  totalScore: number;
};

interface VoiceChatStore {
  room: Room | null;
  localTrack: LocalVideoTrack | null;
  remoteTracks: TrackInfo[];
  isJoined: boolean;
  ranks: Participant[];
  setRoom: (room: Room | null) => void;
  setLocalTrack: (track: LocalVideoTrack | null) => void;
  setRemoteTracks: (tracks: TrackInfo[]) => void;
  addRemoteTrack: (track: TrackInfo) => void;
  removeRemoteTrack: (trackSid: string) => void;
  remoteVideoTracks: Map<string, RemoteVideoTrack>;
  setRemoteVideoTrack: (
    participantId: string,
    track: RemoteVideoTrack | null
  ) => void;
  setIsJoined: (isJoined: boolean) => void;
  setRanks: (ranks: Participant[]) => void;
}

export const useVoiceChatStore = create<VoiceChatStore>(set => ({
  room: null,
  localTrack: null,
  remoteTracks: [],
  isJoined: false,
  ranks: [],
  setRoom: room => set({ room }),
  setLocalTrack: track => set({ localTrack: track }),
  setRemoteTracks: tracks => set({ remoteTracks: tracks }),
  addRemoteTrack: track =>
    set(state => ({ remoteTracks: [...state.remoteTracks, track] })),
  removeRemoteTrack: trackSid =>
    set(state => ({
      remoteTracks: state.remoteTracks.filter(
        t => t.trackPublication.trackSid !== trackSid
      ),
    })),
  remoteVideoTracks: new Map(),
  setRemoteVideoTrack: (participantId, track) =>
    set(state => {
      const newTracks = new Map(state.remoteVideoTracks);
      if (track) {
        newTracks.set(participantId, track);
      } else {
        newTracks.delete(participantId);
      }
      return { remoteVideoTracks: newTracks };
    }),
  setIsJoined: isJoined => set({ isJoined }),
  setRanks: ranks => set({ ranks }),
}));
