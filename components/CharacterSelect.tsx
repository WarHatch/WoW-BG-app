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
import ClassImages from "../assets/images/Classes/index";

interface IProps {
  imageName: string;
}

interface IState {
}

export default class CounterBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { imageName } = this.props;

    return (
      <View style={styles.container}>
        <Image source={ClassImages[imageName]} style={styles.classIcon}/>
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
    borderBottomWidth: 2,
    borderColor: Colors.borderColor,
  },
});
