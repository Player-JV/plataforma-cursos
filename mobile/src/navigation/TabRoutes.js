import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CatalogoScreen from '../screens/CatalogoScreen';
import MeusCursosScreen from '../screens/MeusCursosScreen';
import PlanosScreen from '../screens/PlanosScreen';
import NotificacoesScreen from '../screens/NotificacoesScreen';
import { useAuth } from '../contexts/AuthContext';
import { cores } from '../styles/theme';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { notificacoes } = useAuth();
  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.primaria },
        headerTintColor: cores.branco,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.cinza,
      }}
    >
      <Tab.Screen
        name="Explorar"
        component={CatalogoScreen}
        options={{
          title: 'Trilhas e Cursos',
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MeusCursos"
        component={MeusCursosScreen}
        options={{
          title: 'Meus Cursos',
          tabBarLabel: 'Meus Cursos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Planos"
        component={PlanosScreen}
        options={{
          title: 'Planos e Pagamento',
          tabBarLabel: 'Planos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notificacoes"
        component={NotificacoesScreen}
        options={{
          title: 'Notificações e Perfil',
          tabBarLabel: 'Avisos',
          tabBarBadge: naoLidas > 0 ? naoLidas : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}