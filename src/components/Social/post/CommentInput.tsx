import React, {useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {fontStyle} from '../../../assets/styles/fontStyles';
import {screenSize} from '../../../assets/styles/screenSize';
import EditBtn from '../../../assets/image/icon/button/editBtn.svg';
import useModalData from '../../../data/modalData';

interface inputProps {
  value: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onPress: () => void;
}

const CommentInput = (props: inputProps) => {
  const {setData} = useModalData();
  const inputRef = useRef<TextInput>(null);

  const handleBlurEvent = () => {
    setData({modalEnabled: false});
  };

  const handlePressEvent = () => {
    setData({modalEnabled: true});
  };

  const commentInputStyle = {
    ...commentInput.input,
    color: props.value === '' ? colorStyles.disableGray : colorStyles.basicText,
  };

  return (
    <View style={commentInput.container}>
      <TextInput
        ref={inputRef}
        value={props.value}
        style={commentInputStyle}
        placeholder={'답글 작성하기'}
        onBlur={handleBlurEvent}
        onPress={handlePressEvent}
        onChange={props.onChange}
      />
      <TouchableOpacity
        style={commentInput.button}
        onPress={() => {
          if (inputRef.current) {
            inputRef.current.blur();
          }
          setData({modalEnabled: false});
          props.onPress();
        }}>
        <EditBtn />
      </TouchableOpacity>
    </View>
  );
};

const commentInput = StyleSheet.create({
  container: {
    backgroundColor: colorStyles.defaultWhite,
    width: screenSize.width,
    height: screenSize.getVH(6.6),
    zIndex: 10000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: screenSize.getVH(9),
  },
  input: {
    paddingVertical: screenSize.getVH(1.2),
    paddingHorizontal: screenSize.getVW(3.3),
    width: screenSize.getVW(79.7),
    borderRadius: screenSize.getVH(1.1),
    backgroundColor: colorStyles.lightGrayBackGround,
    fontFamily: fontStyle.SUIT.Medium,
  },
  button: {
    marginLeft: screenSize.getVW(2.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: screenSize.getVH(3.8),
    height: screenSize.getVH(3.8),
    borderRadius: screenSize.getVH(1.1),
    backgroundColor: colorStyles.mainColor,
  },
});

export default CommentInput;
