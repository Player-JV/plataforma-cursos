import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { api } from '../services/api';
import { cores } from '../styles/theme';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar: '',
  });
  const [carregando, setCarregando] = useState(false);

  function alterar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  async function handleRegistrar() {
    if (!form.nome.trim() || !form.email.trim() || !form.senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (form.senha !== form.confirmar) {
      Alert.alert('Atenção', 'As senhas não conferem.');
      return;
    }

    try {
      setCarregando(true);
      await api.post('/usuarios', {
        nome: form.nome.trim(),
        email: form.email.trim(),
        senha: form.senha,
      });

      Alert.alert('Sucesso', 'Conta criada! Você já pode fazer login.');
      navigation.goBack();
    } catch (erro) {
      const msg =
        erro.response?.data?.message || 'Não foi possível criar a conta.';
      Alert.alert('Erro no cadastro', Array.isArray(msg) ? msg.join('\n') : msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: cores.fundo }}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.subtitulo}>Preencha seus dados</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={form.nome}
        onChangeText={(v) => alterar('nome', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(v) => alterar('email', v)}
      />

      <View style={styles.linha}>
        <TextInput
          style={[styles.input, styles.metade]}
          placeholder="Senha"
          secureTextEntry
          value={form.senha}
          onChangeText={(v) => alterar('senha', v)}
        />
        <TextInput
          style={[styles.input, styles.metade]}
          placeholder="Confirmar"
          secureTextEntry
          value={form.confirmar}
          onChangeText={(v) => alterar('confirmar', v)}
        />
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={handleRegistrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color={cores.branco} />
        ) : (
          <Text style={styles.botaoTexto}>CADASTRAR</Text>
        )}
      </TouchableOpacity>

      <View style={styles.rodape}>
        <Text>Já tem conta? </Text>
        <Text style={styles.link} onPress={() => navigation.goBack()}>
          Entrar
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.texto },
  subtitulo: { color: cores.cinza, marginBottom: 12 },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    backgroundColor: cores.branco,
  },
  linha: { flexDirection: 'row', gap: 12 },
  metade: { flex: 1 },
  botao: {
    height: 50,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  rodape: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  link: { color: cores.primaria, fontWeight: 'bold' },
});