import React, { useState } from 'react';
import { View } from 'react-native';
import { Header } from '../Header';
import { Body } from '../Body';
import { Times } from '../Times';
import { Jogos } from '../Jogos';
import { Transmissoes } from '../Transmissoes';
import { Competicoes } from '../Competicoes';
import { VeiculosTransmissao } from '../VeiculosTransmissao';
import { styles } from './styles';

export const Home = () => {
    const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(<Times />);

    const handleSelectComponent = (component: string) => {
        switch (component) {
            case 'Times':
                setSelectedComponent(<Times />);
                break;
            case 'Jogos':
                setSelectedComponent(<Jogos />);
                break;
            case 'Transmissoes':
                setSelectedComponent(<Transmissoes />);
                break;
            case 'Competicoes':
                setSelectedComponent(<Competicoes />);
                break;
            case 'VeiculosTransmissao':
                setSelectedComponent(<VeiculosTransmissao />);
                break;
            default:
                setSelectedComponent(<Times />);
        }
    };

    return (
        <View style={styles.container}>
            <Header onSelectComponent={handleSelectComponent} />
            <Body>
                {selectedComponent}
            </Body>
        </View>
    );
};
