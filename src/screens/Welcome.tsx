import React, { useState } from 'react';
import { Text, Image, StyleSheet, SafeAreaView } from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

import { Button } from '../components/Button';

export function Welcome() {
    const [visible, setVisible] = useState(false);

    function handleVisible() { }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {`\n`}
                suas plantas {'\n'}
                de forma fácil
            </Text>

            <Image source={wateringImg} style={styles.image} />

            <Text style={styles.subtitle}>
                Não esqueça mais de regra suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <Button title={'>'} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
    },
    image: {
        width: 392,
        height: 384
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },
})