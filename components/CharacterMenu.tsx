import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  BackHandler,
  NativeEventSubscription,
} from "react-native";
import { ListItem } from "react-native-elements";

import { FactionColorOf } from "../constants/Colors";
import ClassImages from "../assets/images/Classes/index";

interface IProps {
  characters: ICharacter[];
  onCharacterPress: (characterName: string) => void;
  onHardwareBackPress: () => void;
}

export default class CharacterMenu extends React.Component<IProps, {}> {
  protected backHandler: NativeEventSubscription;

  constructor(props: IProps) {
    super(props);
    const { onHardwareBackPress } = this.props;

    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      onHardwareBackPress();
      // The event subscriptions are called LIFO,
      // and if one subscription returns true then subscriptions registered earlier will not be called.
      return true;
    });
  }

  public componentWillUnmount() {
    this.backHandler.remove();
  }

  public render() {
    const {
      characters,
      onCharacterPress,
    } = this.props;
    return (
      <View>
        {
          characters.map((character) => (
            <ListItem
              containerStyle={{ backgroundColor: FactionColorOf(character.faction) }}
              bottomDivider
              key={character.name}
              leftIcon={
                <Image source={ClassImages[character.iconName]} style={styles.classIcon} />
              }
              title={
                <Text style={styles.characterName}>
                  {character.name}
                </Text>
              }
              onPress={() => onCharacterPress(character.name)}
            />
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  characterName: {
    fontFamily: "lifecraft",
    fontSize: 24,
  },
  classIcon: {
    height: 50,
    width: 50,
  },
});
