//import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TaskCard({ title }) {
  const [isChecked, setIsChecked] = useState(false);
console.log('CheckBox:', Checkbox);

  return (
    <View style={styles.card}>
      {/* <CheckBox
        value={isChecked}
        onValueChange={setIsChecked}
        tintColors={{ true: '#6C63FF', false: '#ccc' }}
      /> */}
      <Checkbox
  value={isChecked}
  onValueChange={setIsChecked}
  color={isChecked ? '#6C63FF' : undefined}
/>

      <Text style={[styles.title, isChecked && styles.strike]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F6F6F6',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
