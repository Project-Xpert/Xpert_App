import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenSize} from '../../../assets/styles/screenSize';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {colorStyles} from '../../../assets/styles/color';
import UnderArrowBtn from '../../../assets/image/icon/button/underArrow.svg';
import {useEffect, useState} from 'react';
import DropdownMenu from './DropdownMenu';

interface dropdownProps {
  dropdownMenus: string[];
  marginTop: number;
  value: string;
  onChange: (value: string) => void;
}

const SelectionInput = (props: dropdownProps) => {
  const [showDropbox, setShowDropbox] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const containerStyle = {
    ...containerStyles.container,
    marginTop: props.marginTop,
  };

  useEffect(() => {
    if (selectedIdx === -1) {
      props.onChange('');
    } else {
      props.onChange(props.dropdownMenus[selectedIdx]);
    }
  }, [selectedIdx]);

  const onPress = () => {
    setShowDropbox(prev => !prev);
    Keyboard.dismiss();
  };

  const onDropdownPress = (idx: number) => {
    if (idx === selectedIdx) {
      setSelectedIdx(-1);
    } else {
      setSelectedIdx(idx);
    }
    setShowDropbox(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={containerStyle}
        activeOpacity={1}
        onPress={onPress}>
        <TextInput
          style={inputStyles.input}
          placeholder="상품을 선택해주세요"
          editable={false}
          onPress={onPress}
          value={selectedIdx === -1 ? '' : props.value}
        />
        <UnderArrowBtn
          style={arrowBtnStyles.button}
          width={screenSize.getVW(4.75)}
          height={screenSize.getVH(1)}
        />
      </TouchableOpacity>

      <View>
        {showDropbox && (
          <View style={dropDownStyles.dropdownContainer}>
            {props.dropdownMenus.map((dropdownMenu, idx) => {
              return (
                <DropdownMenu
                  key={idx}
                  isSelected={selectedIdx === idx}
                  onPress={() => onDropdownPress(idx)}
                  dropdownText={dropdownMenu}
                />
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

const inputStyles = StyleSheet.create({
  input: {
    width: screenSize.getVW(84),
    height: screenSize.getVH(5.5),
    fontFamily: fontStyle.SUIT.Medium,
    fontSize: screenSize.getVH(1.6),
    borderWidth: screenSize.getVH(0.075),
    borderRadius: 15,
    paddingLeft: screenSize.getVW(5.9),
  },
});

const arrowBtnStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: screenSize.getVW(4.7),
    top: screenSize.getVH(2.2),
  },
});

const dropDownStyles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: screenSize.getVH(0.55),
    width: screenSize.getVW(84),
    paddingHorizontal: screenSize.getVW(2.3),
    paddingVertical: screenSize.getVH(1.1),
    backgroundColor: colorStyles.defaultWhite,
    borderWidth: screenSize.getVH(0.075),
    borderRadius: 15,
    zIndex: 100,
  },
});

export default SelectionInput;
