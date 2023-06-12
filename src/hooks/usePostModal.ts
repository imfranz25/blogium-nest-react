import { create } from 'zustand';

interface PostModalStore {
  isEdit: boolean;
  isOpen: boolean;
  onOpen: (isEdit?: boolean) => void;
  onClose: () => void;
}

const usePostModal = create<PostModalStore>((set) => ({
  isEdit: false,
  isOpen: false,
  onOpen: (isEdit = false) => set({ isOpen: true, isEdit }),
  onClose: () => set({ isOpen: false, isEdit: false }),
}));

export default usePostModal;
