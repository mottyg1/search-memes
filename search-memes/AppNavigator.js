import { StyleSheet, View, Text } from 'react-native';
import MainView from './components/MainView';
import SettingsView from './components/SettingsView';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MainViewWrapper() {
    return (
      <View style={styles.basic}>
        <MainView />
      </View>
    );
}
  
function AlbumsViewWrapper() {
    return (
      <View styles={styles.basic}>
        <Text>האלבומים שיש הם אחד שתיים שלוש</Text>
      </View>
    );
}
  
function SettingsViewWrapper() {
    return (
      <View styles={styles.basic}>
        <SettingsView />
      </View>
    );
}

const AppNavigtor = () => {

    const Tab = createBottomTabNavigator();

    return (
          <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName='search' >
              <Tab.Screen name="settings" component={SettingsViewWrapper} options={{
                  tabBarLabel: 'הגדרות',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="shimmer" color={color} size={size} />
                  ),
                }}/>
              <Tab.Screen name="albums" component={AlbumsViewWrapper} options={{
                  tabBarLabel: 'אלבומים',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="image-album" color={color} size={size} />
                  ),
                }}/>
              <Tab.Screen name="search" component={MainViewWrapper} options={{
                  tabBarLabel: 'חיפוש',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={size} />
                  ),
                }}/>
            </Tab.Navigator>
          </NavigationContainer>
    );

};

const styles = StyleSheet.create({
    basic: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default AppNavigtor;