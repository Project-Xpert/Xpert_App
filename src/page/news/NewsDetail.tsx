import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {fontStyle} from '../../assets/styles/fontStyles';
import {ReactNode, useEffect, useState} from 'react';
import {colorStyles} from '../../assets/styles/color';
import BottomNav from '../../components/common/BottomNav';
import {NewsAPI} from '../../api/news';

enum TextStyleEnum {
  title = 'title',
  body = 'body',
  imgDescription = 'imgDescription',
}

const getTextStyle = (styleType: TextStyleEnum) => {
  let textStyle = {};

  if (styleType === TextStyleEnum.title) {
    textStyle = titleStyles.text;
  } else if (styleType === TextStyleEnum.body) {
    textStyle = bodyStyles.text;
  } else if (styleType === TextStyleEnum.imgDescription) {
    textStyle = newsImgStyles.description;
  }

  return textStyle;
};

const NewsDetail = ({route}: any) => {
  const {link} = route.params;
  const [data, setData] = useState({
    title: '',
    company: '',
    time: '',
    contents: '',
    imageData: [{link: '', description: ''}],
  });

  const getImage = (): ReactNode => {
    const imageDatum = data.imageData.shift();

    if (imageDatum) {
      return (
        <View key={imageDatum.link} style={newsImgStyles.newsImgContainer}>
          <Image style={newsImgStyles.newsImg} src={imageDatum?.link} />
          <View style={newsImgStyles.descriptionContainer}>
            {splitSentenceToWord(
              imageDatum.description,
              imageDatum.link,
              TextStyleEnum.imgDescription,
            )}
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  };

  const splitSentenceToWord = (
    sentence: string,
    keyPrefix: string | number,
    styleType: TextStyleEnum,
  ): ReactNode[] => {
    const results: ReactNode[] = [];
    const textStyle = getTextStyle(styleType);

    // 단어가 img_section이면 이미지 view로 대체, 아니면 일반 텍스트로 출력
    sentence.split(' ').map((word, idx) => {
      if (word === 'img_section') {
        results.push(getImage());
      } else {
        results.push(
          <Text key={`${keyPrefix}-${idx}`} style={textStyle}>
            {word}{' '}
          </Text>,
        );
      }
    });

    return results;
  };

  useEffect(() => {
    NewsAPI.getNewsDetail(link)
      .then(response => {
        setData(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'경제 뉴스'} />

      <View style={containerStyles.scrollView}>
        <ScrollView>
          <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={1}>
            <View style={containerStyles.newsContainer}>
              <View style={titleStyles.titleContainer}>
                {splitSentenceToWord(data.title, 'title', TextStyleEnum.title)}
              </View>

              <View style={descriptionStyles.descriptionContainer}>
                <Text style={descriptionStyles.descrption}>{data.company}</Text>
                <View style={descriptionStyles.separationCircle} />
                <Text style={descriptionStyles.descrption}>{data.time}</Text>
              </View>

              <View style={bodyStyles.newsBodyContainer}>
                {data.contents.split('\n').map((context, idx) => {
                  return (
                    <View key={idx} style={bodyStyles.textContainer}>
                      {splitSentenceToWord(context, idx, TextStyleEnum.body)}
                    </View>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomNav pageName={'News'} />
    </BasicContainer>
  );
};

// styles
const containerStyles = StyleSheet.create({
  scrollView: {
    width: screenSize.width,
    height: screenSize.getVH(70),
  },
  newsContainer: {
    width: screenSize.getVW(82),
  },
});

const titleStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    lineHeight: screenSize.getVH(3.3),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
});

const descriptionStyles = StyleSheet.create({
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenSize.getVH(1.1),
  },
  descrption: {
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.SemiBold,
    fontSize: screenSize.getVH(1.6),
  },
  separationCircle: {
    width: screenSize.getVH(0.4),
    height: screenSize.getVH(0.4),
    borderRadius: 100,
    backgroundColor: colorStyles.descriptionGray,
    marginHorizontal: screenSize.getVH(0.6),
  },
});

const newsImgStyles = StyleSheet.create({
  newsImgContainer: {
    marginTop: screenSize.getVH(2.2),
    marginBottom: screenSize.getVH(2.2),
    width: screenSize.getVW(83.3),
    alignItems: 'center',
  },
  newsImg: {
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(24.4),
    borderRadius: screenSize.getVH(1.6),
    resizeMode: 'contain',
  },
  descriptionContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenSize.getVW(75),
  },
  description: {
    marginTop: screenSize.getVH(0.5),
    fontSize: screenSize.getVH(1.4),
    fontFamily: fontStyle.SUIT.Medium,
    color: colorStyles.descriptionGray,
  },
});

const bodyStyles = StyleSheet.create({
  newsBodyContainer: {
    marginTop: screenSize.getVH(4.5),
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenSize.getVW(80),
  },
  text: {
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(1.6),
  },
});

export default NewsDetail;
