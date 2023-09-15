import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const ToDoTextBox = ({completed , text, onPress} : {completed :boolean, text :string, onPress : () => void}) => {
  return (
    <View style={styles.toDoTextBox}>
      <TouchableOpacity style={styles.completedIconBox} onPress={onPress}>
        {completed ? <Fontisto name="checkbox-active" size={18} color="white" /> : <Fontisto name="checkbox-passive" size={18} color="white" />}
      </TouchableOpacity>
      <Text style={!completed ? styles.toDoText : { ...styles.toDoText, color: '#999', textDecorationLine: 'line-through' }}>{text}</Text>
    </View>
  );
};

export default ToDoTextBox;

const styles = StyleSheet.create({
  toDoTextBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  toDoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  completedIconBox :{
    width: 30,
  },
})
