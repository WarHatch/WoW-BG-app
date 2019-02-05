import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";

import Colors, {FactionColorOf} from "../constants/Colors";
import ClassImages from "../assets/images/Classes/index";

interface IProps {
  imageName: string;
  characterName: string;
  level: number;
  faction: "Alliance"|"Horde";
  onClick: () => void;
}

export default (props: IProps) => {
  const {
    imageName,
    characterName,
    level,
    faction,
    onClick,
  } = props;
  const levelText = "lvl";

  return (
    <ListItem
      containerStyle={{
        ...styles.selectedCharacter,
        backgroundColor: FactionColorOf(faction),
      }}
      leftIcon={<Image source={ClassImages[imageName]} style={styles.classIcon} />}
      title={<Text style={styles.characterName}>{characterName}</Text>}
      rightTitle={
        <View style={styles.levelContainer}>
          <Text>{levelText}</Text>
          <Text style={styles.levelCountText}>{level}</Text>
        </View>
      }
      onPress={onClick}
    />
  );
};

const styles = StyleSheet.create({
  selectedCharacter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#fff",
  },
  characterName: {
    fontSize: 20,
  },
  classIcon: {
    height: 50,
    width: 50,
  },
  levelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  levelCountText: {
    fontSize: 40,
    paddingLeft: 3,
  },
});
