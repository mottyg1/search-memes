import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MainScreen from './components/MainScreen';
import SettingsScreen from './components/SettingsScreen';
import StatsScreen from './components/StatsScreen';
import RandomScreen from './components/RandomScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { useSettings } from './contexts/SettingsContext';
import React, { useState, useEffect } from 'react';
import MiniSearch from 'minisearch';
import AlbumsScreen from './components/AlbumsScreen';


function MainViewWrapper({ route }) {
    const { DB } = route.params;
    return (
        <View style={styles.basic}>
            <MainScreen DB={DB} />
        </View>
    );
}

function AlbumsViewWrapper({ route }) {
    const { memesJson } = route.params;
    return (
        <View style={styles.basic}>
            <AlbumsScreen memesJson={memesJson} />
        </View>
    );
}

function StatsViewWrapper({ route }) {
    const { memesJson } = route.params;
    return (
        <View style={styles.basic}>
            <StatsScreen memesJson={memesJson} />
        </View>
    );
}

function RandomViewWrapper({ route }) {
    const { memesJson } = route.params;
    return (
        <View style={styles.basic}>
            <RandomScreen memesJson={memesJson} />
        </View>
    );
}
function SettingsViewWrapper() {
    return (
        <View styles={styles.basic}>
            <SettingsScreen />
        </View>
    );
}


const AppNavigtor = () => {

    const { settings, updateSettings } = useSettings();

    const [loading, setLoading] = useState(true);

    const [DB, setDB] = useState(null);
    const [memesJson, setMemesJson] = useState([]);

    useEffect(() => {

        fetch(settings.prefixUrl + 'memes.json')
            .then(response => response.json())
            .then(data => {
                setMemesJson(data);
                const DB = new MiniSearch({
                    idField: 'image_url',
                    fields: ['text', 'series'],
                    storeFields: ['image_url', 'text', 'series', 'aspect_ratio'],
                    searchOptions: {
                        combineWith: 'AND',
                        boost: { text: 2 },
                        fuzzy: 0.15,
                        maxFuzzy: 1,
                        prefix: true,
                        weights: {
                            prefix: 0.5,
                            fuzzy: 0.2
                        }
                    }
                });
                DB.addAll(data);
                setDB(DB);
                setLoading(false);
            })
            .catch(error => console.error('Error building memes DB:', error));
    }, []);

    const Tab = createBottomTabNavigator();

    if (loading) {
        return (
            <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName='albums' >
                <Tab.Screen name="settings" component={SettingsViewWrapper} options={{
                    tabBarLabel: 'הגדרות',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="settings" type="material" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="stats" component={StatsViewWrapper} initialParams={{ memesJson: memesJson }}
                    options={{
                        tabBarLabel: 'סטטיסטיקות',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="bar-chart" type="material" color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen name="random" component={RandomViewWrapper} initialParams={{ memesJson: memesJson }}
                    options={{
                        tabBarLabel: 'אקראי',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="casino" type="material" color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen name="albums" component={AlbumsViewWrapper} initialParams={{ memesJson: memesJson }}
                    options={{
                        tabBarLabel: 'אלבומים',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="collections" type="material" color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen name="search" component={MainViewWrapper} initialParams={{ DB: DB }}
                    options={{
                        tabBarLabel: 'חיפוש',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="search" type="material" color={color} size={size} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );

};

const styles = StyleSheet.create({
    basic: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AppNavigtor;