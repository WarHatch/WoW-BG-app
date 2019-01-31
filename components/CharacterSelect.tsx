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
  ImageName: string;
}

interface IState {
}

export default class CounterBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/Classes/Druid.png")} style={styles.classIcon}/>
        <Text style={styles.characterName}>Bloody Placeholder innit</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  characterName: {
    fontSize: 20,
  },
  classIcon: {
    height: 50,
    width: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#d6d7da",
    // padding: 10,
  },
});
