import React, { useState, useEffect } from 'react';
import { View, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import MiniSearch from 'minisearch';
import ResultsList from './ResultsList';
import SearchView from './SearchView';

const MainView = () => {
  const prefixUrl = "https://searchmemes.s3.eu-west-2.amazonaws.com/";
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showSearchDebugData, setShowSearchDebugData] = useState(false);

  useEffect(() => {
    if (db) {
      const searchResults = db.search(query).slice(0,50);
      setResults(searchResults);
    }
  }, [query])

  useEffect(() => {
    const miniSearchInstance = new MiniSearch({
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

    fetch(prefixUrl+'memes.json')
      .then(response => response.json())
      .then(data => {
        miniSearchInstance.addAll(data);
        setDb(miniSearchInstance);
        setLoading(false);
        setQuery('שלום') // debug
      })
      .catch(error => console.error('Error building memes DB:', error));
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
      <ResultsList results={results} prefixUrl={prefixUrl} showSearchDebugData={showSearchDebugData} />
      <SearchView query={query} setQuery={setQuery} 
        showSearchDebugData={showSearchDebugData} setShowSearchDebugData={setShowSearchDebugData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    
  });

export default MainView;