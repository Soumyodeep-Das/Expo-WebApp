import { Image, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import  domtoimage from 'dom-to-image'

//Expo-Image-Picker
import * as ImagePicker from 'expo-image-picker'

//Custom Component
import ImageViewer from '../components/ImageViewer'
import Button from '../components/Button'
import CircleButton from '../components/CircleButton'
import IconButton from '../components/IconButton'
import EmojiPicker from '../components/EmojiPicker'
import EmojiList from '../components/EmojiList'
import EmojiSticker from '../components/EmojiSticker'

// react-native-gesture-handler
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// react-native expo-media-library for saving image into internal storage
import * as MediaLibrary from 'expo-media-library'

// react-native-view-shot library for taking screenshot of the image
import { captureRef } from 'react-native-view-shot'

const placeholderImage = require('../assets/images/background-image.png')


const index = () => {

  const [selectedImage, setSelectedImage] = useState('')
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [status, requestPermission] = MediaLibrary.usePermissions()

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      // console.log(result)
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert('You didn\'t select any image')
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  if (status === null) {
    requestPermission()
  }

  const imageRef = useRef(null)

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        })
  
        await MediaLibrary.saveToLibraryAsync(localUri)
        if (localUri) {
          alert("Saved!")
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current!, {
          quality: 0.95,
          width: 320,
          height: 440,
        })
  
        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          {/* Using custom component <ImageView/> rather than <Image/> */}
          <ImageViewer placeholderImageSource={placeholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {/* <View style={styles.footerContainer}>
        <Button label={'Choose a photo'} theme={'primary'} onPress={pickImageAsync}/>
        <Button label={'Use this photo'} onPress={() => setShowAppOptions(true)}/>
      </View> */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='save' onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label={'Choose a photo'} theme={'primary'} onPress={pickImageAsync} />
          <Button label={'Use this photo'} onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style='light' />
    </GestureHandlerRootView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  containerText: {
    fontSize: 30,
    color: 'lightblue',
    fontWeight: 'bold',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
