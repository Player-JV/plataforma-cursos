import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { cores } from '../styles/theme';

export default function NotificacoesScreen() {
  const navigation = useNavigation();
  const { usuario, notificacoes, setNotificacoes, sair } = useAuth();
  const [atualizando, setAtualizando] = useState(false);

  const carregarHistorico = useCallback(async () => {
    if (!usuario?.id) return;
    try {
      const resposta = await api.get(`/notificacoes/usuario/${usuario.id}`);
      setNotificacoes(resposta.data || []);
    } catch (erro) {
      console.log('Erro ao buscar histórico de notificações:', erro);
    } finally {
      setAtualizando(false);
    }
  }, [usuario?.id, setNotificacoes]);

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  async function marcarComoLida(item) {
    if (!item.id || item.lida) return;
    try {
      await api.patch(`/notificacoes/${item.id}/lida`);
      setNotificacoes((lista) =>
        lista.map((n) => (n.id === item.id ? { ...n, lida: true } : n)),
      );
    } catch (erro) {
      console.log('Erro ao marcar notificação como lida:', erro);
    }
  }

  function handleSair() {
    sair();
    navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <View style={styles.container}>
      <View style={styles.perfilCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>{usuario?.nomeCompleto}</Text>
          <Text style={styles.email}>{usuario?.email}</Text>
        </View>
        <TouchableOpacity style={styles.btnSair} onPress={handleSair}>
          <Text style={styles.btnSairTexto}>SAIR</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={() => {
              setAtualizando(true);
              carregarHistorico();
            }}
          />
        }
      >
        <Text style={styles.subtitulo}>
          Avisos do Kafka ({notificacoes.length})
        </Text>

        {notificacoes.length === 0 ? (
          <Text style={styles.vazio}>
            Nenhuma notificação ainda. Realize uma ação no PC ou no app para
            receber avisos em tempo real.
          </Text>
        ) : (
          notificacoes.map((item, idx) => (
            <TouchableOpacity
              key={item.id ?? `live-${idx}`}
              style={[styles.card, item.lida && styles.cardLida]}
              onPress={() => marcarComoLida(item)}
            >
              <View style={styles.cardTopo}>
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                {!item.lida && <View style={styles.pontoNovo} />}
              </View>
              <Text style={styles.cardMsg}>{item.mensagem}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  perfilCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe6e9',
  },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.texto },
  email: { fontSize: 13, color: cores.cinza },
  btnSair: {
    backgroundColor: cores.erro,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnSairTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 12 },
  lista: { padding: 16, gap: 10 },
  subtitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 4,
  },
  vazio: { color: cores.cinza, fontStyle: 'italic' },
  card: {
    backgroundColor: cores.branco,
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: cores.primaria,
  },
  cardLida: { opacity: 0.65, borderLeftColor: cores.cinzaClaro },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitulo: { fontSize: 15, fontWeight: 'bold', color: cores.texto },
  pontoNovo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: cores.primaria,
  },
  cardMsg: { fontSize: 13, color: cores.cinza, marginTop: 4 },
});