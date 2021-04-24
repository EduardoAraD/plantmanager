import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core';

import colors from '../styles/colors';

import { Header } from '../components/Header'
import { Load } from '../components/Load';
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/plantCardPrimary';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
    key: string,
    title: string
}

export function PlantSelect() {
    const navigation = useNavigation();
    const [enviromentSelect, setEnviromentSelect] = useState('all')
    const [envirollment, setEnvirollments] = useState<EnviromentProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    async function fecthPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if (!data)
            return setLoading(true);

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }
        setLoading(false);
        setLoadingMore(false);
    }

    function handleEnviromentSelected(environment: string) {
        setEnviromentSelect(environment)

        if (environment === 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant => plant.environments.includes(environment))
        setFilteredPlants(filtered);
    }

    function handleFeacthMore(distance: number) {
        if (distance < 1) {
            return;
        }
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fecthPlants();
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fecthEnvirollment() {
            const { data } = await api.get('plants_environments?_sort=title&order=asc');
            setEnvirollments([{
                key: 'all',
                title: 'Todos'
            },
            ...data]);
        }

        fecthEnvirollment();
    }, [])

    useEffect(() => {
        fecthPlants();
    }, [])

    if (loading) {
        return <Load />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                    data={envirollment}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === enviromentSelect}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.2}
                    onEndReached={({ distanceFromEnd }) => handleFeacthMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore ?
                            <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})