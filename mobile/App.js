import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import AppRoutes from './src/navigation/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppRoutes />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}