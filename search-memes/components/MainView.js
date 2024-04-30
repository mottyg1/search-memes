import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ResultsList from './ResultsList';
import SearchView from './SearchView';
import { useSettings } from '../contexts/SettingsContext';


const MainView = ({DB}) => {
  const { settings, updateSettings } = useSettings();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (DB) {
      const searchResults = DB.search(query).slice(0,50);
      setResults(searchResults);
    }
  }, [query])
  
  return (
    <View style={{ maxWidth: 700, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ResultsList results={results} />
      <SearchView query={query} setQuery={setQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
    
  });

export default MainView;