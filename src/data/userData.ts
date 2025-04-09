import {create} from 'zustand';

interface UserData {
  userId: string;
  username: string;
  profile: string;
  money: number;
  setData: (newData: Partial<UserData>) => void;
}

const defaultData = {
  userId: '',
  username: '',
  profile: '',
  money: 0,
};

const useUserData = create<UserData>(set => ({
  ...defaultData,
  setData: newData => set(state => ({...state, ...newData})),
}));

export default useUserData;
