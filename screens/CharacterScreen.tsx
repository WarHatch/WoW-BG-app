import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  AppState,
} from "react-native";
import RNShake from "react-native-shake";

import CharactersHandler from "../handlers/CharactersHandler";

import Colors, {FactionColorOf} from "../constants/Colors";

import StatusBarBackground from "../components/Android/StatusBarBackground";
import CharacterSelect from "../components/CharacterSelect";
import LevelButtonsSection from "../sections/LevelButtonsSection";
import CountersSection from "../sections/CountersSection";

interface IState {
  selectedCharacter: ICharacter;
  characterLevel: number;
  health: number;
  energy: number;
  gold: number;
  characterInfoHidden: boolean;
}

export default class CharacterScreen extends React.Component<{}, IState> {
  public static navigationOptions = {
    header: null,
  };

  private readonly asyncStorageCharacterStateKey = "CHARACTERSTATE";

  constructor(props: {}) {
    super(props);

    const defaultSelectedCharacter = CharactersHandler.fullCharacterList[0];

    this.state = {
      selectedCharacter: defaultSelectedCharacter,
      characterLevel: 1,
      health: defaultSelectedCharacter.levelCaps[0].health,
      energy: defaultSelectedCharacter.levelCaps[0].energy,
      gold: 5,
      characterInfoHidden: false,
    };
  }

  public componentDidMount() {
    // FIXME: shake event not firing
    RNShake.addEventListener("ShakeEvent", () => {
      this.resetCharacter();
    });

    this.loadStateFromStorage();
    AppState.addEventListener("change", () => this.saveStateInStorage());
  }

  public componentWillUnmount() {
    RNShake.removeEventListener("ShakeEvent");

    this.saveStateInStorage();
    AppState.removeEventListener("change", () => this.saveStateInStorage());
  }

  public render() {
    const {
      selectedCharacter,
      characterLevel,
      health, energy, gold,
      characterInfoHidden,
    } = this.state;
    const { iconName, levelCaps, name, faction } = selectedCharacter;

    const currentLevelCap = levelCaps[characterLevel - 1]; // health and energy caps

    const pickableCharacters = CharactersHandler.fullCharacterList
      .filter((character) => character.name !== selectedCharacter.name);

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBarBackground backgroundColor={FactionColorOf(selectedCharacter.faction)} />
          <CharacterSelect
            imageName={iconName}
            characterName={name}
            level={characterLevel}
            characters={pickableCharacters}
            selectedFaction={faction}
            changeCharacterFunc={(characterName) => this.changeSelectedCharacter(characterName)}
            toggleCharacterInfo={() => this.toggleCharacterInfo()}
          />
          { !characterInfoHidden && (
            <View style={styles.characterInfo}>
              <LevelButtonsSection
                // resetCharacterFunc={() => this.resetCharacter()}
                levelUpFunc={() => this.levelUp()}
                factionStyle={faction}
              />
              <CountersSection
                health={health}
                healthCap={currentLevelCap.health}
                energy={energy}
                energyCap={currentLevelCap.energy}
                gold={gold}
                increaseResource={(resourceName: "health" | "gold" | "energy") => this.increaseResource(resourceName)}
                decreaseResource={(resourceName: "health" | "gold" | "energy") => this.decreaseResource(resourceName)}
              />
            </View>
            )
          }
        </ScrollView>
      </View>
    );
  }

  public toggleCharacterInfo = () => {
    this.setState((previousState) => ({
      characterInfoHidden: !previousState.characterInfoHidden,
    }));
  }

  public changeSelectedCharacter = (newSelectedName: string) => {
    const newCharacter = CharactersHandler.FindCharacter(newSelectedName);
    if (newCharacter) {
      this.setState({
        selectedCharacter: newCharacter,
        // and reset stats
        characterLevel: 1,
        health: newCharacter.levelCaps[0].health,
        energy: newCharacter.levelCaps[0].energy,
        gold: 5,
      });
    } else {
      throw new Error(`Unable to find character "${newSelectedName}" when trying to change character`);
    }
  }

  public increaseResource = (resourceName: "health" | "gold" | "energy") => {
    // @ts-ignore
    this.setState((previousState) => {
      return ({
        [resourceName]: previousState[resourceName] + 1,
      });
    });
  }

  public decreaseResource = (resourceName: "health" | "gold" | "energy") => {
    // @ts-ignore
    this.setState((previousState) => {
      if (previousState[resourceName] > 0) {
        return { [resourceName]: previousState[resourceName] - 1 };
      }
      return previousState;
    });
  }

  public levelUp() {
    const { characterLevel, selectedCharacter } = this.state;
    const newLevel = characterLevel + 1;

    if (characterLevel < selectedCharacter.levelCaps.length) {
      this.setState({
        characterLevel: newLevel,
        health: selectedCharacter.levelCaps[newLevel - 1].health,
        energy: selectedCharacter.levelCaps[newLevel - 1].energy,
      });
    }
  }

  public resetCharacter() {
    Alert.alert(
      "Reset your character?",
      "Health and Energy will be reset to level 1 maximum values and you'll have 5 Coins",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => this.changeSelectedCharacter(this.state.selectedCharacter.name),
        },
      ],
    );
  }

  private async saveStateInStorage() {
    const {
      selectedCharacter,
      characterLevel,
      health,
      energy,
      gold,
    } = this.state;
    const dataToSave = JSON.stringify({
      selectedCharacter,
      characterLevel,
      health,
      energy,
      gold,
    });
    try {
      await AsyncStorage.setItem(this.asyncStorageCharacterStateKey, dataToSave);
    } catch (error) {
      throw new Error("An error occured while trying to save your character data");
    }
  }

  private async loadStateFromStorage() {
    try {
      await AsyncStorage.getItem(this.asyncStorageCharacterStateKey, (errors, result) => {
        if (result) {
          const loadedCharacterState = JSON.parse(result);
          const {
            selectedCharacter,
            characterLevel,
            health,
            energy,
            gold,
          } = loadedCharacterState;
          this.setState({
            selectedCharacter,
            characterLevel,
            health,
            energy,
            gold,
          });
        }
      });
    } catch {
      throw new Error("An error occured while trying to load your character data");
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  characterInfo: {
    paddingBottom: 10,
  },
});
