import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Button } from '../components/Button';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export function Confirmation() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Entypo
                    name='emoji-happy'
                    size={98}
                    color="#b3b300"
                />
                <Text style={styles.title}>Prontinho</Text>
                <Text style={styles.subtitle}>
                    Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button
                        title='Começar'
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20,
    }
})