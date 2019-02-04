import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { ListItem } from 'react-native-elements'

import Colors from "../constants/Colors";
import ClassImages from "../assets/images/Classes/index";

import { ICharacter } from "../constants/Classes/IClasses";

interface IProps {
  imageName: string;
  characterName: string;
  level: number;
  characters: ICharacter[];
  // onChangeCharacter: ()
}

interface IState {
  characterMenuVisible: boolean,
}

export default class CounterBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      characterMenuVisible: false,
    }
  }

  toggleChracterList = () => {
    this.setState((oldState) => ({
      characterMenuVisible: !oldState.characterMenuVisible
    }))
  }

  public render() {
    const { imageName, characterName, level, characters } = this.props;
    const { characterMenuVisible } = this.state;
    const levelText = "lvl";

    return (
      <View>
        {/* Chosen item */}
        <ListItem
          containerStyle={styles.container}
          leftIcon={<Image source={ClassImages[imageName]} style={styles.classIcon} />}
          title={<Text style={styles.characterName}>{characterName}</Text>}
          rightTitle={
            <View style={styles.levelContainer}>
              <Text>{levelText}</Text>
              <Text style={styles.levelCountText}>{level}</Text>
            </View>
          }
          onPress={this.toggleChracterList}
        />
        {
          /* OnPress list */
          characterMenuVisible ?
          characters.map((character) => (
            <ListItem
              key={character.name}
              leftIcon={<Image source={ClassImages[character.iconName]} style={styles.classIcon} />}
              title={<Text style={styles.characterName}>{character.name}</Text>}
            />
          )) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "teal"
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
