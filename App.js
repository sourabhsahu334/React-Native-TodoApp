/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import { View, Text, TouchableOpacity, TextInput } from 'react-native'


const Stack = createStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
   
   <Stack.Navigator>
     <Stack.Screen name="Home" component={HomeScreen} />
    
   </Stack.Navigator>
 </NavigationContainer>
  );
};

export default App;
