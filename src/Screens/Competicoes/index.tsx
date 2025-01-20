import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Competicoes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.219:8080/competicao');
                setData(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Text style={styles.text}>Carregando...</Text>;
    if (error) return <Text style={styles.text}>Erro: {error}</Text>;

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text style={styles.subtitle}>Tipo: {item.tipo}</Text>
            <Text style={styles.subtitle}>Edição: {item.edicao}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Competições</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};
