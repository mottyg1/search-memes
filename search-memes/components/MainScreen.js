import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ResultsList from './ResultsList';
import SearchView from './SearchView';
import { useSettings } from '../contexts/SettingsContext';
import { Icon } from '@rneui/themed';


const MainScreen = ({ DB }) => {
  const { settings, updateSettings } = useSettings();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchInputRef = useRef(null);

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (DB) {
      const searchResults = DB.search(query).slice(0, 50);
      setResults(searchResults);
    }
  }, [query])

  return (
    <View style={{ maxWidth: 700, width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SearchView query={query} setQuery={setQuery} searchInputRef={searchInputRef} />
      <ResultsList results={results} />
      <TouchableOpacity style={styles.button} onPress={handleFocusSearch}>
        <Icon name="search" type="material" color="grey" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    position: 'absolute',
    right: 10,
    bottom: 100, 
    zIndex: 20
  },
});

export default MainScreen;