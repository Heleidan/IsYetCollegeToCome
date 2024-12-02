import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import Index from './Index';
import Login from './Login'; 
import Cucei from './Cucei'; 
import Alumno from './Alumno'; 

// Crear el stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cucei"> 
        <Stack.Screen 
          name="Index" 
          component={Index} 
          options={{ title: 'Directorio CUCEI' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Inicia Sesión' }}
        />
        <Stack.Screen 
          name="Cucei" 
          component={Cucei} 
          options={{ title: 'Información CUCEI' }}
        />
        <Stack.Screen 
          name="Alumno" 
          component={Alumno} 
          options={{ title: 'Info Alumno' }} // Título de la pantalla
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
