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
  profile:
    'https://i.pinimg.com/474x/d4/14/d7/d414d72eba60aef68af188b6214d47e7.jpg',
};

const useSignupData = create<SignupData>(set => ({
  ...defaultData,
  setData: newData => set(state => ({...state, ...newData})),
  initData: () => set(state => ({...state, ...defaultData})),
}));

export default useSignupData;
