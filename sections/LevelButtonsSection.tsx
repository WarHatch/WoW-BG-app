import React from "react";
import {
  StyleSheet,
  View,
  Animated,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { Button } from "react-native-elements";

interface IProps {
  levelUpFunc: () => void;
  factionStyle: "Horde"|"Alliance";
}

interface IState {
  heldDownTime: number;
  heldDown: boolean;
}

export default class LevelUpIndicator extends React.Component <IProps, IState> {
  private readonly levelUpButtonTitle = "Level up!";
  // Duration for react-native-elements Button longPress is 200
  private readonly animationDuration = 200;
  private animationIntervalId?: number;

  constructor(props: IProps) {
    super(props);
    this.animationIntervalId = undefined;
    this.state = {
      heldDownTime: 0,
      heldDown: false,
    };
  }

  public onPressIn() {
    this.setState({
      heldDown: true,
    });

    const increaseValue = 20;
    this.animationIntervalId = setInterval(
      () => this.setState((prevState) => ({
        heldDownTime: prevState.heldDownTime + increaseValue,
      })),
      increaseValue,
    );

    if (this.state.heldDownTime > this.animationDuration) {
      clearInterval(this.animationIntervalId);
    }
  }

  public onPressOut() {
    this.setState({
      heldDown: false,
    });
    clearInterval(this.animationIntervalId);
    this.setState({
      heldDownTime: 0,
    });
  }

  public render() {
    const { levelUpFunc, factionStyle } = this.props;
    const { heldDown } = this.state;

    return (
      <View style={styles.container}>
        {/* set width to null to use automatic flexbox sizing */}
        <View style={styles.levelUpIndicatorContainerStyle}>
          <ProgressBar
            width={null}
            style={heldDown ? styles.levelUpIndicatorVisible : styles.levelUpIndicatorHidden}
            progress={this.heldDownProgress()}
          />
        </View>

        <Button
          onPress={() => null}
          onLongPress={levelUpFunc}
          onPressIn={() => this.onPressIn()}
          onPressOut={() => this.onPressOut()}
          title={this.levelUpButtonTitle}
          titleStyle={styles.title}
          containerStyle={styles.levelUpButtonContainerStyle}
          buttonStyle={factionStyle === "Horde" && styles.levelUpButtonHorde}
        />
      </View>
    );
  }

  private heldDownProgress() {
    return this.state.heldDownTime / this.animationDuration;
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
  levelUpIndicatorVisible: {

  },
  levelUpIndicatorHidden: {
    opacity: 0,
  },
  levelUpButtonContainerStyle: {
    flex: 1,
  },
  levelUpButtonHorde: {
    backgroundColor: "#d64343",
  },
});
