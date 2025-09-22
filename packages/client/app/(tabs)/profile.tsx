import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../auth/auth-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';

// 默认头像URL
const DEFAULT_AVATAR_URL = 'https://via.placeholder.com/150';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  // 处理设置按钮点击
  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar style="auto" />
      {/* 顶部栏 */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>我的</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
          <IconSymbol size={24} name="gear" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>

      {/* 用户信息区域 */}
      <View style={styles.userInfoContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.avatarUrl || DEFAULT_AVATAR_URL }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.userDetails}>
          <Text style={[styles.userName, { color: Colors[colorScheme ?? 'light'].text }]}>
            {user?.name || user?.username || '未登录用户'}
          </Text>
          {user?.email && (
            <Text style={[styles.userEmail, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              {user.email}
            </Text>
          )}
        </View>
      </View>

      {/* 功能区域 */}
      <View style={styles.featuresContainer}>
        {/* 这里可以添加更多功能卡片 */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  featuresContainer: {
    flex: 1,
    padding: 20,
  },
});