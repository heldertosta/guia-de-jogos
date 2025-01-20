import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

type BodyProps = {
    children: ReactNode; 
    style?: object;
};

export const Body = ({ children, style }: BodyProps) => {
    return <View style={[styles.container, style]}>{children}</View>
};