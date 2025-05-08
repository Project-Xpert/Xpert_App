import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import Button from '../../components/common/buttons/Button';
import BasicHeader from '../../components/common/headers/BasicHeader';
import PostContentInput from '../../components/Social/post/edit/PostContentInput';
import PostImgPickBtn from '../../components/Social/post/edit/PostImgPickBtn';
import PostTitleInput from '../../components/Social/post/edit/PostTitleInput';
import {useState} from 'react';
import RNFS from 'react-native-fs';
import {PostAPI} from '../../api/post';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const CreatePost = () => {
  const [data, setData] = useState({title: '', content: '', image: ''});
  const [fileData, setFileData] = useState({name: '', type: ''});
  const navigator = useNavigation<NavigationProp<any>>();

  const launchImageLib = () => {
    ImageCropPicker.openPicker({
      width: 350,
      height: 260,
      cropping: true,
      mediaType: 'photo',
      cropperToolbarTitle: '이미지 자르기',
    }).then(result => {
      if (result) {
        setData({...data, image: result.path});
        setFileData({
          name: result.filename || 'basicName',
          type: result.mime || 'image/jpg',
        });
      }
    });
  };

  const onChange = (name: 'title' | 'content', value: string) => {
    const titleLengthIsValid = name == 'title' && value.length < 41;
    const contentLengthIsValid = name == 'content' && value.length < 301;

    if (titleLengthIsValid || contentLengthIsValid) {
      setData({...data, [name]: value});
    }
  };

  const onSubmit = async () => {
    const formdata = new FormData();

    const fileName = 'dto.json';
    const json = JSON.stringify({content: data.content, title: data.title});
    const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

    await RNFS.writeFile(filePath, json, 'utf8');

    formdata.append('body', {
      uri: `file://${filePath}`,
      type: 'application/json',
      name: fileName,
    });

    if (data.image !== '') {
      formdata.append('file', {
        uri: data.image,
        type: fileData.type,
        name: fileData.name,
      });
    }

    PostAPI.createPost(formdata)
      .then(() => {
        navigator.navigate('Social');
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.2)}>
      <BasicHeader text={'글 작성'} />

      {data.image === '' ? (
        <PostImgPickBtn onPress={launchImageLib} />
      ) : (
        <TouchableOpacity onPress={launchImageLib}>
          <Image src={data.image} style={imageStyle.image} />
        </TouchableOpacity>
      )}

      <PostTitleInput
        value={data.title}
        marginTop={screenSize.getVH(3.3)}
        placeHolder={'게시글 제목을 입력해주세요'}
        onChange={e => {
          onChange('title', e.nativeEvent.text);
        }}
      />
      <PostContentInput
        value={data.content}
        marginTop={screenSize.getVH(1.6)}
        placeHolder={'게시글 내용을 입력해주세요'}
        onChange={e => {
          onChange('content', e.nativeEvent.text);
        }}
      />

      <Button
        text={'게시하기'}
        marginTop={screenSize.getVH(3.3)}
        size={'large'}
        onPress={onSubmit}
      />
    </BasicContainer>
  );
};

const imageStyle = StyleSheet.create({
  image: {
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(28.8),
    borderRadius: screenSize.getVH(5.5),
  },
});

export default CreatePost;
