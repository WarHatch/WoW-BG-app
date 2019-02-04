import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Colors from "../constants/Colors";

import CharacterSelect from "../components/CharacterSelect";
import LevelButtonsSection from "../sections/LevelButtonsSection";
import CountersSection from "../sections/CountersSection";

import CharacterClasses from "../constants/Classes";

interface IState {
  selectedCharacter: ICharacter;
  characterLevel: number;
  health: number;
  energy: number;
  gold: number;
}

export default class CharacterScreen extends React.Component<{}, IState> {
  public static navigationOptions = {
    header: null,
  };

  constructor(props: {}) {
    super(props);
    const defaultSelectedCharacter = CharacterClasses.Alliance[0];

    this.state = {
      selectedCharacter: defaultSelectedCharacter,
      characterLevel: 1,
      health: defaultSelectedCharacter.levelCaps[0].health,
      energy: defaultSelectedCharacter.levelCaps[0].energy,
      gold: 5,
    };
  }

  public render() {
    const {
      selectedCharacter,
      characterLevel,
      health, energy, gold,
    } = this.state;
    const { iconName, levelCaps, name } = selectedCharacter;

    const currentLevelCap = levelCaps[characterLevel - 1]; // health and energy caps

    const fullCharacterList = CharacterClasses.Alliance.concat(CharacterClasses.Horde);
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerSection}>
            <CharacterSelect
              imageName={ iconName }
              characterName={name}
              level={characterLevel}
              characters={fullCharacterList}/>
          </View>

          <LevelButtonsSection
            resetLevelFunc={() => this.resetLevel()}
            levelUpFunc={() => this.levelUp()}
          />

          <CountersSection
            health={health}
            healthCap={currentLevelCap.health}
            energy={energy}
            energyCap={currentLevelCap.energy}
            gold={gold}
            increaseResource={(resourceName: "health"|"gold"|"energy") => this.increaseResource(resourceName)}
            decreaseResource={(resourceName: "health"|"gold"|"energy") => this.decreaseResource(resourceName)}
          />
        </ScrollView>
      </View>
    );
  }

  private increaseResource = (resourceName: "health"|"gold"|"energy") => {
    // @ts-ignore
    this.setState(previousState => {
      return ({
        [resourceName]: previousState[resourceName] + 1
      });
    });
  }

  private decreaseResource = (resourceName: "health"|"gold"|"energy") => {
    // @ts-ignore
    this.setState(previousState => {
      if (previousState[resourceName] > 0) {
        return {[resourceName]: previousState[resourceName] - 1}
      }
      return previousState;
    });
  }

  private resetLevel() {
    this.setState({
      characterLevel: 1,
    });
  }

  private levelUp() {
    const {characterLevel, selectedCharacter} = this.state;
    const newLevel = characterLevel + 1;

    if (characterLevel < selectedCharacter.levelCaps.length) {
      this.setState({
        characterLevel: newLevel,
        health: selectedCharacter.levelCaps[newLevel - 1].health,
        energy: selectedCharacter.levelCaps[newLevel - 1].energy,
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
  counterSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerSection: {
    borderBottomWidth: 2,
    borderColor: Colors.borderColor,
  },
});
