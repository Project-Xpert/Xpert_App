import {create} from 'zustand';

interface investNavData {
  lastPage: 'account' | 'stock' | 'bond' | 'FX' | 'gold';
  setData: (newData: Partial<investNavData>) => void;
}

const useInvestNavData = create<investNavData>(set => ({
  lastPage: 'account',
  setData: newData => set(state => ({...state, ...newData})),
}));

export default useInvestNavData;
