import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    dispatch(login({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            نظام إدارة الموارد البشرية
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            تسجيل الدخول
          </Text>

          {error && (
            <Text variant="bodySmall" style={styles.errorText}>
              {error}
            </Text>
          )}

          <TextInput
            label="البريد الإلكتروني"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            editable={!loading}
          />

          <TextInput
            label="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            style={styles.input}
            editable={!loading}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            دخول
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#2196F3',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  errorText: {
    color: '#F44336',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
