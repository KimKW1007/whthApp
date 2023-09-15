import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fontisto, Octicons, Ionicons } from '@expo/vector-icons';
import { theme } from './theme/theme';

interface UBBtnBoxProps {
  isEdit: boolean;
  onPressDelete: () => void;
  onPressUpdateSetting: () => void;
  onPressUpdate: () => void;
}

const UDBtnBox = ({ isEdit, onPressDelete, onPressUpdateSetting, onPressUpdate }: UBBtnBoxProps) => {
  return (
    <View style={styles.toDoTextBox}>
      <Pressable style={{ width: 30 }} onPress={isEdit ? onPressUpdate : onPressUpdateSetting}>
        {isEdit ? (
          <Ionicons name="ios-checkmark-circle-outline" size={24} color={theme.grey} />
        ) : (
          <Octicons name="pencil" size={24} color={theme.grey} />
        )}
      </Pressable>
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
    alignItems: 'center',
    columnGap: 10,
    flexShrink: 0
  }
});
