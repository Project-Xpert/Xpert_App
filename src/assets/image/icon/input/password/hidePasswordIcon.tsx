import { StyleProp, ViewStyle } from "react-native"
import ActiveIcon from "./hidePasswordActive.svg"
import DisabledIcon from "./hidePasswordDisabled.svg"

interface IconProps {
  isActivated: boolean,
  style?: StyleProp<ViewStyle>
}

const HidePasswordIcon = (props: IconProps) => {
  return props.isActivated ? <ActiveIcon style={props.style} /> : <DisabledIcon style={props.style} />
}

export default HidePasswordIcon