// voiceChatStore.ts
import { create } from 'zustand';
import { LocalVideoTrack, RemoteTrackPublication, Room } from 'livekit-client';

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
  setIsJoined: isJoined => set({ isJoined }),
  setRanks: ranks => set({ ranks }),
}));
