import React from "react";
import {
  StyleSheet,
  View,
  Vibration,
} from "react-native";
import { Button } from "react-native-elements";

import LevelUpIndicator from "../components/LevelUpIndicator";

import { FactionColorOf } from "../constants/Colors";

interface IProps {
  levelUpFunc: () => void;
  factionStyle: "Horde"|"Alliance";
}

interface IState {
  heldDownTime: number;
}

export default class LevelButtonsSection extends React.Component <IProps, IState> {
  private readonly levelUpButtonTitle = "Level up!";
  // eye mesured duration for react-native-elements Button longPress is 100
  private readonly animationLength = 100;
  private animationIntervalId?: number;

  private readonly vibrationLength = 120;

  constructor(props: IProps) {
    super(props);
    this.animationIntervalId = undefined;
    this.state = {
      heldDownTime: 0,
    };
  }

  public onPressIn() {
    const increaseValue = 20;
    this.setState({
      heldDownTime: increaseValue,
    }),
    this.animationIntervalId = setInterval(
      () => this.setState((prevState) => ({
        heldDownTime: prevState.heldDownTime + increaseValue,
      })),
      increaseValue,
    );

    if (this.state.heldDownTime > this.animationLength) {
      clearInterval(this.animationIntervalId);
    }
  }

  public onPressOut() {
    clearInterval(this.animationIntervalId);
    this.setState({
      heldDownTime: 0,
    });
  }

  public render() {
    const { levelUpFunc, factionStyle } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.levelUpIndicatorContainerStyle}>
          <LevelUpIndicator factionStyle={factionStyle} progress={this.heldDownProgress()}/>
        </View>
        <Button
          onPress={() => null}
          onLongPress={() => {
            levelUpFunc();
            Vibration.vibrate(this.vibrationLength, false);
          }}
          onPressIn={() => this.onPressIn()}
          onPressOut={() => this.onPressOut()}
          title={this.levelUpButtonTitle}
          titleStyle={styles.title}
          containerStyle={styles.levelUpButtonContainerStyle}
          buttonStyle={factionStyle === "Horde" ? styles.levelUpButtonHorde : styles.levelUpButtonAlliance}
        />
      </View>
    );
  }

  private heldDownProgress() {
    return this.state.heldDownTime / this.animationLength;
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "lifecraft",
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  levelUpIndicatorContainerStyle:
  {
    paddingBottom: 10,
  },
  levelUpButtonContainerStyle: {
    flex: 1,
  },
  levelUpButtonHorde: {
    backgroundColor: FactionColorOf("Horde"),
  },
  levelUpButtonAlliance: {
    backgroundColor: FactionColorOf("Alliance"),
  },
});
