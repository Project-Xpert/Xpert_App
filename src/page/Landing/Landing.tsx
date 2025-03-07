import BasicText from '../../components/common/BasicText';
import {colorStyles} from '../../assets/styles/color';
import BasicContainer from '../../components/common/BasicContainer';

const Landing = () => {
  return (
    <BasicContainer>
      <BasicText
        size={40}
        weight={'Bold'}
        text={'hello world'}
        color={colorStyles.mainColor}
      />
    </BasicContainer>
  );
};

export default Landing;
