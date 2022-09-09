// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CollectionLocation from "./screens/chooseLocation";
import AddToBasket from "./screens/addTobasket";
import Homescreen from "./screens/home";
import PlpCollection from "./screens/plpCollection";
import Loading from "./screens/loading";
import Signin from "./screens/signin";
import WingCalculator from "./screens/calculator";
import Deliver from "./screens/deliver";
import Signup from "./screens/signup";
import OrderHistory from "./screens/orderHistory";
import FilthyRewards from "./screens/filthyRewards";
import ChooseCollection from "./screens/collectionTime";
import Collections from "./screens/collections";
import CookingYourFilth from "./screens/cookingYourFilth";
import FollowYourFilth from "./screens/followYourFilth";
import YourBasket from "./screens/yourBasket";
import Details from "./screens/details";
import OrderDelivered from "./screens/orderDelivered";
import SuccessUrl from './screens/successUrl'
import CancelUrl from './screens/cancelUrl'
import Accounts from "./screens/accounts";
import OrderDetails from "./screens/orderDetails";
import OrderTracker from "./screens/orderTracker";
import AddToBasket1 from "./screens/addTobasket1";
import search from "./screens/search";
import ScreenA from "./screens/ScreenA";
import ScreenB from "./screens/ScreenB";
import ScreenC from "./screens/ScreenC";
import LinkingScreen from "./screens/LinkingScreen";
// import * as Linking from 'expo-linking';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './Reducer';
import * as Linking from 'expo-linking';
import {

  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light_Italic,
  Raleway_400Regular_Italic,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black_Italic,
} from '@expo-google-fonts/raleway';
import {
  View,
  Image
} from "react-native";
import { useDataLayerValue } from "./DataLayer";

// import { actionTypes } from "../Reducer";
// import Logo1 from "../assets/wingsIcon.svg";
// import Logo2 from "../assets/Union.svg";
// import Logo3 from "../assets/BasketIcon.svg";
// import Logo4 from "../assets/AccountIcon.svg";
// import Logo5 from "../assets/basketIconRed.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import React, { createRef, useEffect, useState } from "react";
// import BottomTabNavigator from "./navigation/tabNavigator";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MainStackNavigator() {
  const [{ token }, dispatch] = useDataLayerValue();
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    animation: 'none'
  };
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="ScreenA" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} /> */}
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Homescreen"
        component={Homescreen}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />


      <Stack.Screen
        name="Calculator"
        component={WingCalculator}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />


      <Stack.Screen
        name="Deliver"
        component={Deliver}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />

      {/* <Stack.Screen
        name="All"
        component={All}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      {token ? (
        <Stack.Screen
          name="ScanQR"
          component={ScanQR}
          options={{
            headerShown: false, animationEnabled: false,
          }}
        />
      ) : null} */}

      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />

      <Stack.Screen
        name="FilthyRewards"
        component={FilthyRewards}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
function ContactStackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="ScreenC" component={ScreenC} />
      <Stack.Screen name="LinkingScreen" component={LinkingScreen} /> */}
      <Stack.Screen
        name="CollectionLocation"
        component={CollectionLocation}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="PlpCollection"
        component={PlpCollection}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="AddToBasket"
        component={AddToBasket}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
