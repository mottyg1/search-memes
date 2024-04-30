import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MainScreen from './components/MainScreen';
import SettingsScreen from './components/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSettings } from './contexts/SettingsContext';
import React, { useState, useEffect } from 'react';
import MiniSearch from 'minisearch';


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
      <View styles={styles.basic}>
        <Text>האלבומים שיש הם אחד שתיים שלוש</Text>
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

function getChaptersByFirstSeries(objectsList) {
    return objectsList.reduce((result, obj) => {
      const [firstTag, secondTag] = obj.series;
      if (firstTag && secondTag) {
        result[firstTag] = [...new Set([...(result[firstTag] || []), secondTag])];
      }
      return result;
    }, {});
  }

const AppNavigtor = () => {

    const { settings, updateSettings } = useSettings();

    const [loading, setLoading] = useState(true);

    const [DB, setDB] = useState(null);
    const [memesJson, setMemesJson] = useState([]);

    useEffect(() => {

        fetch(settings.prefixUrl+'memes.json')
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
            <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName='search' >
              <Tab.Screen name="settings" component={SettingsViewWrapper} options={{
                  tabBarLabel: 'הגדרות',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="shimmer" color={color} size={size} />
                  ),
                }}/>
              <Tab.Screen name="albums" component={AlbumsViewWrapper} initialParams={{memesJson: memesJson}}
              options={{
                  tabBarLabel: 'אלבומים',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="image-album" color={color} size={size} />
                  ),
                }}/>
              <Tab.Screen name="search" component={MainViewWrapper} initialParams={{DB: DB}}
                options={{
                  tabBarLabel: 'חיפוש',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={size} />
                  ),
                }}/>
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