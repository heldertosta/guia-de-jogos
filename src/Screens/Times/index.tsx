import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Button, 
    Alert, 
    Modal, 
    TextInput 
} from 'react-native';
import { styles } from './styles';
import axios from 'axios';

// Define o formato dos itens do array
type Time = {
    id: string;
    nome: string;
    nome_abreviado: string;
    cidade: string;
    estado: string;
    estadio: string;
};

export const Times = () => {
    const [data, setData] = useState<Time[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<Time | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Time[]>('http://192.168.0.219:8080/time');
                setData(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        Alert.alert(
            'Confirmação',
            'Deseja realmente excluir este time?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Excluir', 
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.0.219:8080/time/${id}`);
                            setData((prevData) => prevData.filter((item) => item.id !== id));
                        } catch (err) {
                            Alert.alert('Erro', 'Não foi possível excluir o time.');
                        }
                    } 
                },
            ]
        );
    };

    const handleEdit = (item: Time) => {
        setEditingItem(item);
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!editingItem) return;

        try {
            await axios.put(`http://192.168.0.219:8080/time/${editingItem.id}`, editingItem);
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === editingItem.id ? editingItem : item
                )
            );
            setModalVisible(false);
            setEditingItem(null);
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível salvar as alterações.');
        }
    };

    const renderItem = ({ item }: { item: Time }) => (
        <View style={styles.card}>
            <Text style={styles.title}>
                {item.nome} ({item.nome_abreviado})
            </Text>
            <Text style={styles.subtitle}>
                {item.cidade}, {item.estado}
            </Text>
            <Text style={styles.subtitle}>Estádio: {item.estadio}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Editar" onPress={() => handleEdit(item)} />
                <Button title="Excluir" onPress={() => handleDelete(item.id)} color="red" />
            </View>
        </View>
    );

    if (loading) return <Text style={styles.text}>Carregando...</Text>;
    if (error) return <Text style={styles.text}>Erro: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Times de Futebol</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Editar Time</Text>
                    <TextInput
                        style={styles.input}
                        value={editingItem?.nome || ''}
                        onChangeText={(text) =>
                            setEditingItem((prev) => prev && { ...prev, nome: text })
                        }
                        placeholder="Nome"
                    />
                    <TextInput
                        style={styles.input}
                        value={editingItem?.nome_abreviado || ''}
                        onChangeText={(text) =>
                            setEditingItem((prev) => prev && { ...prev, nome_abreviado: text })
                        }
                        placeholder="Nome Abreviado"
                    />
                    {/* Outros campos omitidos para simplicidade */}
                    <View style={styles.modalButtonContainer}>
                        <Button title="Salvar" onPress={handleSave} />
                        <Button
                            title="Cancelar"
                            onPress={() => setModalVisible(false)}
                            color="red"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
