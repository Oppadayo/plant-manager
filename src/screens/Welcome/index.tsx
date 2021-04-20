import React, {useState} from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    SafeAreaView, 
    Dimensions 
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import wateringImg from '../../assets/images/watering.png'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { useNavigation } from '@react-navigation/core'

const Welcome = () => {
    const navigation = useNavigation()

    function handleStart(){
        navigation.navigate('UserIdentification')
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'} 
                    forma fácil
                </Text>
                <Image 
                    source={wateringImg} 
                    style={styles.image} 
                    resizeMode='contain'
                    />
                <Text style={styles.subtitle}>Não esqueça mais de regar as suas plantas. 
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleStart}
                >            
                    <Feather 
                        name='chevron-right'
                        color={colors.white}
                        size={20}    
                    />
                
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    image: {
        width: Dimensions.get('window').width * 7,
        height: 284
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 55,
        width: 56
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    }
    

})

export default Welcome