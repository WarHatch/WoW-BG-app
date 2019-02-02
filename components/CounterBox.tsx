import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface IProps {
  value: number;
  valueCap?: number;
  icon: any;
  increaseFunc: () => void;
  decreaseFunc: () => void;
}

export default class CounterBox extends React.Component <IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const title = "overcapped";
    const {
      value,
      valueCap,
      icon,
      increaseFunc,
      decreaseFunc,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.warningTextContainer}>
          <Text style={valueCap && value > valueCap ? null : styles.warningTextHidden}>
            <Ionicons name="md-warning" />
            {title}
          </Text>
        </View>
        <TouchableOpacity onPress={increaseFunc} style={styles.button}>
          <Ionicons name="ios-arrow-up" size={64} />
        </TouchableOpacity>
        <Text style={styles.valueText}>
          {value}{valueCap ? `/${valueCap}` : null}
        </Text>
        <TouchableOpacity onPress={decreaseFunc} style={styles.button}>
          <Ionicons name="ios-arrow-down" size={64}/>
        </TouchableOpacity>
        <Image source={icon} style={styles.icon}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {

  },
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  icon: {
    height: 50,
    width: 50,
  },
  valueText: {
    fontSize: 48,
  },
  warningTextContainer: {
    paddingTop: 12,
  },
  warningTextHidden: {
    color: Colors.backgroundColor,
  },
});
