import { StyleProp, ViewStyle } from "react-native"
import ActiveIcon from "./passwordIconActive.svg"
import DisabledIcon from "./passwordIconDisabled.svg"

interface IconProps {
  isActivated: boolean,
  style?: StyleProp<ViewStyle>
}

const PasswordIcon = (props: IconProps) => {
  return props.isActivated ? <ActiveIcon style={props.style} /> : <DisabledIcon style={props.style} />
}

export default PasswordIcon