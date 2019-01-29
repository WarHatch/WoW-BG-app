import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import Counter from "react-native-counters";
import { Ionicons } from "@expo/vector-icons";

export default (props: { valueCap: number; icon: any }) => {
  const title = "overcapped";
  const { valueCap, icon } = props;

  // TODO: add overcapped logic

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>
        <Ionicons name="md-warning" />
        {title}
      </Text>
      <Counter start={1} />
      <Image source={icon} style={styles.icon}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  icon: {
    height: 50,
    width: 50,
  },
  warningText: {
    color: "lightgrey",
    padding: 10,
  },
});
