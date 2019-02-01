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
  valueCap?: number;
  defaultValue?: number;
  icon: any;
}

interface IState {
  value: number;
}

export default class CounterBox extends React.Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {valueCap, defaultValue} = props;
    let startValue;
    if (defaultValue) {
      startValue = defaultValue;
    } else if (valueCap) {
      startValue = valueCap;
    } else {
      startValue = 0;
    }
    this.state = {value: startValue};
  }

  public render() {
    const title = "overcapped";
    const { valueCap, icon } = this.props;
    const { value } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.warningTextContainer}>
          <Text style={valueCap && value > valueCap ? null : styles.warningTextHidden}>
            <Ionicons name="md-warning" />
            {title}
          </Text>
        </View>
        <TouchableOpacity onPress={this.handleUpPress} style={styles.button}>
          <Ionicons name="ios-arrow-up" size={64} />
        </TouchableOpacity>
        <Text style={styles.valueText}>
          {value}{valueCap ? `/${valueCap}` : null}
        </Text>
        <TouchableOpacity onPress={this.handleDownPress} style={styles.button}>
          <Ionicons name="ios-arrow-down" size={64}/>
        </TouchableOpacity>
        <Image source={icon} style={styles.icon}/>
      </View>
    );
  }

  private handleUpPress = () => {
    const oldValue = this.state.value;
    this.setState({value: oldValue + 1});
  }

  private handleDownPress = () => {
    const oldValue = this.state.value;
    if (oldValue > 0) {
      this.setState({value: oldValue - 1});
    }
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
