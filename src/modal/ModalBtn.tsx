import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { theme } from '../theme/theme'

const ModalBtn = ({text , onPress} : {text : string, onPress : ()=> void}) => {
  return (
    <Pressable onPress={onPress} style={text === '삭제' ? { ...styles.modalBtn, borderRightWidth: 1, borderColor: `${theme.grey}35` }  :styles.modalBtn}>
      <Text
        style={{
          ...styles.modalBtnText,
          color: text === '삭제' ? '#FF6969' : '#279EFF'
        }}>
        {text}
      </Text>
    </Pressable>
  )
}

export default ModalBtn

const styles = StyleSheet.create({
  modalBtn: {
    flexGrow: 1,
    paddingVertical: 18
  },
  modalBtnText: {
    textAlign: 'center'
  }
});