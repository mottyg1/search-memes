import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';


const AlbumsScreen = ({ memesJson }) => {
  const { settings, updateSettings } = useSettings();

  const renderSeriesItem = ({ item }) => (
    <Text>{item}</Text>
  );

  const renderSeriesCounter = () => {
    const counter = {};

    memesJson.forEach(({ series }) => {
      const [firstSeries, secondSeries] = series;
      if (!counter[firstSeries]) {
        counter[firstSeries] = { count: 1, secondSeries: new Set([secondSeries]) };
      } else {
        counter[firstSeries].count++;
        counter[firstSeries].secondSeries.add(secondSeries);
      }
    });

    return Object.entries(counter).map(([firstSeries, { count, secondSeries }]) => (
      <View key={firstSeries} style={styles.firstSeriesContainer}>
        <Text style={styles.firstSeriesText}>{firstSeries}: {count}</Text>
        <View style={styles.secondSeriesContainer}>
          {[...secondSeries].map((series, index) => (
            <View key={index} style={styles.secondSeriesItem}>
              <Text>{series}</Text>
            </View>
          ))}
        </View>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {renderSeriesCounter()}
    </ScrollView>
  );
};
  

const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      padding: 10,
      maxWidth: 700, 
      width: '100%', 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
  firstSeriesContainer: {
    marginBottom: 10,
  },
  firstSeriesText: {
    fontSize: 20, // Larger font size for the first series
  },
  secondSeriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f0f0f0', // Light grey background color
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  secondSeriesItem: {
    backgroundColor: '#ffffff', // White background color for each item
    padding: 5,
    margin: 2,
    borderRadius: 5,
  },
});

export default AlbumsScreen;