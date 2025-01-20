import React from 'react';
import { Times } from './src/Screens/Times';
import { StatusBar } from 'react-native';
import { Header } from './src/Screens/Header';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/Screens/Home';

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent                
                />            
            <Home />            
        </NavigationContainer>
    );
}