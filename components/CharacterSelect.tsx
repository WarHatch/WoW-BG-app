import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";

import CurrentCharacter from "./CurrentCharacter";

import Colors, {FactionColorOf} from "../constants/Colors";
import ClassImages from "../assets/images/Classes/index";

interface IProps {
  imageName: string;
  characterName: string;
  level: number;
  selectedFaction: "Alliance"|"Horde";
  characters: ICharacter[];
  changeCharacterFunc: (characterName: string) => void;
}

interface IState {
  characterMenuVisible: boolean;
}

export default class CounterBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      characterMenuVisible: false,
    };
  }

  public toggleChracterList = () => {
    this.setState((oldState) => ({
      characterMenuVisible: !oldState.characterMenuVisible,
    }));
  }

  public render() {
    const {
      imageName,
      characterName,
      level,
      selectedFaction,
      characters,
      changeCharacterFunc,
    } = this.props;
    const { characterMenuVisible } = this.state;

    return (
      <View>
        <CurrentCharacter
          imageName={imageName}
          characterName={characterName}
          level={level}
          faction={selectedFaction}
          onClick={this.toggleChracterList}
        />
        {
          /* OnPress list */
          characterMenuVisible ?
          characters.map((character) => (
            <ListItem
              containerStyle={{backgroundColor: FactionColorOf(character.faction)}}
              key={character.name}
              leftIcon={
                <Image source={ClassImages[character.iconName]} style={styles.classIcon} />
              }
              title={
                <Text style={styles.characterName}>
                  {character.name}
                </Text>
              }
              onPress={() => {
                this.toggleChracterList();
                changeCharacterFunc(character.name);
              }}
            />
          )) : null
        }
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
  },
});
