import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colorStyles} from '../../../assets/styles/color';
import {screenSize} from '../../../assets/styles/screenSize';

interface BtnProps {
  text: string;
}

const QuestionBtn = (props: BtnProps) => {
  return (
    <TouchableOpacity>
      <Text style={questionBtnStyles.text}>[자주 묻는 질문] {props.text}</Text>
    </TouchableOpacity>
  );
};

const questionBtnStyles = StyleSheet.create({
  text: {
    marginTop: screenSize.getVH(1.1),
    fontSize: screenSize.getVH(1.6),
    color: colorStyles.descriptionGray,
    textDecorationLine: 'underline',
    textDecorationColor: colorStyles.descriptionGray,
  },
});

export default QuestionBtn;
