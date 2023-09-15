import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

interface ToDoTextBoxProps {
  setDetailId: () => void;
  completed: boolean;
  text: string;
  onPress: () => void;
  isDetail: boolean;
}

const ToDoTextBox = ({ isDetail, setDetailId, completed, text, onPress }: ToDoTextBoxProps) => {
  return (
    <View style={styles.toDoTextBox}>
      <TouchableOpacity style={styles.checkIconBox} onPress={onPress}>
        {completed ? <Fontisto name="checkbox-active" size={18} color="white" /> : <Fontisto name="checkbox-passive" size={18} color="white" />}
      </TouchableOpacity>
      {!completed && isDetail ? (
        <Pressable onPress={setDetailId}>
          <Text style={styles.toDoDetailText}>{text}</Text>
        </Pressable>
      ) : (
        <Pressable>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            onPress={setDetailId}
            style={!completed ? styles.toDoText : { ...styles.toDoText, color: '#999', textDecorationLine: 'line-through' }}>
            {text}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ToDoTextBox;

const styles = StyleSheet.create({
  toDoTextBox: {
    width: '70%',
    flexDirection: 'row',
  },
  checkIconBox: {
    width: 30,
    marginTop : 1,
  },
  toDoText: {
    color: '#fff',
    fontSize: 16,
    height: 21,
    fontWeight: '600'
  },
  toDoDetailText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
