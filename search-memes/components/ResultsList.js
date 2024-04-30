import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSettings } from '../SettingsContext';


const ResultsList = ({ results }) => {
  const { settings, updateSettings } = useSettings();

  const renderResultItem = ({ item }) => {
    return (
      <View style={styles.resultItem}>
        <Text style={styles.tags}>{item.series.join(', ')}</Text>
        {settings.showSearchDebugData && (
            <>
                <Text style={styles.tags}>ציון: {item.score}</Text>
                <Text style={styles.tags}>מילים מתאמתות: {Object.keys(item.match).join(', ')}</Text>
                <Text style={styles.tags}>טקסט מחולץ: {item.text}</Text>
            </>
        )}
        <Image source={{ uri: settings.prefixUrl + item.image_url }} style={[styles.image, {aspectRatio: item.aspect_ratio}]} />
      </View>
    );
  };

  return (
    <FlatList
      style={{ width: '100%', paddingHorizontal: 10 }}
      data={results.sort((a,b)=>b.score-a.score)}
      renderItem={renderResultItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
    list: {
      width: '100%',
      paddingVertical: 8,
    //  marginHorizontal: 10
    },
    resultItem: {
      width: '100%',
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 4,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      paddingHorizontal: 10,
      resizeMode: 'contain'
    },
    tags: {
      fontSize: 16,
      color: 'gray',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });

export default ResultsList;
