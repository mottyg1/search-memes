import React from 'react';
import { View, Switch, Text } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

const RandomScreen = ({ memesJson }) => {
  const { settings, updateSettings } = useSettings();

  return (       
    <View style={{flexDirection: 'row-reverse', justifyContent: 'right', alignItems: 'right', marginRight: 10}}>
      <Text>some random memes - wip</Text>
    </View>
  );
};

export default RandomScreen;
