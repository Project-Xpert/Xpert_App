import {StyleProp, ViewStyle} from 'react-native';
import ActiveIcon from './hidePasswordActive.svg';
import DisabledIcon from './hidePasswordDisabled.svg';
import {screenSize} from '../../../../styles/screenSize';

interface IconProps {
  isActivated: boolean;
  style?: StyleProp<ViewStyle>;
}

const HidePasswordIcon = (props: IconProps) => {
  return props.isActivated ? (
    <ActiveIcon
      width={screenSize.getVW(5.7)}
      height={screenSize.getVH(2.6)}
      style={props.style}
    />
  ) : (
    <DisabledIcon
      width={screenSize.getVW(5.7)}
      height={screenSize.getVH(2.6)}
      style={props.style}
    />
  );
};

export default HidePasswordIcon;
