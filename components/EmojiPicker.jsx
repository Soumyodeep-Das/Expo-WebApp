import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

function EmojiPicker ( {isVisible, onClose, children}) {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose a Sticker</Text>
                <Pressable onPress={onClose}>
                    <MaterialIcons name='close' color='#FFFFFF' size={22}/>
                </Pressable>
            </View>
            {children}
        </View>
    </Modal>
  )
}

export default EmojiPicker

const styles = StyleSheet.create({
    modalContent: {
      height: '25%',
      width: '100%',
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '16%',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
  });
  