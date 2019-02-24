import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Vibration,
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

    const vibrationDuration = 75; // ms

    return (
      <View style={styles.container}>
        {/* Shows/Hides 'overcapped' text */}
        <Text style={valueCap && value > valueCap ? styles.warningTextVisible : styles.warningTextHidden}>
          <Ionicons name="md-warning" />
          {title}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            increaseFunc();
            Vibration.vibrate(vibrationDuration, false);
          }}
        >
          <Ionicons name="ios-arrow-up" size={64} />
        </TouchableOpacity>
        <Text style={styles.valueText}>
          {value}{valueCap ? `/${valueCap}` : null}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            decreaseFunc();
            Vibration.vibrate(vibrationDuration, false);
          }}
        >
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
    marginHorizontal: 8,
  },
  icon: {
    height: 50,
    width: 50,
  },
  valueText: {
    // fontFamily: "lifecraft",
    fontSize: 46,
  },
  warningTextVisible: {
    fontFamily: "lifecraft",
  },
  warningTextHidden: {
    fontFamily: "lifecraft",
    opacity: 0,
  },
});
