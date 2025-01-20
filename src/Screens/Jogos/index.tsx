import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Jogos = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.219:8080/jogo');
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
            <Text style={styles.title}>{item.competicao.nome}</Text>
            <Text style={styles.subtitle}>
                {item.data} às {item.hora}
            </Text>
            <Text style={styles.detail}>
                {item.timeMandante.nome} ({item.timeMandante.nome_abreviado}) vs.{' '}
                {item.timeVisitante.nome} ({item.timeVisitante.nome_abreviado})
            </Text>
            <Text style={styles.info}>
                Estádio: {item.timeMandante.estadio}, {item.timeMandante.cidade} -{' '}
                {item.timeMandante.estado}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Jogos</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};
