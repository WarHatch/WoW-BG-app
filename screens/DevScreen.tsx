import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CounterBox from "../components/CounterBox";
import CharacterSelect from "../components/CharacterSelect";

export default class DevScreen extends React.Component {
  public static navigationOptions = {
    header: null,
  };

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <CharacterSelect />
          <View style={styles.counterSection}>
            <CounterBox icon={require("../assets/images/blood.png")} valueCap={3} />
            <CounterBox icon={require("../assets/images/energy.png")} valueCap={3}/>
            <CounterBox icon={require("../assets/images/coin.png")} />
          </View>
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
  counterSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
