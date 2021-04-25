import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import colors from '../../styles/colors'
import waterdrop from '../../assets/images/waterdrop.png'
import { loadPlant, PlantProps, removePlant } from '../../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import fonts from '../../styles/fonts'
import PlantCardSecondary from '../../components/PlantCardSecondary'
import Load from '../../components/Load'

const MyPlants = () =>{
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWaterd, setNextWaterd] = useState<string>()

    function handleButtonRemove(plant: PlantProps){
        Alert.alert('Remover', `deseja remover a planta ${plant.name} ?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim😢',
                onPress: async() => {
                    try {
                        
                        await removePlant(plant.id)

                        setMyPlants(oldData => 
                            oldData.filter(item => item.id !== plant.id)
                        )
        
                    }catch(error){
                        Alert.alert('Não foi possível remover 😢')
                        console.error(error)
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            try{
            const plantStoraged = await loadPlant()

            const nextTime = formatDistance(
                new Date(plantStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWaterd(`Não esqueça de regar a ${plantStoraged[0].name} em ${nextTime}.`)

            setMyPlants(plantStoraged)
            setLoading(false)
            }catch{
                setLoading(false);
            } 
        }
        loadStorageData()
    }, [])

    if(loading){
        return <Load />
    }

    return(
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop} 
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd ? nextWaterd : 'Nenhuma plantinha para regar 💦'}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text  style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                
                <FlatList
                    
                    showsVerticalScrollIndicator={false} 
                    data={myPlants}
                    keyExtractor={(item => String(item.id))}
                    renderItem={({item}) => (
                        <PlantCardSecondary
                            handleButtonRemove={() => {handleButtonRemove(item)}}
                            data={item}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 45,
        height: 45
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})

export default MyPlants