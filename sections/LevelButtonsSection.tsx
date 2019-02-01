import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface IProps {
  resetLevelFunc: () => void;
  levelUpFunc: () => void;
}

export default (props: IProps) => {
  const { resetLevelFunc, levelUpFunc } = props;
  const button1Title = "reset level";
  const button2Title = "Level up!";

  return (
    <View style={styles.container}>
      <Button
        onPress={resetLevelFunc}
        title={button1Title}
      />
      <Button
        onPress={levelUpFunc}
        title={button2Title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
