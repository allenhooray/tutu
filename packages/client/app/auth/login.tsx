import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from './auth-context';
import { api } from '@/api';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// 登录方式枚举
enum LoginMethod {
  PASSWORD = 'password',
  EMAIL_VERIFICATION = 'emailVerification',
  PHONE_VERIFICATION = 'phoneVerification',
  FEISHU_OAUTH = 'feishuOAuth',
}

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const { login } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<LoginMethod>(LoginMethod.EMAIL_VERIFICATION);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 发送验证码
  const handleSendCode = async () => {
    if (!email) {
      Alert.alert('提示', '请输入邮箱地址');
      return;
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('提示', '请输入有效的邮箱地址');
      return;
    }

    try {
      setIsSendingCode(true);
      // 调用API发送验证码
      await api.post('/auth/login/send-code', { email });
      Alert.alert('提示', '验证码已发送，请查收邮箱');
      // 开始倒计时
      startCountdown();
    } catch (error) {
      console.error('发送验证码失败:', error);
      Alert.alert('错误', error.response?.data?.message || '发送验证码失败，请稍后重试');
    } finally {
      setIsSendingCode(false);
    }
  };

  // 倒计时功能
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  // 邮箱验证码登录
  const handleEmailVerificationLogin = async () => {
    if (!email || !code) {
      Alert.alert('提示', '请输入邮箱和验证码');
      return;
    }

    try {
      setIsLoggingIn(true);
      // 调用API进行验证码登录
      const response = await api.post('/auth/login/verify', { email, code });
      // 登录成功，保存用户信息和令牌
      await login(response.data.user, response.data.token);
    } catch (error) {
      console.error('登录失败:', error);
      Alert.alert('错误', error.response?.data?.message || '登录失败，请稍后重试');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 处理其他登录方式点击
  const handleOtherMethodPress = (method: LoginMethod) => {
    Alert.alert('提示', `${getMethodDisplayName(method)} 暂未开放`);
  };

  // 获取登录方式的显示名称
  const getMethodDisplayName = (method: LoginMethod): string => {
    switch (method) {
      case LoginMethod.PASSWORD:
        return '账号密码登录';
      case LoginMethod.EMAIL_VERIFICATION:
        return '邮箱验证码登录';
      case LoginMethod.PHONE_VERIFICATION:
        return '手机号验证码登录';
      case LoginMethod.FEISHU_OAUTH:
        return '飞书登录';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>欢迎使用</Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>请登录您的账号</Text>
      </View>

      <View style={styles.methodTabs}>
        <TouchableOpacity
          style={[styles.methodTab, selectedMethod === LoginMethod.PASSWORD && styles.selectedMethodTab]}
          onPress={() => handleOtherMethodPress(LoginMethod.PASSWORD)}
        >
          <Text style={[styles.methodTabText, selectedMethod === LoginMethod.PASSWORD && styles.selectedMethodTabText]}>
            账号密码
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodTab, selectedMethod === LoginMethod.EMAIL_VERIFICATION && styles.selectedMethodTab]}
          onPress={() => setSelectedMethod(LoginMethod.EMAIL_VERIFICATION)}
        >
          <Text style={[styles.methodTabText, selectedMethod === LoginMethod.EMAIL_VERIFICATION && styles.selectedMethodTabText]}>
            邮箱验证码
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodTab, selectedMethod === LoginMethod.PHONE_VERIFICATION && styles.selectedMethodTab]}
          onPress={() => handleOtherMethodPress(LoginMethod.PHONE_VERIFICATION)}
        >
          <Text style={[styles.methodTabText, selectedMethod === LoginMethod.PHONE_VERIFICATION && styles.selectedMethodTabText]}>
            手机验证码
          </Text>
        </TouchableOpacity>
      </View>

      {/* 邮箱验证码登录表单 */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>邮箱</Text>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].border }]}
            placeholder="请输入邮箱地址"
            placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>验证码</Text>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={[styles.codeInput, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].border }]}
              placeholder="请输入验证码"
              placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={[styles.sendCodeButton, countdown > 0 && styles.disabledButton]}
              onPress={handleSendCode}
              disabled={isSendingCode || countdown > 0}
            >
              <Text style={styles.sendCodeButtonText}>
                {isSendingCode ? '发送中...' : countdown > 0 ? `${countdown}秒后重发` : '发送验证码'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleEmailVerificationLogin}
          disabled={isLoggingIn}
        >
          <Text style={styles.loginButtonText}>{isLoggingIn ? '登录中...' : '登录'}</Text>
        </TouchableOpacity>

        {/* 第三方登录方式 */}
        <View style={styles.thirdPartyContainer}>
          <View style={styles.divider} />
          <Text style={[styles.dividerText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>其他登录方式</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.thirdPartyButton}
          onPress={() => handleOtherMethodPress(LoginMethod.FEISHU_OAUTH)}
        >
          <Text style={[styles.thirdPartyButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>飞书登录</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  methodTabs: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  methodTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
  },
  selectedMethodTab: {
    backgroundColor: '#f0f0f0',
  },
  methodTabText: {
    fontSize: 14,
  },
  selectedMethodTabText: {
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 10,
  },
  sendCodeButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  sendCodeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  thirdPartyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  thirdPartyButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  thirdPartyButtonText: {
    fontSize: 16,
  },
});