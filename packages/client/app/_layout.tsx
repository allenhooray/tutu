import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from './auth/auth-context';

// 路由保护组件
const ProtectedLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // 确保组件已经挂载后再进行导航
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 只有在组件挂载后才执行导航逻辑
    if (!isMounted) return;

    // 如果用户未登录且不在登录页面，则重定向到登录页面
    if (!isAuthenticated) {
      const inAuthGroup = segments[0] === 'auth';
      if (!inAuthGroup) {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, segments, router, isMounted]);

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
