import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';


const SearchView = ({ query, setQuery }) => {
    return (
        <View style={{height: '20%', width: '100%', alignItems: 'center'}}>
            <SearchBar
                style={{width: '100%'}}
                placeholder='?אלו מילים מופיעות במם'
                value={query}
                onChangeText={(text) => setQuery(text)}
                lightTheme
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ textAlign: 'right', marginHorizontal:10, paddingHorizontal:10 }}
            />
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
        width: '95%', 
        backgroundColor: 'transparent', 
        borderBottomColor: 'transparent', 
        borderTopColor: 'transparent', 
      },
      inputContainer: {
        backgroundColor: '#f0f0f0', 
        borderRadius: 10, 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
      },
  });

export default SearchView;
