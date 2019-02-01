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
  characterName: string;
  level: number;
}

interface IState {
}

export default class CounterBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { imageName, characterName, level } = this.props;
    const levelPrefix = "lvl ";

    return (
      <View style={styles.container}>
        <Image source={ClassImages[imageName]} style={styles.classIcon}/>
        <Text style={styles.characterName}>{characterName}</Text>
        <View style={styles.levelContainer}>
          <Text>{levelPrefix}</Text>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  characterName: {
    fontSize: 20,
  },
  classIcon: {
    height: 50,
    width: 50,
    marginRight: 15,
  },
  levelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  levelText: {
    fontSize: 40,
  },
});
