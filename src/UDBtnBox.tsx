import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fontisto, Octicons } from '@expo/vector-icons';
import { theme } from './theme/theme';

const UDBtnBox = ({ onPressDelete, onPressUpdate }: { [key: string]: () => void }) => {
  return (
    <View style={{ ...styles.toDoTextBox, columnGap: 10 }}>
      <TouchableOpacity style={{ width: 30 }} onPress={onPressUpdate}>
        <Octicons name="pencil" size={24} color={theme.grey} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressDelete}>
        <Fontisto name="trash" size={18} color={theme.grey} />
      </TouchableOpacity>
    </View>
  );
};

export default UDBtnBox;

const styles = StyleSheet.create({
  toDoTextBox: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
