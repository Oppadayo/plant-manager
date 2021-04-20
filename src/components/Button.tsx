import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
    title: string
}

const Button = ({title, ...props}: ButtonProps) =>{
    return(
        <TouchableOpacity 
            style={styles.button} 
            {...props}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

export default Button