import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultsList from './ResultsList';

const Stack = createNativeStackNavigator();

const AlbumsScreen = ({ memesJson }) => {
  const { settings, updateSettings } = useSettings();

  const AlbumsList = ({ navigation }) => {
    const handleAlbumClick = (seriesName, chapterName) => {
      console.log(`Clicked on chapter: ${seriesName} - ${chapterName}`);
      navigation.navigate('AlbumMemes', { seriesName, chapterName });
    };

    return (
      <View style={{ alignItems: 'center', flex: 1 }}>
        <ScrollView style={[styles.container]} >
          {Object.keys(albums).map((seriesName) => (
            <TouchableOpacity
              key={seriesName}
              onPress={() => handleAlbumClick(seriesName, null)}
              style={styles.seriesContainer}
            >
              <Text style={styles.seriesName}>{seriesName}</Text>
              {[...albums[seriesName]].some(value => value !== undefined) && <>
                <View style={styles.chapterList}>
                  {[...albums[seriesName]].map((chapter, index) => (
                    <TouchableOpacity
                      key={`${seriesName}_${index}`}
                      onPress={() => handleAlbumClick(seriesName, chapter)}
                      style={styles.chapter}
                    >
                      <Text>{chapter}</Text>
                    </TouchableOpacity>
                  ))}
                </View> </>}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  const AlbumMemes = ({ route }) => {
    const { seriesName, chapterName } = route.params;

    results = memesJson.filter(({ series: [first, second] }) => first === seriesName && second === chapterName);

    return (
      <View style={[styles.container, { alignItems: 'center', flex: 1 }]}>
        {/* <Text>{seriesName} </Text> */}
        <ResultsList results={results} />
      </View>
    )
  }

  const albums = {};

  memesJson.forEach(({ series }) => {
    const [seriesName, chapterName] = series;
    if (!albums[seriesName]) {
      albums[seriesName] = new Set([chapterName]);
    } else {
      albums[seriesName].add(chapterName);
    }
  });


  return (
    <Stack.Navigator screenOptions={{ headerShown: false,
      style: { width: '100%', flex: 1, alignItems: 'center', alignContent: 'center' },
    }}>
      <Stack.Screen name="AlbumsList" component={AlbumsList} />
      <Stack.Screen name="AlbumMemes" component={AlbumMemes} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    maxWidth: 700,
  },
  seriesContainer: {
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  seriesName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chapterList: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chapter: {
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
  },
});

export default AlbumsScreen;