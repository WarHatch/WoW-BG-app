import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

interface IProps {
  backgroundColor: string;
}

export default (props: IProps) => (
  <View style={{...styles.statusBarBackground, backgroundColor: props.backgroundColor}} />
);

const styles = StyleSheet.create({
  statusBarBackground: {
    height: StatusBar.currentHeight, // Android only
  },
});
