import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'

import userImg from '../assets/images/user.jpg'
import fonts from '../styles/fonts'


const Header = () => {
    const [userName, setUserName] = useState<string>()

    useEffect(()=>{
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user')

            setUserName(user || '')
        }

        loadStorageUserName()
    }, [])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image 
                source={userImg} 
                style={styles.image}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 38
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35 
    },

})

export default Header