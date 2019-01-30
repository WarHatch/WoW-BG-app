import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CounterBox from "../components/CounterBox";

// eslint-disable-next-line react/prefer-stateless-function
export default class DevScreen extends React.Component {
  public static navigationOptions = {
    header: null,
  };

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <CounterBox icon={require("../assets/images/blood.png")} valueCap={3} />
          <CounterBox icon={require("../assets/images/energy.png")} valueCap={3}/>
          <CounterBox icon={require("../assets/images/coin.png")} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
});
