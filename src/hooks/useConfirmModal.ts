import { create } from 'zustand';

interface ConfirmModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmModalStore = create<ConfirmModalStore>((set) => ({
  isEdit: false,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useConfirmModalStore;
