import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Colors from "../constants/Colors";

import CounterBox from "../components/CounterBox";
import CharacterSelect from "../components/CharacterSelect";
import LevelButtonsSection from "../sections/LevelButtonsSection";

import { ICharacter } from "../constants/IClasses";

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

    const characterClasses = require("../constants/Classes.json");
    const defaultSelectedCharacter = characterClasses.Alliance[0];

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
    const currentLevelCap = levelCaps[characterLevel - 1];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerSection}>
            <CharacterSelect imageName={ iconName } characterName={name} level={characterLevel} />
          </View>

          <LevelButtonsSection
            resetLevelFunc={() => this.resetLevel()}
            levelUpFunc={() => this.levelUp()}
          />

          <View style={styles.counterSection}>
            <CounterBox
              icon={require("../assets/images/blood.png")}
              value={health}
              valueCap={currentLevelCap.health}
              increaseFunc={() => this.increaseResource("health")}
              decreaseFunc={() => this.decreaseResource("health")}
            />
            <CounterBox
              icon={require("../assets/images/energy.png")}
              value={energy}
              valueCap={currentLevelCap.energy}
              increaseFunc={() => this.increaseResource("energy")}
              decreaseFunc={() => this.decreaseResource("energy")}
            />
            <CounterBox
              icon={require("../assets/images/coin.png")}
              value={gold}
              increaseFunc={() => this.increaseResource("gold")}
              decreaseFunc={() => this.decreaseResource("gold")}
            />
          </View>
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
