import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';
import {fontStyle} from '../../../assets/styles/fontStyles';
import SearchIcon from '../../../assets/image/icon/input/searchIcon.svg';

interface searchBarProps {
  value: string;
  searchBtnPressFunc: () => void;
  onChangeFunc: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const SearchBar = (props: searchBarProps) => {
  const textInputStyle = {
    ...inputStyles.input,
    color:
      props.value === '' ? colorStyles.descriptionGray : colorStyles.basicText,
  };

  return (
    <View style={inputStyles.container}>
      <TextInput
        placeholder="핸들이나 닉네임으로 검색해보세요"
        style={textInputStyle}
        onChange={props.onChangeFunc}
        value={props.value}
      />

      <SearchIcon
        style={inputStyles.icon}
        width={screenSize.getVH(2.2)}
        height={screenSize.getVH(2.2)}
      />

      <TouchableOpacity
        style={inputStyles.searchBtnContainer}
        onPress={props.searchBtnPressFunc}>
        <Text style={inputStyles.searchBtnText}>검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(84),
    height: screenSize.getVH(4.4),
  },
  icon: {
    top: screenSize.getVH(1.1),
    left: screenSize.getVW(3.5),
    position: 'absolute',
  },
  input: {
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
    paddingLeft: screenSize.getVW(10.7),
    paddingRight: screenSize.getVW(11.9),
    width: screenSize.getVW(84),
    height: screenSize.getVH(4.4),
    borderRadius: screenSize.getVH(1.1),
    backgroundColor: colorStyles.lightGrayBackGround,
  },
  searchBtnContainer: {
    top: screenSize.getVH(1.1),
    right: screenSize.getVW(4.7),
    position: 'absolute',
  },
  searchBtnText: {
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.mainColor,
    fontFamily: fontStyle.SUIT.ExtraBold,
  },
});

export default SearchBar;
