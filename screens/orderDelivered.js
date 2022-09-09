import React from "react";
import { styles } from "../stylesheet";
import {
  View,
  Image,
  StatusBar,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
export default function OrderDelivered({ navigation }) {
  var [{ token, fname, customerid, cart, zip, store, account, storeid, product }, dispatch] = useDataLayerValue();
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <View style={styles.container}>
      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content" // Here is where you change the font-color
      />
      {Platform.OS === "ios" ? (
        <View></View>
      ) : (
        <View style={{ marginTop: 33 }}></View>
      )}
      <View style={styles.headerset}>
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/Forks.png")}
          style={styles.image}
        >
          <TouchableOpacity style={{ width: '90%' }} onPress={() => navigation.navigate("FollowYourFilth")}>
            <Image
              style={[styles.backicon, { marginBottom: 20 }]}
              source={require("../assets/BackIcon.png")}
            ></Image>
          </TouchableOpacity>
          <View style={[styles.logoWithText, { width: "100%" }]}>
            <Image
              style={styles.logo}
              source={require("../assets/LogoWhite.png")}
            ></Image>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "MonumentExtended-Regular",

                color: "#ffffff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              signed, sealed, collected 🙌
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Raleway_700Bold",
                marginTop: 14,

                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Your order has been collected! Enjoy your filth.
            </Text>
          </View>
        </ImageBackground>
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "PlpCollection",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Wings",
            });
            navigation.navigate("PlpCollection")
          }}
          style={[styles.paynowT, { width: "90%", marginTop: 40 }]}
        >
          <Text style={styles.payNow}>back to menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.trackYourOrder, { width: "90%" }]}
          onPress={() => {
            dispatch({
              type: actionTypes.SET_ACCOUNT,
              account: false
            });
            navigation.navigate("Account", { screen: 'Accounts' })
          }}
        >
          <Text style={styles.trackYourOrderButton}>Track My Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
