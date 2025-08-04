// app/task/[category].tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TaskCard from '../../components/TaskCard';

export default function TaskScreen() {
  const { category } = useLocalSearchParams();
  const [tasks, setTasks] = useState<string[]>([]); // initially 0 tasks

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{category} Tasks</Text>
      {/* comment add */}
      {tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks added yet!</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => <TaskCard title={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  empty: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 20,
  },
});
