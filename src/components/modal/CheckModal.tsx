import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import {colorStyles} from '../../assets/styles/color';
import {useEffect} from 'react';
import useModalData from '../../data/modalData';
import {fontStyle} from '../../assets/styles/fontStyles';

interface ModalProps {
  visible: boolean;
  title: string;
  description: string;
  cancelText: string;
  submitText: string;
  submitFunc: () => void;
  cancelFunc: () => void;
}

const CheckModal = ({
  visible,
  title,
  description,
  cancelText,
  submitText,
  submitFunc,
  cancelFunc,
}: ModalProps) => {
  const {setData} = useModalData();

  useEffect(() => {
    if (visible) {
      setData({modalEnabled: true});
    } else {
      setData({modalEnabled: false});
    }
  }, [visible]);

  return (
    <View style={containerStyle.container}>
      {visible && (
        <View style={containerStyle.background}>
          <View style={containerStyle.modalContainer}>
            <View style={containerStyle.textContainer}>
              <Text style={textStyles.title}>{title}</Text>
              <Text style={textStyles.body}>{description}</Text>
            </View>
            <View style={containerStyle.selectionBtnContainer}>
              <TouchableOpacity style={btnStyle.container} onPress={cancelFunc}>
                <Text style={btnStyle.leftText}>{cancelText}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={btnStyle.container} onPress={submitFunc}>
                <Text style={btnStyle.rightText}>{submitText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const containerStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenSize.width,
    height: screenSize.height,
    backgroundColor: colorStyles.transparentBackground,
  },
  modalContainer: {
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(22.2),
    backgroundColor: colorStyles.defaultWhite,
    borderRadius: screenSize.getVH(1.6),
  },
  textContainer: {
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(15.6),
    alignItems: 'center',
  },
  selectionBtnContainer: {
    flexDirection: 'row',
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(6.6),
  },
});

const textStyles = StyleSheet.create({
  title: {
    marginTop: screenSize.getVH(4.4),
    color: colorStyles.defaultBlack,
    fontSize: screenSize.getVH(2.6),
    fontFamily: fontStyle.SUIT.Bold,
  },
  body: {
    lineHeight: screenSize.getVH(2.2),
    marginTop: screenSize.getVH(2),
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Regular,
    textAlign: 'center',
  },
});

const btnStyle = StyleSheet.create({
  container: {
    width: '50%',
    height: '100%',
  },
  leftText: {
    position: 'absolute',
    top: screenSize.getVH(1.1),
    right: screenSize.getVW(11.6),
    lineHeight: screenSize.getVH(2.2),
    color: colorStyles.defaultRed,
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
  },
  rightText: {
    position: 'absolute',
    top: screenSize.getVH(1.1),
    left: screenSize.getVW(11.6),
    lineHeight: screenSize.getVH(2.2),
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(1.6),
    fontFamily: fontStyle.SUIT.Bold,
  },
});

export default CheckModal;
