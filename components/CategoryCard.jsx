import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = ['#FF5C8D', '#FFD700', '#50C878', '#00BFFF', '#FF8C00'];

export default function CategoryCard({ title, taskCount, initialColor }) {
  const [bgColor, setBgColor] = useState(initialColor);

  const changeColor = () => {
    const index = colors.indexOf(bgColor);
    const nextColor = colors[(index + 1) % colors.length];
    setBgColor(nextColor);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bgColor }]}
      onLongPress={changeColor} // press-and-hold to change color
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.task}>{taskCount} Tasks</Text>
      <Ionicons name="color-palette-outline" size={18} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  task: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
  },
});
