import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

export default function AddTaskModal({ visible, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleAdd = () => {
    if (!title.trim() || !category.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title,
      category,
      status,
    };
    onAdd(newTask);
    setTitle('');
    setCategory('');
    setStatus('Pending');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.heading}>Add Task</Text>
          <TextInput
            placeholder="Task Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Category (e.g., Work, School)"
            style={styles.input}
            value={category}
            onChangeText={setCategory}
          />
          <View style={styles.buttons}>
            <Button title="Cancel" onPress={onClose} color="#aaa" />
            <Button title="Add" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
