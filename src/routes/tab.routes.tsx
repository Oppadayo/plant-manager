import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../styles/colors'
import PlantSelect from '../screens/PlantSelect'
import { Feather } from '@expo/vector-icons'
import MyPlants from '../screens/MyPlants'
import { Platform } from 'react-native'

const AppTab = createBottomTabNavigator()

const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 5,
                    height: Platform.OS === 'ios' ? 88 : 60
                }
            }}
        >
            <AppTab.Screen 
                name='Nova Planta' 
                component={PlantSelect} 
                options={{
                    tabBarIcon: (({ focused, size, color }) => (
                        <Feather 
                            name='plus-circle'
                            size={size}
                            color={color}
                        />

                    ))
                    
                }} />

            <AppTab.Screen 
                name='Minhas Plantas' 
                component={MyPlants}  
                options={{
                    tabBarIcon: (({focused, size, color }) => (
                        <Feather 
                            name='menu'
                            size={size}
                            color={color}
                        />
                        
                        
                    ))
                }} />
        </AppTab.Navigator>
    )
}

export default AuthRoutes