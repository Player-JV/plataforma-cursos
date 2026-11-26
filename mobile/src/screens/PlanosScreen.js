import { useCallback, useState } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { cores } from '../styles/theme';

const METODOS = [
  { id: 'PIX', label: 'PIX', icone: 'qr-code-outline' },
  { id: 'CARTAO_CREDITO', label: 'Cartão', icone: 'card-outline' },
  { id: 'BOLETO', label: 'Boleto', icone: 'barcode-outline' },
];

export default function PlanosScreen() {
  const { usuario } = useAuth();
  const [planos, setPlanos] = useState([]);
  const [assinaturas, setAssinaturas] = useState([]);
  const [metodoSelecionado, setMetodoSelecionado] = useState('PIX');
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [processandoId, setProcessandoId] = useState(null);

  const carregarDados = useCallback(async () => {
    try {
      const [resPlanos, resAssinaturas] = await Promise.all([
        api.get('/planos'),
        api.get('/assinaturas'),
      ]);

      setPlanos(resPlanos.data || []);

      const minhas = (resAssinaturas.data || []).filter(
        (a) => a.idUsuario === usuario?.id,
      );
      setAssinaturas(minhas);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os planos da API.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, [usuario?.id]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados]),
  );

  async function handleAssinarEPagar(plano) {
    if (!usuario?.id) return;

    try {
      setProcessandoId(plano.id);

      // 1. Calcula a data de expiração com base na duração do plano em meses
      const dataFim = new Date();
      dataFim.setMonth(dataFim.getMonth() + (Number(plano.duracaoMeses) || 1));

      // 2. Cria a assinatura (POST /assinaturas)
      const resAssinatura = await api.post('/assinaturas', {
        idUsuario: Number(usuario.id),
        idPlano: Number(plano.id),
        dataFim: dataFim.toISOString(),
      });

      const idAssinatura = resAssinatura.data.id;

      // 3. Registra o pagamento (POST /pagamentos) -> dispara o evento no Kafka
      const idTransacaoGateway = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      await api.post('/pagamentos', {
        valorPago: Number(plano.preco),
        metodoPagamento: metodoSelecionado,
        idTransacaoGateway,
        idAssinatura: Number(idAssinatura),
      });

      await carregarDados();

      Alert.alert(
        'Pagamento aprovado!',
        `Assinatura do plano "${plano.nome}" ativada via ${metodoSelecionado}.`,
      );
    } catch (erro) {
      const msg =
        erro.response?.data?.message ||
        'Não foi possível processar a assinatura e o pagamento.';
      Alert.alert(
        'Erro no pagamento',
        Array.isArray(msg) ? msg.join('\n') : msg,
      );
    } finally {
      setProcessandoId(null);
    }
  }

  function formatarData(dataIso) {
    if (!dataIso) return '-';
    return new Date(dataIso).toLocaleDateString('pt-BR');
  }

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
            carregarDados();
          }}
        />
      }
    >
      {assinaturas.length > 0 && (
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Sua Assinatura Ativa</Text>
          {assinaturas.map((item) => (
            <View key={item.id} style={styles.assinaturaCard}>
              <Ionicons name="checkmark-circle" size={24} color={cores.sucesso} />
              <View style={{ flex: 1 }}>
                <Text style={styles.assinaturaNome}>
                  {item.plano?.nome || `Plano #${item.idPlano}`}
                </Text>
                <Text style={styles.assinaturaValidade}>
                  Válida até: {formatarData(item.dataFim)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.secaoTitulo}>Forma de Pagamento</Text>
      <View style={styles.metodosLinha}>
        {METODOS.map((metodo) => {
          const ativo = metodoSelecionado === metodo.id;
          return (
            <TouchableOpacity
              key={metodo.id}
              style={[styles.metodoBtn, ativo && styles.metodoBtnAtivo]}
              onPress={() => setMetodoSelecionado(metodo.id)}
            >
              <Ionicons
                name={metodo.icone}
                size={18}
                color={ativo ? cores.branco : cores.primaria}
              />
              <Text
                style={[styles.metodoTexto, ativo && styles.metodoTextoAtivo]}
              >
                {metodo.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.secaoTitulo, { marginTop: 20 }]}>
        Planos Disponíveis
      </Text>

      {planos.length === 0 ? (
        <View style={styles.vazioBox}>
          <Text style={styles.vazioTexto}>Nenhum plano cadastrado ainda.</Text>
          <Text style={styles.vazioSub}>
            Cadastre um plano no Swagger (POST /planos) e puxe esta tela para
            baixo para atualizar.
          </Text>
        </View>
      ) : (
        planos.map((plano) => {
          const emAndamento = processandoId === plano.id;
          const precoFormatado = Number(plano.preco || 0)
            .toFixed(2)
            .replace('.', ',');

          return (
            <View key={plano.id} style={styles.planoCard}>
              <View style={styles.planoTopo}>
                <Text style={styles.planoNome}>{plano.nome}</Text>
                <Text style={styles.duracaoBadge}>
                  {plano.duracaoMeses}{' '}
                  {plano.duracaoMeses === 1 ? 'mês' : 'meses'}
                </Text>
              </View>

              {plano.descricao ? (
                <Text style={styles.planoDesc}>{plano.descricao}</Text>
              ) : null}

              <Text style={styles.preco}>R$ {precoFormatado}</Text>

              <TouchableOpacity
                style={styles.btnAssinar}
                onPress={() => handleAssinarEPagar(plano)}
                disabled={processandoId !== null}
              >
                {emAndamento ? (
                  <ActivityIndicator color={cores.branco} />
                ) : (
                  <Text style={styles.btnAssinarTexto}>
                    ASSINAR E PAGAR ({metodoSelecionado.replace('_', ' ')})
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })
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
  secao: { marginBottom: 20 },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 12,
  },
  assinaturaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#e6faf5',
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: cores.sucesso,
    marginBottom: 8,
  },
  assinaturaNome: { fontSize: 15, fontWeight: 'bold', color: cores.texto },
  assinaturaValidade: { fontSize: 13, color: cores.cinza, marginTop: 2 },
  metodosLinha: { flexDirection: 'row', gap: 8 },
  metodoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.primaria,
  },
  metodoBtnAtivo: { backgroundColor: cores.primaria },
  metodoTexto: { fontSize: 13, fontWeight: 'bold', color: cores.primaria },
  metodoTextoAtivo: { color: cores.branco },
  vazioBox: {
    backgroundColor: cores.branco,
    padding: 20,
    borderRadius: 12,
    gap: 6,
  },
  vazioTexto: { fontSize: 15, fontWeight: 'bold', color: cores.texto },
  vazioSub: { fontSize: 13, color: cores.cinza },
  planoCard: {
    backgroundColor: cores.branco,
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    gap: 8,
    elevation: 2,
  },
  planoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planoNome: { fontSize: 18, fontWeight: 'bold', color: cores.texto, flex: 1 },
  duracaoBadge: {
    backgroundColor: '#ede9fe',
    color: cores.primaria,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  planoDesc: { fontSize: 13, color: cores.cinza },
  preco: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.primaria,
    marginVertical: 4,
  },
  btnAssinar: {
    height: 48,
    borderRadius: 10,
    backgroundColor: cores.sucesso,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  btnAssinarTexto: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 13,
  },
});