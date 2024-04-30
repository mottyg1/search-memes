import React from 'react';
import { View, Switch, Text } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

const SettingsScreen = () => {
  const { settings, updateSettings } = useSettings();

  const toggleSetting = (setting) => {
    updateSettings({ [setting]: !settings[setting] });
  };

  return (       
    <View style={{flexDirection: 'row-reverse', justifyContent: 'right', alignItems: 'right', marginRight: 10}}>
      <Text>הצג פרטי התאמתות</Text>
      <Switch style={{marginRight: 10}} value={settings.showSearchDebugData} onValueChange={() => toggleSetting('showSearchDebugData')} />
    </View>
  );
};

export default SettingsScreen;
