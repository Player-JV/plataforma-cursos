import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { io } from 'socket.io-client';
import { API_URL, definirToken } from '../services/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    async function configurarNotificacoes() {
      try {
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'Notificações da Plataforma',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
          });
        }
        await Notifications.requestPermissionsAsync();
      } catch (erro) {
        console.log('Aviso ao configurar notificações:', erro);
      }
    }

    configurarNotificacoes();

    const socket = io(API_URL);

    socket.on('connect', () => {
      console.log('[MOBILE] Conectado ao backend em tempo real!');
    });

    socket.on('notificacao', async (nova) => {
      console.log('[MOBILE] Notificação recebida do Kafka:', nova);

      setNotificacoes((anteriores) => [nova, ...anteriores]);

      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: nova.titulo,
            body: nova.mensagem,
            sound: true,
          },
          trigger: null,
        });
      } catch (erro) {
        console.log('Erro ao exibir notificação nativa:', erro);
      }
    });

    return () => socket.disconnect();
  }, []);

  function entrar(novoToken, dadosUsuario) {
    definirToken(novoToken);
    setToken(novoToken);
    setUsuario(dadosUsuario);
  }

  function sair() {
    definirToken(null);
    setToken(null);
    setUsuario(null);
    setNotificacoes([]);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        notificacoes,
        setNotificacoes,
        entrar,
        sair,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}