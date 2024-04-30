import { StyleSheet, View, Text } from 'react-native';
import MainView from './components/MainView';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="חיפוש" component={MainViewWrapper} />
        <Tab.Screen name="אלבומים" component={AlbumsViewWrapper} />
      </Tab.Navigator>
    </NavigationContainer>
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
