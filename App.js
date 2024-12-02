// App.js
import {React} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthenticationStackScreen} from './navigation/AuthStackScreen';

const App = () => {
  return (
    <NavigationContainer>
      <AuthenticationStackScreen />
    </NavigationContainer>
  );
};

export default App;
