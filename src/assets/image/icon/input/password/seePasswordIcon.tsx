import { StyleProp, ViewStyle } from "react-native"
import ActiveIcon from "./seePasswordActive.svg"
import DisabledIcon from "./seePasswordDisabled.svg"

interface IconProps {
  isActivated: boolean,
  style?: StyleProp<ViewStyle>
}

const SeePasswordIcon = (props: IconProps) => {
  return props.isActivated ? <ActiveIcon style={props.style} /> : <DisabledIcon style={props.style} />
}

export default SeePasswordIcon