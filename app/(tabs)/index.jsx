import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CategoryCard from '../../components/CategoryCard';
import TaskCard from '../../components/TaskCard';
import AddTaskModal from '../../components/AddTaskModal';
import { useRouter } from 'expo-router';
// inside component:
const router = useRouter();

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem('tasks');
    if (data) setTasks(JSON.parse(data));
  };

  const saveTasks = async (newTasks) => {
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    saveTasks(newTasks);
  };

  const toggleTaskStatus = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === 'Completed' ? 'Pending' : 'Completed',
          }
        : task
    );
    saveTasks(newTasks);
  };

  const getCategories = () => {
    const categoryMap = {};
    tasks.forEach((t) => {
      if (!categoryMap[t.category]) categoryMap[t.category] = 1;
      else categoryMap[t.category]++;
    });
    return Object.entries(categoryMap); // [["Work", 2], ["School", 3]]
  };
const [categories, setCategories] = useState([
  { title: 'Design', color: '#FF5C8D' },
]);

const addCategory = () => {
  const newTitle = `New ${categories.length + 1}`;
  const newColor = '#00BFFF';
  setCategories([...categories, { title: newTitle, color: newColor }]);
};

  return (
    <LinearGradient colors={['#6C63FF', '#B37FFF']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hello}>Hello!</Text>
        <Text style={styles.name}>Jhon Doe</Text>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>

      <View style={styles.categoryContainer}>
  {categories.map((cat, idx) => (
  <CategoryCard
    key={idx}
    title={cat.title}
    initialColor={cat.color}
    taskCount={0} // Default for now
    onPress={() => router.push(`/task/${cat.title}`)}
  />
))}

</View>

<TouchableOpacity onPress={addCategory}>
  <Text style={{ color: 'white', marginTop: 5 }}>+ Add Category</Text>
</TouchableOpacity>


      <View style={styles.taskSection}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              title={item.title}
              status={item.status}
              onToggle={() => toggleTaskStatus(item.id)}
            />
          )}
        />
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addTask}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  hello: { color: '#fff', fontSize: 18 },
  name: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  taskSection: {
    backgroundColor: '#fff',
    borderRadius: 25,
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#6C63FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: { fontSize: 30, color: '#fff' },
});
