import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Colors from "../constants/Colors";

import CounterBox from "../components/CounterBox";

interface IProps {
  energy: number;
  energyCap: number;
  health: number;
  healthCap: number;
  gold: number;
  increaseResource: (resourceName: "health"|"gold"|"energy") => void;
  decreaseResource: (resourceName: "health"|"gold"|"energy") => void;
}

export default (props: IProps) => {
  const {
    healthCap, energyCap,
    health, energy, gold,
    increaseResource, decreaseResource,
  } = props;

  return (
    <View style={styles.counterSection}>
      <CounterBox
        icon={require("../assets/images/blood128.png")}
        value={health}
        valueCap={healthCap}
        increaseFunc={() => increaseResource("health")}
        decreaseFunc={() => decreaseResource("health")}
      />
      <CounterBox
        icon={require("../assets/images/energy128.png")}
        value={energy}
        valueCap={energyCap}
        increaseFunc={() => increaseResource("energy")}
        decreaseFunc={() => decreaseResource("energy")}
      />
      <CounterBox
        icon={require("../assets/images/gold128.png")}
        value={gold}
        increaseFunc={() => increaseResource("gold")}
        decreaseFunc={() => decreaseResource("gold")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  counterSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
