import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';

export default function BookDetailsScreen() {
  const params = useLocalSearchParams();
  const [bookData, setBookData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // 处理从扫码页面传递的参数
    if (params.isLoading === 'true') {
      setIsLoading(true);
      setError(null);
    } else if (params.isLoading === 'false') {
      setIsLoading(false);
      
      // 处理错误信息
      if (params.error) {
        setError(params.error as string);
      } else if (params.bookData) {
        try {
          const parsedData = JSON.parse(params.bookData as string);
          setBookData(parsedData);
        } catch (error) {
          console.error('解析图书数据失败:', error);
          setError('解析图书数据失败');
        }
      }
    }
  }, [params]);

  // 显示加载状态
  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">正在查询图书信息...</ThemedText>
      </ThemedView>
    );
  }
  
  // 显示错误信息
  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">查询失败</ThemedText>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }
  
  // 如果没有图书数据且没有错误，显示默认加载状态
  if (!bookData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">加载中...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>{bookData.title || '未获取到书名'}</ThemedText>
        
        {bookData.author && (
          <ThemedView style={styles.infoRow}>
            <ThemedText type="defaultSemiBold">作者: </ThemedText>
            <ThemedText>{bookData.author}</ThemedText>
          </ThemedView>
        )}
        
        {bookData.publisher && (
          <ThemedView style={styles.infoRow}>
            <ThemedText type="defaultSemiBold">出版社: </ThemedText>
            <ThemedText>{bookData.publisher}</ThemedText>
          </ThemedView>
        )}
        
        {bookData.publishDate && (
          <ThemedView style={styles.infoRow}>
            <ThemedText type="defaultSemiBold">出版日期: </ThemedText>
            <ThemedText>{bookData.publishDate}</ThemedText>
          </ThemedView>
        )}
        
        {bookData.isbn && (
          <ThemedView style={styles.infoRow}>
            <ThemedText type="defaultSemiBold">ISBN: </ThemedText>
            <ThemedText>{bookData.isbn}</ThemedText>
          </ThemedView>
        )}
        
        {bookData.price && (
          <ThemedView style={styles.infoRow}>
            <ThemedText type="defaultSemiBold">价格: </ThemedText>
            <ThemedText>{bookData.price}</ThemedText>
          </ThemedView>
        )}
        
        {bookData.coverUrl && (
          <ThemedView style={styles.coverContainer}>
            <Image 
              source={{ uri: bookData.coverUrl }} 
              style={styles.cover}
              contentFit="contain"
            />
          </ThemedView>
        )}
        
        {bookData.description && (
          <ThemedView style={styles.descriptionContainer}>
            <ThemedText type="defaultSemiBold">内容简介:</ThemedText>
            <ThemedText style={styles.description}>{bookData.description}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: '#e74c3c',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  coverContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cover: {
    width: 200,
    height: 300,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  description: {
    marginTop: 10,
    lineHeight: 24,
  },
});