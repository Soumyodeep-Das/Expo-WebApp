import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

function IconButton({ label, icon, onPress }) {
    return (
        <Pressable
            style={styles.iconButton}
            onPress={onPress} >
            <MaterialIcons name={icon} size={24} color="#FFFFFF" />
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
      },
})