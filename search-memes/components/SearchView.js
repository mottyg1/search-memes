import React, { useState, useEffect } from 'react';
import { View, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import MiniSearch from 'minisearch';
import ResultsList from './ResultsList';

const SearchView = () => {
  const prefixUrl = "https://searchmemes.s3.eu-west-2.amazonaws.com/";
  const [loading, setLoading] = useState(true);
  const [ms, setMs] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  const handleSearch = (text) => {
    setQuery(text);
    if (ms) {
      const searchResults = ms.search(text).slice(0,50);
      setResults(searchResults);
    }
  };

  useEffect(() => {
    const miniSearchInstance = new MiniSearch({
        idField: 'image_url',
        fields: ['text', 'series'],
        storeFields: ['image_url', 'text', 'series'],
        searchOptions: {
            boost: { text: 2 },
            fuzzy: 0.2,
            prefix: true
          }
      });

    fetch(prefixUrl+'memes.json')
      .then(response => response.json())
      .then(data => {
        miniSearchInstance.addAll(data);
        setMs(miniSearchInstance);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  if (loading) {
    return (
      <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput 
        style={styles.textInput}
        value={query}
        onChangeText={(text) => handleSearch(text)}
        placeholder={'אלו מילים מופיעות במים?'}
      />
      <ResultsList results={results} prefixUrl={prefixUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
    textInput: {
      width: '100%',
      height: 40,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.42)',
      borderRadius: 4,
      marginBottom: 10,
    },
  });

export default SearchView;