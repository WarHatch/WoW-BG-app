import {
  AppLoading,
  Asset,
  Font,
  Icon,
} from "expo";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  public state = {
    isLoadingComplete: false,
  };

  public loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png"),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
    }),
  ])

  public handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  public handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }

  public render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
