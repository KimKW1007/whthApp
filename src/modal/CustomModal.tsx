import React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';
import ModalBtn from './ModalBtn';

const { width: SCREEN_WIDTH } = Dimensions.get('window');



const CustomModal = ({deleteToDo, deleteCancle} : {[key :string] : () =>void}) => {
  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalWrap}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>안내</Text>
          <Text style={styles.modalDescription}>삭제하시겠습니까?</Text>
          <View style={styles.modalBtnBox}>
            <ModalBtn text='삭제' onPress={deleteToDo} />
            <ModalBtn text='취소' onPress={deleteCancle} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: SCREEN_WIDTH - 100,
    backgroundColor: '#fff',
    borderRadius: 15
  },
  modalTitle: {
    textAlign: 'center',
    borderBottomColor: `${theme.grey}35`,
    borderBottomWidth: 1,
    paddingVertical: 15
  },
  modalDescription: {
    paddingVertical: 30,
    textAlign: 'center',
    paddingHorizontal: 40
  },
  modalBtnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: `${theme.grey}35`
  },
});
