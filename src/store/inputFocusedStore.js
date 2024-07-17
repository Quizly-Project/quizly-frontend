import { create } from 'zustand';

const useInputFocusedStore = create(set => ({
  isInputChatFocused: false,
  isInputGoldenbellFocused: false,
  setIsInputChatFocused: isInputChatFocused => set({ isInputChatFocused }),
  setIsInputGoldenbellFocused: isInputGoldenbellFocused =>
    set({ isInputGoldenbellFocused }),
}));

export default useInputFocusedStore;
