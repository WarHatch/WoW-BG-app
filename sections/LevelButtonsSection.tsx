import React from "react";
import {
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";

import Colors from "../constants/Colors";

interface IProps {
  resetLevelFunc: () => void;
  levelUpFunc: () => void;
}

const onReset = (resetFunc: () => void) => {
  Alert.alert(
    "Reset your level to 1?",
    undefined,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {text: "Yes", onPress: resetFunc},
    ],
  );
};

// const onLevelUp = (levelUpFunc: () => void) => {
//   Alert.alert(
//     "Level up?",
//     "Leveling up will fully restore your health and energy",
//     [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {text: "Yes", onPress: levelUpFunc},
//     ],
//   );
// };

export default (props: IProps) => {
  const { resetLevelFunc, levelUpFunc } = props;
  const button1Title = "reset level";
  const button2Title = "Level up!";

  return (
    <View style={styles.container}>
      <Button
        onPress={() => onReset(resetLevelFunc)}
        title={button1Title}
        containerStyle={styles.resetButtonContainerStyle}
      />
      <Button
        onLongPress={levelUpFunc}
        title={button2Title}
        containerStyle={styles.levelUpButtonContainerStyle}
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
  resetButtonContainerStyle: {
    marginRight: 15,
  },
  levelUpButtonContainerStyle: {
    flex: 1,
  },
});
