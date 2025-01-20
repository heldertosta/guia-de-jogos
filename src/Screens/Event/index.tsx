import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import React, { useState } from 'react';

export function Event() {
    const [ participants, setParticipants ] = useState<string[]>([]); 
    const [ participantName, setParticipantName ] = useState('');

    function handleParticipantAdd() {
        if(participants.includes(participantName)){
        setParticipantName('');
        return Alert.alert('Participante já adicionado', `O participante ${participantName} já foi adicionado a lista de presença.`);        
        }
        setParticipants([...participants, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {
        const participanteExcluido = participants.indexOf(name); //TODO Fazer com o filter

        if(participanteExcluido === -1){
            return Alert.alert('Participante não encontrado', 'O participante não foi encontrado na lista de presença.');
        }
        
        Alert.alert('Remover Participante', `Deseja remover o participante ${name}?`, [
            {
                text: 'Sim',                 
                onPress: () => {
                    participants.splice(participanteExcluido, 1);                    
                    Alert.alert('Participante removido', `O participante ${name} foi removido com sucesso.`)
                    setParticipants([...participants]);
                }
            }, 
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }

    return (
        <View style={styles.container}>

            <Text style={styles.eventName}>Nome do Evento</Text>

            <Text style={styles.eventDate}>Sábado, 4 de Janeiro de 2025</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}                    
                    placeholder="Nome do Participante"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item} 
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyList}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />

        </View>
    );
}