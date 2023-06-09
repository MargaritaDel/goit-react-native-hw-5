import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

const BottomTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Публікації"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: styles.header,
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 83,
          borderTopWidth: 1,
          borderTopColor: '#BDBDBD',
        },
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="#212121CC" />
          ),

          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={{ marginRight: 16 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.plusIcon}>
              <Feather name="plus" size={24} color="#FFFFFF" />
            </View>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("Публікації")}
              style={{ marginLeft: 16 }}
            >
              <AntDesign name="arrowleft" size={24} color="#212121CC" />
            </Pressable>
          ),
           tabBarStyle: { display: "none" },
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
        
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="#212121CC" />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
  },
  plusIcon: { 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FF6C00", 
    width: 70, 
    height: 40,
    borderRadius: 20, 
},
});
