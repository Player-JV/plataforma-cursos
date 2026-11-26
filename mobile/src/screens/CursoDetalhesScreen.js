import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { cores } from '../styles/theme';

export default function CursoDetalhesScreen({ route }) {
  const { cursoId } = route.params;
  const { usuario } = useAuth();

  const [curso, setCurso] = useState(null);
  const [matriculado, setMatriculado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [matriculando, setMatriculando] = useState(false);

  const carregarDetalhes = useCallback(async () => {
    try {
      const [resCurso, resMatriculas] = await Promise.all([
        api.get(`/cursos/${cursoId}`),
        api.get('/matriculas'),
      ]);

      setCurso(resCurso.data);

      const jaMatriculado = (resMatriculas.data || []).some(
        (m) => m.idUsuario === usuario?.id && m.idCurso === cursoId,
      );
      setMatriculado(jaMatriculado);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do curso.');
    } finally {
      setCarregando(false);
    }
  }, [cursoId, usuario?.id]);

  useEffect(() => {
    carregarDetalhes();
  }, [carregarDetalhes]);

  async function handleMatricular() {
    if (!usuario?.id) return;

    try {
      setMatriculando(true);
      await api.post('/matriculas', {
        idUsuario: usuario.id,
        idCurso: cursoId,
      });

      setMatriculado(true);
      Alert.alert(
        'Matrícula realizada!',
        'Você foi matriculado com sucesso e o aviso do Kafka foi disparado.',
      );
    } catch (erro) {
      const msg =
        erro.response?.data?.message || 'Não foi possível concluir a matrícula.';
      Alert.alert('Erro na matrícula', Array.isArray(msg) ? msg.join('\n') : msg);
    } finally {
      setMatriculando(false);
    }
  }

  function abrirAula(aula) {
    if (!matriculado) {
      Alert.alert(
        'Conteúdo bloqueado',
        'Faça sua matrícula neste curso para liberar as aulas.',
      );
      return;
    }

    Alert.alert(
      aula.titulo || 'Aula',
      aula.descricao || 'Aula liberada para visualização!',
    );
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  if (!curso) {
    return (
      <View style={styles.centro}>
        <Text style={{ color: cores.cinza }}>Curso não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.cabecalho}>
        <View style={styles.badgesLinha}>
          <Text style={styles.badge}>
            {curso.categoria?.nome || 'Geral'}
          </Text>
          {curso.nivel ? <Text style={styles.nivel}>{curso.nivel}</Text> : null}
        </View>

        <Text style={styles.titulo}>{curso.titulo}</Text>

        {curso.descricao ? (
          <Text style={styles.descricao}>{curso.descricao}</Text>
        ) : null}

        <Text style={styles.meta}>
          Instrutor: {curso.instrutor?.nomeCompleto || 'Equipe'} •{' '}
          {curso.totalAulas || 0} aulas • {curso.totalHoras || 0}h
        </Text>

        {matriculado ? (
          <View style={styles.matriculadoBox}>
            <Ionicons name="checkmark-circle" size={20} color={cores.sucesso} />
            <Text style={styles.matriculadoTexto}>
              Você está matriculado neste curso
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.btnMatricular}
            onPress={handleMatricular}
            disabled={matriculando}
          >
            {matriculando ? (
              <ActivityIndicator color={cores.branco} />
            ) : (
              <Text style={styles.btnMatricularTexto}>
                MATRICULAR-SE NESTE CURSO
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.secaoTitulo}>Conteúdo do Curso (Módulos e Aulas)</Text>

      {!curso.modulos || curso.modulos.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhum módulo cadastrado para este curso ainda.
        </Text>
      ) : (
        curso.modulos.map((modulo, idx) => (
          <View key={modulo.id} style={styles.moduloCard}>
            <Text style={styles.moduloTitulo}>
              Módulo {modulo.ordem ?? idx + 1}: {modulo.titulo}
            </Text>

            {!modulo.aulas || modulo.aulas.length === 0 ? (
              <Text style={styles.aulaVazia}>Sem aulas cadastradas.</Text>
            ) : (
              modulo.aulas.map((aula, aIdx) => (
                <TouchableOpacity
                  key={aula.id}
                  style={styles.aulaItem}
                  onPress={() => abrirAula(aula)}
                >
                  <Ionicons
                    name={matriculado ? 'play-circle' : 'lock-closed-outline'}
                    size={20}
                    color={matriculado ? cores.primaria : cores.cinzaClaro}
                  />
                  <Text style={styles.aulaTitulo}>
                    {aula.ordem ?? aIdx + 1}. {aula.titulo}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
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
  cabecalho: {
    backgroundColor: cores.branco,
    padding: 18,
    borderRadius: 12,
    gap: 10,
    marginBottom: 20,
    elevation: 2,
  },
  badgesLinha: {
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
  nivel: { fontSize: 12, color: cores.cinza, fontWeight: '600' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: cores.texto },
  descricao: { fontSize: 14, color: cores.cinza, lineHeight: 20 },
  meta: { fontSize: 12, color: cores.cinza },
  btnMatricular: {
    height: 48,
    borderRadius: 10,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  btnMatricularTexto: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 14,
  },
  matriculadoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e6faf5',
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  matriculadoTexto: {
    color: cores.sucesso,
    fontWeight: 'bold',
    fontSize: 14,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 12,
  },
  vazio: { color: cores.cinza, fontStyle: 'italic' },
  moduloCard: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    gap: 8,
  },
  moduloTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.texto,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
    paddingBottom: 8,
  },
  aulaVazia: { fontSize: 13, color: cores.cinza, fontStyle: 'italic' },
  aulaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  aulaTitulo: { fontSize: 14, color: cores.texto, flex: 1 },
});