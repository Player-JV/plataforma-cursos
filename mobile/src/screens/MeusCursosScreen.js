import { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { cores } from '../styles/theme';

export default function MeusCursosScreen() {
  const navigation = useNavigation();
  const { usuario } = useAuth();
  const [matriculas, setMatriculas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const carregarMatriculas = useCallback(async () => {
    try {
      const resposta = await api.get('/matriculas');
      const todas = resposta.data || [];
      const doAluno = todas.filter((m) => m.idUsuario === usuario?.id);
      setMatriculas(doAluno);
    } catch (erro) {
      console.log('Erro ao carregar matrículas:', erro);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, [usuario?.id]);

  useFocusEffect(
    useCallback(() => {
      carregarMatriculas();
    }, [carregarMatriculas]),
  );

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      refreshControl={
        <RefreshControl
          refreshing={atualizando}
          onRefresh={() => {
            setAtualizando(true);
            carregarMatriculas();
          }}
        />
      }
    >
      <Text style={styles.titulo}>Cursos Matriculados ({matriculas.length})</Text>

      {matriculas.length === 0 ? (
        <View style={styles.vazioBox}>
          <Text style={styles.vazioTexto}>
            Você ainda não se matriculou em nenhum curso.
          </Text>
          <Text style={styles.vazioSub}>
            Vá na aba "Explorar", toque em um curso e clique em Matricular-se!
          </Text>
        </View>
      ) : (
        matriculas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('CursoDetalhes', {
                cursoId: item.curso?.id ?? item.idCurso,
                titulo: item.curso?.titulo || 'Detalhes do Curso',
              })
            }
          >
            <View style={styles.cardTopo}>
              <Text style={styles.badge}>
                {item.curso?.categoria?.nome || 'Matriculado'}
              </Text>
              <Text style={styles.status}>Ativo</Text>
            </View>
            <Text style={styles.cursoTitulo}>
              {item.curso?.titulo || `Curso #${item.idCurso}`}
            </Text>
            <Text style={styles.dica}>Toque para acessar módulos e aulas →</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16, paddingBottom: 32 },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.fundo,
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 14,
  },
  vazioBox: {
    backgroundColor: cores.branco,
    padding: 20,
    borderRadius: 12,
    gap: 6,
  },
  vazioTexto: { fontSize: 15, fontWeight: 'bold', color: cores.texto },
  vazioSub: { fontSize: 13, color: cores.cinza },
  card: {
    backgroundColor: cores.branco,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 6,
    borderLeftWidth: 4,
    borderLeftColor: cores.sucesso,
    elevation: 2,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#ede9fe',
    color: cores.primaria,
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  status: { fontSize: 12, fontWeight: 'bold', color: cores.sucesso },
  cursoTitulo: { fontSize: 17, fontWeight: 'bold', color: cores.texto },
  dica: { fontSize: 12, color: cores.primaria, marginTop: 4, fontWeight: '600' },
});