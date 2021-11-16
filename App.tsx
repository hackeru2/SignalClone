import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Amplify } from "@aws-amplify/core";
import config from "./src/aws-exports";

import Navigation from "./navigation";

Amplify.configure(config);
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { withAuthenticator } from "aws-amplify-react-native";
// alifshiz@banahtech.com
// 12345678
function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App);
