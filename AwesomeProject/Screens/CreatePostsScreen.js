import * as Location from "expo-location";
import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
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
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function CreatePostsScreen() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isLocationFocus, setIsLocationFocus] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const cameraRef = useRef(null);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setCameraPermission(cameraStatus === "granted");

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(locationStatus === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.capturedImage} />
      ) : (
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
              {!isShowKeyboard && (
                <View>
                  <View style={styles.imageBackground}>
                    <View style={styles.photoIconWrap}>
                      <MaterialIcons
                        name="photo-camera"
                        size={24}
                        color="#BDBDBD"
                      />
                    </View>
                  </View>
                  {cameraPermission && (
                    <Camera
                      style={styles.camera}
                      ref={cameraRef}
                      type={Camera.Constants.Type.back}
                    />
                  )}
                  <Text style={styles.text}>Загрузите фото</Text>
                </View>
              )}

              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                placeholder="Название..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setIsNameFocus(true);
                }}
                onBlur={() => setIsNameFocus(false)}
                style={{
                  ...styles.input,
                  borderBottomColor: isNameFocus ? "#ff6c00" : "#e8e8e8",
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
                    color: isLocationFocus ? "#ff6c00" : "#BDBDBD",
                  }}
                />
                <TextInput
                  value={location}
                  onChangeText={(value) => setLocation(value)}
                  placeholder="Местоположение..."
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsLocationFocus(true);
                  }}
                  onBlur={() => setIsLocationFocus(false)}
                  style={{
                    ...styles.input,
                    borderBottomColor: isLocationFocus ? "#ff6c00" : "#e8e8e8",
                    marginTop: 30,
                    paddingLeft: 25,
                  }}
                />
              </View>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Опубликовать</Text>
              </Pressable>
              <View style={styles.trashIconWrap}>
                <Pressable style={styles.captureButton} onPress={takePicture}>
                  <Text style={styles.captureButtonText}>Capture</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 28,
    backgroundColor: "#fff",
  },
  imageBackground: {
    width: "100%",
    height: 200,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photoIconWrap: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    lineHeight: 19,
  },
  input: {
    width: "100%",
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    position: "absolute",
    bottom: 7,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
  },
  trashIconWrap: {
    alignItems: "center",
    marginTop: 90,
  },
  captureButton: {
    width: 100,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
