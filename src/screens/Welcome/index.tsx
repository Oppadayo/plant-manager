import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'

import wateringImg from '../../assets/images/watering.png'
import Button from '../../components/Button'
import colors from '../../styles/colors'

const Welcome = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma prática
            </Text>
            <Image source={wateringImg} style={styles.image} />
            <Text style={styles.subtitle}>Não esqueça mais de regrar as suas plantas. 
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            <Button title='>' onPress={() => {}}/>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    image: {
        width: 292,
        height: 284
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },
    

})

export default Welcome