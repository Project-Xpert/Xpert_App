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
import {useEffect, useState} from 'react';
import {colorStyles} from '../../assets/styles/color';
import BottomNav from '../../components/common/BottomNav';
import {NewsAPI} from '../../api/news';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  NewsDetail: {link: string};
};

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

type NewsDetailProps = {
  route: NewsDetailRouteProp;
};

const NewsDetail = ({route}: NewsDetailProps) => {
  const {link} = route.params;

  const [data, setData] = useState({
    imageUrl: '',
    title: '',
    company: '',
    time: '',
    contents: '',
  });

  useEffect(() => {
    NewsAPI.getNewsDetail(link)
      .then(response => {
        console.log(response);
        setData(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'경제 뉴스'} />

      <View style={styles.scrollView}>
        <ScrollView>
          <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={1}>
            <View style={styles.newsContainer}>
              <View style={styles.titleContainer}>
                {data.title.split(' ').map((text, idx) => {
                  return (
                    <Text key={idx} style={styles.title}>
                      {text}{' '}
                    </Text>
                  );
                })}
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.descrption}>{data.company}</Text>
                <View style={styles.separationCircle} />
                <Text style={styles.descrption}>{data.time}</Text>
              </View>

              {data.imageUrl != '' && (
                <Image src={data.imageUrl} style={styles.mainImg} />
              )}

              <View style={styles.newsBodyContainer}>
                {data.contents.split('\n').map((texts, idx1) => {
                  const textNodes = texts.split(' ').map((text, idx2) => {
                    return (
                      <Text key={`${idx1}-${idx2}`} style={styles.bodyText}>
                        {text}{' '}
                      </Text>
                    );
                  });

                  return (
                    <View key={idx1} style={styles.bodyTextContainer}>
                      {textNodes}
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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollView: {
    width: screenSize.width,
    height: screenSize.getVH(70),
  },
  newsContainer: {
    width: screenSize.getVW(82),
  },
  title: {
    lineHeight: screenSize.getVH(3.3),
    fontSize: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.Bold,
    color: colorStyles.basicText,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenSize.getVH(1.1),
  },
  newsBodyContainer: {
    marginTop: screenSize.getVH(4.5),
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
  mainImg: {
    marginTop: screenSize.getVH(2.2),
    width: screenSize.getVW(83.3),
    height: screenSize.getVH(24.4),
    borderRadius: screenSize.getVH(1.6),
  },
  bodyTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenSize.getVW(80),
  },
  bodyText: {
    color: colorStyles.basicText,
    fontSize: screenSize.getVH(1.6),
  },
});

export default NewsDetail;
