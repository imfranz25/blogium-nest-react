import { create } from 'zustand';

interface PostModalStore {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (isEdit?: boolean) => void;
}

const usePostModal = create<PostModalStore>((set) => ({
  isEdit: false,
  isOpen: false,
  onClose: () => set({ isOpen: false, isEdit: false }),
  onOpen: (isEdit = false) => set({ isOpen: true, isEdit }),
}));

export default usePostModal;
