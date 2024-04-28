import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Switch } from '@rneui/base';


const SearchView = ({ query, setQuery, showSearchDebugData, setShowSearchDebugData }) => {
    return (
        <View style={{height: '20%', width: '100%', paddingHorizontal: 10}}>
            <View style={{alignItems: 'center'}}>
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
            <View style={{flexDirection: 'row-reverse', justifyContent: 'right', alignItems: 'right', marginRight: 10}}>
                <Text>הצג פרטי התאמתות</Text>
                <Switch
                    style={{marginRight: 10}}
                    value={showSearchDebugData}
                    onValueChange={() => setShowSearchDebugData(previousState => !previousState)}
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
