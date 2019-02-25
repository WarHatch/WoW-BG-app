import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { FactionColorOf } from "../constants/Colors";

interface IProps {
  progress: number;
  factionStyle: "Horde"|"Alliance";
}

export default (props: IProps) => {
  const { progress, factionStyle } = props;

  return (
  <View style={progress === 0 ? styles.hiddenContainer : styles.container}>
      <MaterialCommunityIcons name="chevron-double-up" size={20} />
      <ProgressBar
      /* set width to null to use automatic flexbox sizing */
      width={null}
      style={styles.progressBar}
      color={FactionColorOf(factionStyle)}
      borderWidth={0}
      progress={progress}
      />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  hiddenContainer: {
    opacity: 0,

    flex: 1,
    flexDirection: "row",
  },
  progressBar: {
    flex: 1,
    justifyContent: "center",
  },
});