const BasketStackNavigator = () => {
  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    animation: 'none'
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="YourBasket"
        component={YourBasket}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="ChooseCollection"
        component={ChooseCollection}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Collections"
        component={Collections}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="CookingYourFilth"
        component={CookingYourFilth}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="OrderDelivered"
        component={OrderDelivered}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="FollowYourFilth"
        component={FollowYourFilth}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="SuccessUrl"
        component={SuccessUrl}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="CancelUrl"
        component={CancelUrl}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const AccountStackNavigator = () => {
  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    animation: 'none'
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Accounts"
        component={Accounts}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />

      <Stack.Screen
        name="OrderTracker"
        component={OrderTracker}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const ContactStackNavigator2 = () => {
  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    animation: 'none'
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="search"
        component={search}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="AddToBasket"
        component={AddToBasket1}
        options={{
          headerShown: false, animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
function MyStack() {
  const [{ token, customerid, zip, storeid, cart }, dispatch] =
    useDataLayerValue();
  const [tokenState, setTokenState] = useState(false);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
        },
        tabBarStyle: {
          backgroundColor: "#121212",
          padding: 12,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#F2C400",
      })}>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarIcon: ({ focused, color }) => (
            // <View>


            <View>
              {focused ? (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/homeIcon1.svg")}
                />
              ) : (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/homeIcon2.svg")}
                />
              )}
            </View>
            // </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Home", { screen: "Homescreen" });
          },
        })}
      ></Tab.Screen>
      <Tab.Screen
        name="Wings"
        component={ContactStackNavigator}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/wingsIcon1.svg")}
                />
              ) : (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/wingsIcon2.svg")}
                />
              )}
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (storeid) {
              navigation.navigate("Wings", { screen: "PlpCollection" });
            }
            else {
              navigation.navigate("Wings", { screen: "CollectionLocation" });
            }
            // if (zip.length > 0 && storeid) {
            //   navigation.navigate("Wings", { screen: "PlpCollection" });
            // } else if (zip.length == 0) {
            //   navigation.navigate("Wings", { screen: "CollectYourFilth" });
            // } else {
            //   navigation.navigate("Wings", { screen: "CollectionLocation" });
            // }
          },
        })}
      />
      <Tab.Screen
        name="Search"
        component={ContactStackNavigator2}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/Union1.svg")}
                />
              ) : (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/Union2.svg")}
                />
              )}
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Search", { screen: "search" });
          },
        })}
      />
      <Tab.Screen
        name="Basket"
        component={BasketStackNavigator}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                cart.length ? (
                  <Image
                    style={{ width: 20, height: 20 }}
                    // style={styles.backIcon}
                    source={require("./assets/basketIconRed1.svg")}
                  />
                ) : (
                  <Image
                    style={{ width: 20, height: 20 }}
                    // style={styles.backIcon}
                    source={require("./assets/BasketIcon1.svg")}
                  />
                )
              ) : cart.length ? (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/basketIconRed2.svg")}
                />
              ) : (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/BasketIcon2.svg")}
                />
              )}
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Basket", { screen: "YourBasket" });
          },
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Account", { screen: "Accounts" });
          },
        })}
        options={{
          headerShown: false,
          animationEnabled: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/AccountIcon1.svg")}
                />
              ) : (
                <Image
                  style={{ width: 20, height: 20 }}
                  // style={styles.backIcon}
                  source={require("./assets/AccountIcon2.svg")}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>

  );
}


export default function App() {
  let [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light_Italic,
    Raleway_400Regular_Italic,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black_Italic,
    "MonumentExtended-Regular": require("./assets/fonts/MonumentExtended-Regular.otf"),
    "MonumentExtended-Ultrabold": require("./assets/fonts/MonumentExtended-Ultrabold.otf")
  });
  const [filteredData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState({});
  const config = {
    screens: {
      Home: {
        screens: {
          Signin: "sign-in",
          Homescreen: "home",
          Loading: "loading",
          Calculator: 'wings-calculator',
          Deliver: 'get-saucy',
          Signup: 'sign-up',
          OrderHistory: 'order-history',
          FilthyRewards: 'filthy-rewards',

        }

      },
      Wings: {
        screens: {
          PlpCollection: 'plp',
          CollectionLocation: "choose-location",
          AddToBasket: 'add-to-basket'
        }
      },
      Basket: {
        screens: {
          YourBasket: 'your-basket',
          ChooseCollection: "collection-time",
          Details: 'order-details',
          Collections: 'payment',
          CookingYourFilth: 'cooking-your-filth',
          OrderDelivered: 'order-delivered',
          FollowYourFilth: 'order-tracker',
          SuccessUrl: 'success',
          CancelUrl: 'cancel'
        }
      },
      Account: {
        screens: {
          Accounts: 'accounts',
          OrderDetails: "each-order-details",
          OrderTracker: 'each-order-tracker'
        }
      },
      Search: {
        screens: {
          search: 'search',
          AddToBasket: "product-details"
        }
      },

    },
  };
  // const config = {
  //   screens: {
  //     Home: {
  //       screens: {
  //         Signin: "e",
  //         Homescreen: "a",
  //         Loading: "d",
  //         Calculator: 'f',
  //         Deliver: 'g',
  //         Signup: 'h',
  //         OrderHistory: 'i',
  //         FilthyRewards: 'j',

  //       }

  //     },
  //     Wings: {
  //       screens: {
  //         PlpCollection: 'b',
  //         CollectionLocation: "c",
  //         AddToBasket: 'k'
  //       }
  //     },
  //     Basket: {
  //       screens: {
  //         YourBasket: 'l',
  //         ChooseCollection: "m",
  //         Details: 'n',
  //         Collections: 'o',
  //         CookingYourFilth: 'p',
  //         OrderDelivered: 'q',
  //         FollowYourFilth: 'r',
  //         SuccessUrl: 's',
  //         CancelUrl: 't'
  //       }
  //     },
  //     Account: {
  //       screens: {
  //         Accounts: 'u',
  //         OrderDetails: "v",
  //         OrderTracker: 'w'
  //       }
  //     },
  //     Search: {
  //       screens: {
  //         search: 'x',
  //         AddToBasket: "y"
  //       }
  //     },

  //   },
  // };

  const prefix = Linking.createURL('myapp://app');
  const universal = Linking.createURL('https://app.example.com');

  return (
    <DataLayer reducer={reducer} initialState={initialState}>
      <NavigationContainer
        linking={{
          prefixes: [universal],
          config
        }}
      >
        <MyStack style={{ backgroundColor: "yellow" }} />
      </NavigationContainer >
    </DataLayer>
  );
}