import { StyleProp, ViewStyle } from "react-native"
import ActiveIcon from "./loginIdActive.svg"
import DisabledIcon from "./loginIdDisabled.svg"

interface IconProps {
  isActivated: boolean,
  style?: StyleProp<ViewStyle>
}

const LoginIdIcon = (props: IconProps) => {
  return props.isActivated ? <ActiveIcon style={props.style} /> : <DisabledIcon style={props.style} />
}

export default LoginIdIcon