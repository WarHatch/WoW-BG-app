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
}

export default class DevScreen extends React.Component<{}, IState> {
  public static navigationOptions = {
    header: null,
  };

  constructor(props: {}) {
    super(props);

    // tslint:disable-next-line:no-require-imports
    const characterClasses = require("../constants/Classes.json");
    const defaultSelectedCharacter = characterClasses.Alliance[0];

    this.state = {
      selectedCharacter: defaultSelectedCharacter,
      characterLevel: 1,
    };
  }

  public resetLevel() {
    this.setState({
      characterLevel: 1,
    });
  }

  // TODO: maximize counter values as well
  public levelUp() {
    const currentLevel = this.state.characterLevel;
    if (currentLevel < this.state.selectedCharacter.levelCaps.length) {
      this.setState({
        characterLevel: currentLevel + 1,
      });
    }
  }

  public render() {
    const { selectedCharacter, characterLevel } = this.state;
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
              valueCap={currentLevelCap.health}
            />
            <CounterBox
              icon={require("../assets/images/energy.png")}
              valueCap={currentLevelCap.energy}
            />
            <CounterBox
              icon={require("../assets/images/coin.png")}
              defaultValue={5}
            />
          </View>
        </ScrollView>
      </View>
    );
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
