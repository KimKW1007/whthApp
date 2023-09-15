import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from './theme/theme';

const Tabs = ({ name, typeFn, isWorking, booleanType }: { name: string; typeFn: () => void; isWorking: boolean; booleanType: boolean }) => {
  return (
    <TouchableOpacity onPress={typeFn}>
      <Text style={{ ...styles.btnText, color: isWorking === booleanType ? '#fff' : theme.grey }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 38,
    fontWeight: '600'
  }
});
