import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';


const AlbumsScreen = ({ memesJson }) => {
  const { settings, updateSettings } = useSettings();

  const handleAlbumClick = (seriesName, chapterName) => {
    // Perform action for clicked chapter
    console.log(`Clicked on chapter: ${seriesName} - ${chapterName}`);
  };

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
      <ScrollView style={styles.container} >
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