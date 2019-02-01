import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import CounterBox from "../components/CounterBox";
import CharacterSelect from "../components/CharacterSelect";
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
    this.state = {
      selectedCharacter: {
        // Placeholder default values
        iconName: "druid",
        levelCaps: [
          {
            health: 2,
            energy: 4,
          },
        ],
        class: "Druid",
        name: "Artumnis Moondream",
      },
      characterLevel: 1,
    };
  }

  // TODO: add char class color state

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
