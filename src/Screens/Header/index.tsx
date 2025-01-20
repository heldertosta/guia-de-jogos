import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HeaderProps = {
    onSelectComponent: (component: string) => void;
};

export const Header = ({ onSelectComponent }: HeaderProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = (component: string) => {
        onSelectComponent(component);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Icon name="menu" style={styles.icon} />
            </Pressable>
            <Text style={styles.title}>GUIA DE JOGOS</Text>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                />
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => handlePress('Times')} style={styles.modalButton}>
                        <Text style={styles.modalText}>Times</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('Jogos')} style={styles.modalButton}>
                        <Text style={styles.modalText}>Jogos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('Transmissoes')} style={styles.modalButton}>
                        <Text style={styles.modalText}>Transmissões</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('Competicoes')} style={styles.modalButton}>
                        <Text style={styles.modalText}>Competições</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePress('VeiculosTransmissao')} style={styles.modalButton}>
                        <Text style={styles.modalText}>Veículos de Transmissão</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
