import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';


const SearchView = ({ query, setQuery, searchInputRef }) => {
    return (
        <View style={{height: '10%', width: '100%', paddingHorizontal: 10}}>
            <View style={{alignItems: 'center'}}>
                <SearchBar
                    style={{width: '100%'}}
                    ref={searchInputRef}
                    placeholder='?אלו מילים מופיעות במם'
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    lightTheme
                    autoFocus
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={{ textAlign: 'right', marginHorizontal:10, paddingHorizontal:10 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', 
      },
      searchContainer: {
        paddingHorizontal: 0,
        width: '100%', 
        backgroundColor: 'transparent', 
        borderBottomColor: 'transparent', 
        borderTopColor: 'transparent', 
      },
      inputContainer: {
        backgroundColor: '#f0f0f0', 
        borderRadius: 10, 
        paddingVertical: 5, 
      },
  });

export default SearchView;
