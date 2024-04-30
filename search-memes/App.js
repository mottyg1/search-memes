import { StyleSheet, View, Text } from 'react-native';
import MainView from './components/MainView';
import SettingsView from './components/SettingsView';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsProvider } from './SettingsContext';

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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="חיפוש" component={MainViewWrapper} />
          <Tab.Screen name="אלבומים" component={AlbumsViewWrapper} />
          <Tab.Screen name="הגדרות" component={SettingsViewWrapper} />
        </Tab.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
