import {create} from 'zustand';

interface SignupData {
  userId: string;
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  profile: string;
  setData: (newData: Partial<SignupData>) => void;
  initData: () => void;
}

const defaultData = {
  userId: '',
  email: '',
  username: '',
  password: '',
  passwordCheck: '',
  profile: '',
};

const useSignupData = create<SignupData>(set => ({
  ...defaultData,
  setData: newData => set(state => ({...state, ...newData})),
  initData: () => set(state => ({...state, ...defaultData})),
}));

export default useSignupData;
