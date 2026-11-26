import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { api } from '../services/api';
import { cores } from '../styles/theme';

export default function CatalogoScreen({ navigation }) {
  const [trilhas, setTrilhas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const carregarDados = useCallback(async () => {
    try {
      const [resTrilhas, resCursos] = await Promise.all([
        api.get('/trilhas'),
        api.get('/cursos'),
      ]);
      setTrilhas(resTrilhas.data || []);
      setCursos(resCursos.data || []);
    } catch (erro) {
      Alert.alert(
        'Erro ao carregar',
        'Não foi possível buscar trilhas e cursos da API.',
      );
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  function onRefresh() {
    setAtualizando(true);
    carregarDados();
  }

  function abrirCurso(curso) {
  navigation.navigate('CursoDetalhes', {
    cursoId: curso.id,
    titulo: curso.titulo,
  });
}

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
        <Text style={styles.carregandoTexto}>Carregando catálogo...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      refreshControl={
        <RefreshControl refreshing={atualizando} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.secaoTitulo}>Trilhas de Aprendizagem</Text>

      {trilhas.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma trilha cadastrada ainda.</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trilhasLista}
        >
          {trilhas.map((trilha) => (
            <View key={trilha.id} style={styles.trilhaCard}>
              <Text style={styles.badge}>
                {trilha.categoria?.nome || 'Trilha'}
              </Text>
              <Text style={styles.trilhaTitulo}>{trilha.titulo}</Text>
              {trilha.descricao ? (
                <Text style={styles.trilhaDesc} numberOfLines={2}>
                  {trilha.descricao}
                </Text>
              ) : null}
              <Text style={styles.trilhaInfo}>
                {trilha.cursos?.length || 0} curso(s) na trilha
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Text style={[styles.secaoTitulo, { marginTop: 24 }]}>
        Cursos Disponíveis
      </Text>

      {cursos.length === 0 ? (
        <Text style={styles.vazio}>Nenhum curso cadastrado ainda.</Text>
      ) : (
        cursos.map((curso) => (
          <TouchableOpacity
            key={curso.id}
            style={styles.cursoCard}
            onPress={() => abrirCurso(curso)}
          >
            <View style={styles.cursoTopo}>
              <Text style={styles.badge}>
                {curso.categoria?.nome || 'Geral'}
              </Text>
              <Text style={styles.nivel}>{curso.nivel}</Text>
            </View>

            <Text style={styles.cursoTitulo}>{curso.titulo}</Text>

            {curso.descricao ? (
              <Text style={styles.cursoDesc} numberOfLines={2}>
                {curso.descricao}
              </Text>
            ) : null}

            <Text style={styles.cursoRodape}>
              Instrutor: {curso.instrutor?.nomeCompleto || 'Equipe'} •{' '}
              {curso.totalAulas || 0} aulas • {curso.totalHoras || 0}h
            </Text>
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
    gap: 10,
  },
  carregandoTexto: { color: cores.cinza },
  secaoTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 12,
  },
  vazio: { color: cores.cinza, fontStyle: 'italic', marginBottom: 8 },
  trilhasLista: { gap: 12, paddingRight: 8 },
  trilhaCard: {
    width: 240,
    backgroundColor: cores.primaria,
    padding: 16,
    borderRadius: 12,
    gap: 6,
  },
  trilhaTitulo: { fontSize: 16, fontWeight: 'bold', color: cores.branco },
  trilhaDesc: { fontSize: 13, color: '#e8e4ff' },
  trilhaInfo: { fontSize: 12, color: '#dcd6ff', marginTop: 4 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ede9fe',
    color: cores.primaria,
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cursoCard: {
    backgroundColor: cores.branco,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 6,
    elevation: 2,
  },
  cursoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nivel: { fontSize: 12, color: cores.cinza, fontWeight: '600' },
  cursoTitulo: { fontSize: 17, fontWeight: 'bold', color: cores.texto },
  cursoDesc: { fontSize: 13, color: cores.cinza },
  cursoRodape: { fontSize: 12, color: cores.cinza, marginTop: 4 },
});