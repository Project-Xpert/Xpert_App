import {Image, StyleSheet, View} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import BasicInput from '../../components/common/inputs/BasicInput';
import LoginIdIcon from '../../assets/image/icon/input/loginId/LoginIdIcon';
import ProfileEditBtn from '../../components/common/buttons/ProfileEditBtn';
import Button from '../../components/common/buttons/Button';
import useSignupData from '../../data/signupData';
import {UserAPI} from '../../api/user';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import env from '../../../env';
import {screenSize} from '../../assets/styles/screenSize';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const SignupDetail = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [errorMessage, setErrorMessage] = useState('');
  const [fileData, setFileData] = useState({name: '', type: ''});
  const {userId, email, password, username, profile, setData, initData} =
    useSignupData();

  const dataIsValid = 1 <= username.length && username.length <= 10;

  const launchImageLib = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      cropperToolbarTitle: '이미지 자르기',
    }).then(result => {
      if (result) {
        setData({profile: result.path});
        setFileData({
          name: result.filename || 'basicName',
          type: result.mime || 'image/jpg',
        });
      }
    });
  };

  const onDataChange = (name: string, value: string) => {
    setData({[name]: value});
  };

  const onSignupBtnPress = async () => {
    if (dataIsValid) {
      const formdata = new FormData();

      const fileName = 'dto.json';
      const json = JSON.stringify({userId, email, username, password});
      const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

      await RNFS.writeFile(filePath, json, 'utf8');

      formdata.append('body', {
        uri: `file://${filePath}`,
        type: 'application/json',
        name: fileName,
      });

      if (profile !== env.BASE_PROFILE_URL) {
        const image = {
          uri: profile.replace('file://', ''),
          name: fileData.name,
          type: fileData.type,
        };
        formdata.append('file', image);
      }

      UserAPI.Signup(formdata)
        .then(response => {
          initData();
          navigator.navigate('Landing');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setErrorMessage('유저의 이름을 1글자 이상 10글자 이하로 작성해주세요');
    }
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(12.35)}>
      <BasicHeader text={'세부정보 입력'} hideArrowBtn />
      <View>
        <Image style={styles.profile} src={profile} />
        <ProfileEditBtn style={styles.editBtn} onPress={launchImageLib} />
      </View>
      <BasicInput
        Icon={LoginIdIcon}
        value={username}
        marginTop={screenSize.getVH(5.5)}
        placeHolder={'닉네임을 입력해주세요'}
        onChange={e => {
          onDataChange('username', e.nativeEvent.text);
        }}
        errorMessage={errorMessage}
      />

      <Button
        text={'회원가입'}
        marginTop={screenSize.getVH(37.7)}
        size={'large'}
        onPress={onSignupBtnPress}
      />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: screenSize.getVH(16.5),
    height: screenSize.getVH(16.5),
    borderRadius: 75,
    marginTop: screenSize.getVH(2.2),
  },
  editBtn: {
    position: 'absolute',
    bottom: screenSize.getVH(0.5),
    right: screenSize.getVH(0.5),
  },
});

export default SignupDetail;
