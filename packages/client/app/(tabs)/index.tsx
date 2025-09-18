import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CameraView, Camera } from 'expo-camera';
import { useState } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import { Api } from 'api/src/Api';

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);

  // 创建axios实例
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // 根据实际后端API地址调整
    timeout: 10000,
  });

  const api = new Api(axiosInstance);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status !== 'granted') {
      Alert.alert('需要相机权限', '请在设备设置中允许应用访问相机以扫描条形码。');
      return false;
    }

    return true;
  };

  const handleScanPress = async () => {
    const hasCameraPermission = await requestCameraPermission();
    if (hasCameraPermission) {
      setScanning(true);
    }
  };

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanning(false);

    try {
      const response = await api.books.queryBookByIsbn(data);
      router.push({
        pathname: '/book-details',
        params: { bookData: JSON.stringify(response.data) }
      });
    } catch (error) {
      Alert.alert('查询失败', '无法查询到该图书信息，请重试。');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {scanning ? (
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e'],
          }}
          style={styles.scanner}
        />
      ) : (
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>图书条形码扫描</ThemedText>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScanPress}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.scanButtonText}>开始扫描</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanner: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
