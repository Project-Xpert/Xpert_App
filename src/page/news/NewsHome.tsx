import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {screenSize} from '../../assets/styles/screenSize';
import BasicContainer from '../../components/common/BasicContainer';
import BottomNav from '../../components/common/BottomNav';
import BasicHeader from '../../components/common/headers/BasicHeader';
import {fontStyle} from '../../assets/styles/fontStyles';
import HeadlineNews from '../../components/news/HeadlineNews';
import Swiper from 'react-native-swiper';
import BasicNews from '../../components/news/BasicNews';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {colorStyles} from '../../assets/styles/color';
import {useEffect, useState} from 'react';
import {NewsAPI} from '../../api/news';

interface HeadlineNews {
  imageUrl: string;
  link: string;
  title: string;
  company: string;
}
interface DefaultNews {
  imageUrl: string;
  link: string;
  title: string;
  company: string;
}

const NewsHome = () => {
  const navigator = useNavigation<NavigationProp<any>>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<{
    headlines: HeadlineNews[];
    news: DefaultNews[];
  }>({headlines: [], news: []});

  useEffect(() => {
    NewsAPI.getNewsList()
      .then(response => {
        const {headlines, news} = response.data;
        setTimeout(() => {
          setIsRefreshing(false);
          setData({headlines, news});
        }, 200);
      })
      .catch(e => {
        console.log(e);
      });
  }, [isRefreshing]);

  const onNewsDetailPress = (link: string) => {
    navigator.navigate('NewsDetail', {link});
  };

  return (
    <BasicContainer paddingTop={screenSize.getVH(9.3)}>
      <BasicHeader text={'경제 뉴스'} hideArrowBtn />

      <View style={styles.newsScrollView}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => setIsRefreshing(true)}
            />
          }>
          <TouchableOpacity style={styles.contentContainer} activeOpacity={1}>
            <Text style={styles.topDescription}>
              {
                '기사에 사진이 첨부되지 않은 경우는\n원본기사에 첨부된 동영상이 짤린 경우입니다.'
              }
            </Text>
            <Text style={styles.title}>헤드라인</Text>
            <View style={styles.headlineScrollView}>
              <Swiper
                horizontal
                showsHorizontalScrollIndicator={false}
                showsPagination={false}
                loop={false}>
                {data.headlines.map((headline, idx) => {
                  return (
                    <HeadlineNews
                      key={idx}
                      imageLink={headline.imageUrl}
                      heading={headline.title}
                      companyName={headline.company}
                      onPress={() => onNewsDetailPress(headline.link)}
                    />
                  );
                })}
              </Swiper>
            </View>

            <Text
              style={[
                styles.title,
                {
                  paddingBottom: screenSize.getVH(2.2),
                  marginTop: screenSize.getVH(2.4),
                },
              ]}>
              최신 기사
            </Text>

            <View style={{width: screenSize.width, alignItems: 'center'}}>
              {data.news.map((element, idx) => {
                return (
                  <BasicNews
                    key={idx}
                    imageLink={element.imageUrl}
                    heading={element.title}
                    companyName={element.company}
                    onPress={() => onNewsDetailPress(element.link)}
                  />
                );
              })}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomNav pageName={'News'} />
    </BasicContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colorStyles.basicText,
    width: screenSize.getVW(80),
    fontSize: screenSize.getVH(2.2),
    lineHeight: screenSize.getVH(2.7),
    fontFamily: fontStyle.SUIT.SemiBold,
    flexShrink: 1,
  },
  topDescription: {
    width: screenSize.getVW(80),
    fontSize: screenSize.getVH(1.6),
    lineHeight: screenSize.getVH(2.7),
    marginBottom: screenSize.getVH(1),
    color: colorStyles.descriptionGray,
    fontFamily: fontStyle.SUIT.Medium,
  },
  headlineScrollView: {
    marginTop: screenSize.getVH(1.1),
    width: screenSize.getVW(89.3),
    height: screenSize.getVH(33.5),
  },
  newsScrollView: {
    height: screenSize.getVH(70),
    width: screenSize.width,
  },
  contentContainer: {
    width: screenSize.width,
    alignItems: 'center',
  },
});

export default NewsHome;
