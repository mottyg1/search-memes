import { SettingsProvider } from './contexts/SettingsContext';
import AppNavigtor from './AppNavigator';

export default function App() {
  return (
    <SettingsProvider>
      <AppNavigtor />
    </SettingsProvider>
  );
}


