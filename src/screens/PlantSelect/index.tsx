import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

import EnviromentButton from '../../components/EnviromentButton'
import Header from '../../components/Header'
import Load from '../../components/Load'
import PlantCardPrimary from '../../components/PlantCardPrimary'

import api from '../../services/api'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface EnviromentProps{
    key: string;
    title: string;
}

interface PlantstProps{
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string],
    frequency: {
        times: number;
        repeat_every: string
    }
}

const PlantSelect = () => {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]) 
    const [plants, setPlants] = useState<PlantstProps[]>([]) 
    const [filteredPlants, setFilteredPlants] = useState<PlantstProps[]>([])
    const [enviromentSelected, setEnviromentSelected] = useState('all')
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)

    function handleEnviromentSelected(enviroment: string){
        setEnviromentSelected(enviroment)

        if(enviroment === 'all'){
            return  setFilteredPlants(plants)
        }

        const filtered = plants.filter(plant => 
            plant.environments.includes(enviroment)    
        )

        setFilteredPlants(filtered)
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=6`)

        if(!data){
            return setLoading(true)
        }

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data)
            setFilteredPlants(data)
        }    

        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number){
        if(distance < 1){
            return
        }

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        }

        fetchEnviroment()
    }, [])

    useEffect(() => {        
        fetchPlants()
    }, [])

    if(loading){
        return <Load />
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList} 
                    data={enviroments} 
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)} 
                        />
                    )}
                />
            </View>

            <View style={styles.plants}>
                <FlatList                    
                    data={filteredPlants}
                    renderItem={({item}) =>(
                        <PlantCardPrimary 
                            data={item}
                        />
                    )}

                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore 
                        ? <ActivityIndicator color={colors.green} />
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
        paddingHorizontal: 32
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList: {
        height: 40,
        paddingBottom: 5,
        marginLeft: 12,
        marginVertical: 32,
        paddingHorizontal: 20
        
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})

export default PlantSelect