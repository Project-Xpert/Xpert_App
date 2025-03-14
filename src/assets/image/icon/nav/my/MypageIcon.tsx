import {StyleProp, ViewStyle} from 'react-native';
import ActiveIcon from './myActive.svg';
import DisabledIcon from './myDisable.svg';
import {screenSize} from '../../../../styles/screenSize';

interface IconProps {
  isActivated: boolean;
  style?: StyleProp<ViewStyle>;
}

const MypageIcon = (props: IconProps) => {
  return props.isActivated ? (
    <ActiveIcon
      width={screenSize.getVW(8.5)}
      height={screenSize.getVH(6.6)}
      style={props.style}
    />
  ) : (
    <DisabledIcon
      width={screenSize.getVW(8.5)}
      height={screenSize.getVH(6.6)}
      style={props.style}
    />
  );
};

export default MypageIcon;
