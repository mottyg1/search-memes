import React from 'react';
import { View, Switch, Text } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

const StatsScreen = ({ memesJson }) => {
  const { settings, updateSettings } = useSettings();

  return (       
    <View style={{flexDirection: 'row-reverse', justifyContent: 'right', alignItems: 'right', marginRight: 10}}>
      <Text>יש {memesJson.length} ממים באתר</Text>
      <Text>wip</Text>
    </View>
  );
};

export default StatsScreen;
