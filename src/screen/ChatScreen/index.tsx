import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { color } from '../../assets/color'
import { fontSize } from '../../assets/size'
import Header from '../../component/Header'
import { ChatTemplate } from '../../model/Chat'
import { setCurrentDevice } from '../../redux/action/device'
import { Device, DeviceList, saveDevices } from '../../redux/action/listDevices'
import { RootState } from '../../redux/reducer'
import { mainStyle } from '../mainStyle'
import { styles } from './DeviceScreen.style'


const ChatScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const listDevicesRedux = useSelector((state: RootState) => state.listDevices)
  const listDevices: DeviceList = JSON.parse(JSON.stringify(listDevicesRedux))
  const [listDevice, setListDevice] = useState<DeviceList>(listDevices)
  const [listChat, setListChat] = useState<ChatTemplate[]>([])
  const [chatData, setChatData] = useState<ChatTemplate>()
  const [typeChat, setTypeChat] = useState('BO_DIT')

  useEffect(() => {

  }, [])

  const onPressRequestBoDit = async (type?: string) => {
    const types = type ? type : typeChat
    try {
      const res: any = await axios.get('https://jsonblob.com/api/get/930506708573503488')
      setListChat(res.data)
      const listChatByType = res.data.filter(item => item.type === types)
      console.log('keytest', listChatByType)
      const random = listChatByType[Math.floor(Math.random() * listChatByType.length)];
      console.log('keytest', random)
      setChatData(random)
    }
    catch {
      Alert.alert("Hicccc", "Pong iu ơi hình như hong có mạng hay sao á. Pong iu nt cho gạo bít được hong?")
    }
  }

  const _renderEmptyDevice = () => {
    return (
      <View>
        <Text style={{ fontSize: fontSize.content }}>Gạo nô tài chưa nói gì. Pong iu ra lệnh nhá!</Text>

      </View>
    )
  }

  const _renderChat = () => {
    return (
      <View style={styles.viewChatContainer}>
        <Text style={{ fontSize: fontSize.content }}>{chatData?.content}</Text>
        <Image
          style={styles.image}
          source={{
            uri: chatData?.img_url,
          }} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Chiện zới Gạo robot"
      />
      <View style={styles.mainContainer}>
        <View style={styles.buttonAddContainerRight}>
          <TouchableOpacity
            onPress={() => {
              setTypeChat('BO_DIT')
              onPressRequestBoDit('BO_DIT')
            }}
            style={styles.buttonAdd}>
            <Text style={styles.buttonAddTitle}>Gạo nô tài bợ đít pong coi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTypeChat('KI_NIEM')
              onPressRequestBoDit('KI_NIEM')
            }}
            style={styles.buttonAdd}>
            <Text style={styles.buttonAddTitle}>Gạo nô tài nói về một kỉ niệm gì đó coi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTypeChat('HONG_ZUI')
              onPressRequestBoDit('HONG_ZUI')
            }}
            style={styles.buttonAdd}>
            <Text style={styles.buttonAddTitle}>Gạo iuu, pong đang hong zui</Text>
          </TouchableOpacity>
        </View>
        {chatData ? _renderChat() : _renderEmptyDevice()}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onPressRequestBoDit()}
        >
          <Text style={mainStyle.buttonTitle}>Khum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressRequestBoDit()}
        >
          <Text style={mainStyle.buttonTitle}>Hong chịu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Ỏy', "Em pé chơi thêm nhá!")}
        >
          <Text style={mainStyle.buttonTitle}>Ỏy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Ỏy', "Em pé chơi thêm nhá!")}
        >
          <Text style={mainStyle.buttonTitle}>Ọ ké</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default ChatScreen