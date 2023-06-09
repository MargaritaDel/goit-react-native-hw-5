import { useFonts } from "expo-font";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import CommentsScreen from './Screens/CommentsScreen';
import MapScreen from './Screens/MapScreen';
import PostsScreen from "./Screens/PostsScreen";

const MainStack  = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
           <MainStack.Screen
          options={{ title: 'Comments', headerTitleAlign: 'center' }}
          name="CommentsScreen"
          component={CommentsScreen}
        />
              <MainStack.Screen name="PostsScreen" component={PostsScreen} />
        <MainStack.Screen
          options={{ title: 'Map', headerTitleAlign: 'center' }}
          name="MapScreen"
          component={MapScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
