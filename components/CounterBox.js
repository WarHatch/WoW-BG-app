import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Counter from 'react-native-counters';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});

export default (props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Counter start={1} />
    </View>
  );
};
