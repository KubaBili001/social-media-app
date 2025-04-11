import { create } from "zustand";

interface DisplayPostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDisplayPostModal = create<DisplayPostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDisplayPostModal;
