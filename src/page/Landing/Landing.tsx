import {StyleSheet, Text, View} from 'react-native';

const Landing = () => {
  return (
    <View style={styles.test}>
      <Text style={styles.text}>hello world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
  },
});

export default Landing;
