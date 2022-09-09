import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "../stylesheet";
import { useDataLayerValue } from "../DataLayer";
import AlertImage from "../assets/InfoSmall.svg";
import { actionTypes } from "../Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Alert({ navigation, tab1, screen1 }) {
  const [{ alert, city, tab, screen, cartid, cart }, dispatch] = useDataLayerValue();
  const [emptyCart, setEmptyCart] = useState(false)
  useEffect(() => {
    if (emptyCart) {
      AsyncStorage.getItem("cart").then((item) => {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      });
      setEmptyCart(false);
      navigation.navigate("Wings", { screen: "CollectionLocation" });
    }
  }, [emptyCart]);
  return (
    <View style={styles.alert}>
      <View style={styles.flexrow2}>
        <Image source={require("../assets/InfoSmall.svg")} style={styles.alertImage}></Image>
        {/* <AlertImage></AlertImage> */}
        <Text style={styles.alertText}>
          {alert} {city}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: actionTypes.SET_SCREEN,
            screen: screen1,
          });
          dispatch({
            type: actionTypes.SET_TAB,
            tab: tab1,
          });
          dispatch({
            type: actionTypes.SET_CARTID,
            cartid: "",
          });

          AsyncStorage.setItem("cart", JSON.stringify([]));
          setEmptyCart(true);
        }}
      >
        <Text style={styles.alertLink}>Change</Text>
      </TouchableOpacity>
    </View>
  );
}
