import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Transmissoes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.219:8080/transmissao');
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
            <Text style={styles.title}>Transmissão: {item.veiculoTransmissao.nome}</Text>
            <Text style={styles.subtitle}>
                {item.jogo.competicao.nome} ({item.jogo.competicao.edicao})
            </Text>
            <Text style={styles.detail}>
                {item.jogo.data} às {item.jogo.hora}
            </Text>
            <Text style={styles.detail}>
                {item.jogo.timeMandante.nome} ({item.jogo.timeMandante.nome_abreviado}) vs.{' '}
                {item.jogo.timeVisitante.nome} ({item.jogo.timeVisitante.nome_abreviado})
            </Text>
            <Text style={styles.info}>
                Estádio: {item.jogo.timeMandante.estadio}, {item.jogo.timeMandante.cidade} -{' '}
                {item.jogo.timeMandante.estado}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transmissões</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};
