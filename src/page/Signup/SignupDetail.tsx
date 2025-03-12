import {Image, StyleSheet, View} from 'react-native';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import BasicInput from '../../components/common/inputs/BasicInput';
import {useState} from 'react';
import LoginIdIcon from '../../assets/image/icon/input/loginId/LoginIdIcon';
import ProfileEditBtn from '../../components/common/buttons/ProfileEditBtn';
import Button from '../../components/common/buttons/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import useSignupData from '../../data/signupData';

const SignupDetail = () => {
  const {username, profile, setData} = useSignupData();

  const launchImageLib = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      if (res.assets) {
        console.log(res.assets[0]);
        setData({profile: res.assets[0].uri});
      }
    });
  };

  const onDataChanage = (name: string, value: string) => {
    setData({[name]: value});
  };
  const onSignupBtnPress = () => {};

  return (
    <BasicContainer paddingTop={140}>
      <BasicHeader text={'세부정보 입력'} hideArrowBtn />
      <View>
        <Image style={styles.profile} src={profile} />
        <ProfileEditBtn style={styles.editBtn} onPress={launchImageLib} />
      </View>
      <BasicInput
        Icon={LoginIdIcon}
        value={username}
        marginTop={50}
        placeHolder={'닉네임을 입력해주세요'}
        onChange={e => {
          onDataChanage('username', e.nativeEvent.text);
        }}
      />

      <Button
        text={'회원가입'}
        marginTop={300}
        size={'large'}
        onPress={onSignupBtnPress}
      />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
  },
  editBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default SignupDetail;
