import { create } from 'zustand';

const useInputFocusedStore = create(set => ({
  isInputChatFocused: false,
  isInputGodlenbellFocused: false,
  setIsInputChatFocused: isInputChatFocused => set({ isInputChatFocused }),
  setIsInputGoldenbellFocused: isInputGodlenbellFocused =>
    set({ isInputGodlenbellFocused }),
}));

export default useInputFocusedStore;
