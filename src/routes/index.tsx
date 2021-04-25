import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

import AppRoutes from './stack.routes'

const Routes = () => {
    return(
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
    
}

export default Routes