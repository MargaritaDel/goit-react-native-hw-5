import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CreatePostsScreen() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isLocationFocus, setIsLocationFocus] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoLocation, setPhotoLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPhotoLocation(coords);
    })();
  }, [photo]);

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      console.log(uri);
      setPhoto(uri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      return asset;
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const sendPhoto = () => {
    navigation.navigate('PostsScreen', { photo, name, location, ...photoLocation });
    setName('');
    setLocation('');
    setPhoto(null);
    setIsShowKeyboard(false);
  };
  const deletePhoto = () => {
    navigation.navigate('PostsScreen');
    setName('');
    setPhotoLocation('');
    setPhoto(null);
        
            
          
  };
  

  // const navigateToCommentsScreen = () => {
  //   navigation.navigate('CommentsScreen');
  // };

  // const navigateToMapScreen = () => {
  //   navigation.navigate('MapScreen', { photoLocation });
  // };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
            {!isShowKeyboard && (
              <View>
                <Camera style={styles.camera} ref={ref => setCamera(ref)}>
                  <Pressable onPress={takePhoto} style={styles.snapContainer}>
                    <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
                  </Pressable>
                </Camera>
                <Text style={styles.text}>Завантажте фото</Text>
              </View>
            )}

            <TextInput
              value={name}
              onChangeText={value => setName(value)}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsNameFocus(true);
              }}
              onBlur={() => setIsNameFocus(false)}
              style={{
                ...styles.input,
                borderBottomColor: isNameFocus ? '#ff6c00' : '#e8e8e8',
                marginTop: 30,
              }}
            />

            <View>
              <Ionicons
                name="ios-location-outline"
                size={24}
                color="#BDBDBD"
                style={{
                  ...styles.locationIcon,
                  color: isLocationFocus ? '#ff6c00' : '#BDBDBD',
                }}
              />
              <TextInput
                value={location}
                onChangeText={value => setLocation(value)}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setIsLocationFocus(true);
                }}
                onBlur={() => setIsLocationFocus(false)}
                style={{
                  ...styles.input,
                  borderBottomColor: isLocationFocus ? '#ff6c00' : '#e8e8e8',
                  marginTop: 30,
                  paddingLeft: 25,
                }}
              />
            </View>

            <Pressable onPress={sendPhoto} style={styles.sendBtn}>
              <Text style={styles.buttonText}>Опубліковати</Text>
            </Pressable>

            <View style={styles.trashIconWrap}>
              <Pressable onPress={deletePhoto}style={styles.trashButton}>
                <FontAwesome5 name="trash-alt" size={24} color="#DADADA" />
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 28,
    backgroundColor: '#fff',
  },
  camera: {
    width: '100%',
    height: 200,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF4D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
    lineHeight: 19,
  },
  input: {
    width: '100%',
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  locationIcon: {
    position: 'absolute',
    bottom: 7,
  },
  sendBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF',
    fontSize: 16,
  },
  trashButton: {
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  trashIconWrap: {
    alignItems: 'center',
    marginTop: 90,
  },
});