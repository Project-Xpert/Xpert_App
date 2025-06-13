import {screenSize} from '../../../assets/styles/screenSize';
import BasicContainer from '../../../components/common/BasicContainer';
import BasicHeader from '../../../components/common/headers/BasicHeader';

const SendMoney = () => {
  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'송금'} />
    </BasicContainer>
  );
};

export default SendMoney;
