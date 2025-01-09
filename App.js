import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationStackScreen } from "./navigation/AuthStackScreen";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { addNotification } from "./utils/userDbWeb";
import "@react-native-firebase/app";
import { firebase } from "@react-native-firebase/database"; // If necessary, use firebase.app()
import { SafeAreaProvider } from 'react-native-safe-area-context';
LogBox.ignoreLogs(["Setting a timer"]); // Ignore timer warnings

const App = () => {
  



  return (
    <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthenticationStackScreen />
      </NavigationContainer>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
