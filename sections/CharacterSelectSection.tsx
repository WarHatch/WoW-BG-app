import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import CurrentCharacter from "../components/CurrentCharacter";
import CharacterMenu from "../components/CharacterMenu";

interface IProps {
  imageName: string;
  characterName: string;
  level: number;
  selectedFaction: "Alliance"|"Horde";
  characters: ICharacter[];
  changeCharacterFunc: (characterName: string) => void;
  toggleCharacterInfo: () => void;
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
    this.props.toggleCharacterInfo();
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
          characterMenuVisible &&
          <CharacterMenu
            characters={characters}
            onCharacterPress={(charName: string) => {
              this.toggleChracterList();
              changeCharacterFunc(charName);
            }}
            onHardwareBackPress={() => this.toggleChracterList()}
          />
        }
      </View>
    );
  }
}
