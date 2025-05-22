import {create} from 'zustand';

interface modalData {
  modalEnabled: boolean;
  setData: (newData: Partial<modalData>) => void;
}

const useModalData = create<modalData>(set => ({
  modalEnabled: false,
  setData: newData => set(state => ({...state, ...newData})),
}));

export default useModalData;
