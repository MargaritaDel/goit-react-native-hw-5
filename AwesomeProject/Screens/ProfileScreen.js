import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/Photo_BG.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.avatar}>
          <Image
            source={require("../images/userPhoto2.png")}
    
          />
          <Pressable style={styles.avatarButton}>
          <AntDesign name="pluscircleo" size={24} color="#E8E8E8" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={styles.logOutButton}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
        <Text style={styles.userName}>Natali Romanova</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
  },
  backgroundImage: {
    position: "absolute",
    width: 411,
    zIndex: -1,
  },
  avatar: {
        position: "absolute",
    left: 147,
    top: -61,
  },
  avatarButton: {
    position: "absolute",
    right: -12,
    bottom: 10,
    backgroundColor: '#FFFFFF',
borderRadius: 50,
  },

  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 43,
  },
  contentWrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  logOutButton: {
    marginLeft: "auto",
    marginTop: 22,
  },
});
