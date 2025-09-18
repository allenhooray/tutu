import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';

export default function BookDetailsScreen() {
  const params = useLocalSearchParams();
  const [bookData, setBookData] = useState<any>(null);
  
  useEffect(() => {
    if (params.bookData) {
      try {
        const parsedData = JSON.parse(params.bookData as string);
        setBookData(parsedData);
      } catch (error) {
        console.error('解析图书数据失败:', error);
      }
    }
  }, [params.bookData]);

  if (!bookData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">加载中...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
  container: {
    flex: 1,
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