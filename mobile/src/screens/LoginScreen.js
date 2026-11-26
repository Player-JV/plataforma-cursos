import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { cores } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const { entrar } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    try {
      setCarregando(true);
      const resposta = await api.post('/auth/login', {
        email: email.trim(),
        password: senha,
      });

      const { access_token, usuario } = resposta.data;
      entrar(access_token, usuario);
      navigation.replace('Principal');
    } catch (erro) {
      const msg =
        erro.response?.data?.message ||
        'Não foi possível conectar ao servidor. Verifique se o backend está ligado e a porta 3000 está Public.';
      Alert.alert('Erro no login', Array.isArray(msg) ? msg.join('\n') : msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.cabecalho}>
        <View style={styles.logo}>
          <Text style={styles.logoTexto}>PC</Text>
        </View>
        <Text style={styles.titulo}>Plataforma de Cursos</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>
      </View>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={handleLogin}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color={cores.branco} />
          ) : (
            <Text style={styles.botaoTexto}>ENTRAR</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.rodape}>
        <Text>Não tem conta? </Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Registro')}
        >
          Cadastre-se
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 32,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTexto: { color: cores.branco, fontSize: 30, fontWeight: 'bold' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: cores.texto },
  subtitulo: { color: cores.cinza },
  formulario: { gap: 12 },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    backgroundColor: cores.branco,
  },
  botao: {
    height: 50,
    borderRadius: 10,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  rodape: { flexDirection: 'row', justifyContent: 'center' },
  link: { color: cores.primaria, fontWeight: 'bold' },
});