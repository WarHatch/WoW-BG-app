import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { Button } from "react-native-elements";

import Colors from "../constants/Colors";

interface IProps {
  // resetLevelFunc: () => void;
  levelUpFunc: () => void;
  factionStyle: "Horde"|"Alliance";
}

export default (props: IProps) => {
  const { levelUpFunc, factionStyle } = props;
  const levelUpButtonTitle = "Level up!";

  return (
    <View style={styles.container}>
      <Button
        onLongPress={levelUpFunc}
        title={levelUpButtonTitle}
        titleStyle={styles.title}
        containerStyle={styles.levelUpButtonContainerStyle}
        buttonStyle={factionStyle === "Horde" && styles.levelUpButtonHorde}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "lifecraft",
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // resetButtonContainerStyle: {
  //   marginRight: 15,
  // },
  levelUpButtonContainerStyle: {
    flex: 1,
  },
  levelUpButtonHorde: {
    backgroundColor: "#d64343",
  },
});
