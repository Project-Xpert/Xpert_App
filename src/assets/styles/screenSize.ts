import {Dimensions} from 'react-native';

export const screenSize = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
  getVW: (number: number) => {
    return (Dimensions.get('screen').width / 100) * number;
  },
  getVH: (number: number) => {
    return (Dimensions.get('screen').height / 100) * number;
  },
};
