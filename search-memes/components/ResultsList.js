import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';


const ResultsList = ({ prefixUrl, results }) => {
  const renderResultItem = ({ item }) => {
    return (
    //  <View style={styles.resultItem}>
     //   <Text style={styles.tags}>{item.series.join(', ')}</Text>
        <Image source={{ uri: prefixUrl + item.image_url }} style={styles.image} />
    //  </View>
    );
  };

  return (
    <FlatList
      style={styles.root}
      data={results}
      renderItem={renderResultItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
    root: {
      width: '100%'
    },
    list: {
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 8,
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
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      aspectRatio: 1,
      heigh: undefined,
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
