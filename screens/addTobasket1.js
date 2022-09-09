import React, { useState, useCallback, useEffect } from "react";
import { styles } from "../stylesheet";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
var tempCart;

export default function AddToBasket1({ navigation, route }) {
  const [addsBasket, setAddsBasket] = useState(false);
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(false)
  let lastindex;
  const [{ product, cart, lists, zipData, storeid }, dispatch] = useDataLayerValue();
  const [cartChange, setCartChange] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrize, setProductPrize] = useState("");
  const [loader, setLoader] = useState(false);
  const [disabledw, setDisabledw] = useState(false);
  const [noadd, setNoAdd] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  const [isProductUpdated, setIsProductUpdated] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!isProductUpdated) {
        AsyncStorage.getItem("selectedProduct").then((item) => {
          if (item) {

            setProductToShow(JSON.parse(item));
          }
          else {
            setProductToShow(product);
          }
        });
        setIsProductUpdated(true);

      }
    }, [])
  );

  useEffect(() => {

    if (productToShow) {
      setProductId(productToShow.productId);
      setProductName(productToShow.productName);
      setProductCategory(productToShow.productCategory);
      setProductDescription(productToShow.productDescription);
      setProductPrize(productToShow.productPrize);
    }


  }, [cartChange, productToShow]);



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
      <ImageBackground
        source={productToShow.imageurl === undefined ? (require("../assets/bigfoodpackage.png")) : ({ uri: productToShow.imageurl })}
        style={styles.image1}
        resizeMode="contain"
      >
        <TouchableOpacity onPress={() => {
          if (storeid) {
            setCheck(false)

            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "PlpCollection",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Wings",
            });
            navigation.navigate("Wings", { screen: "PlpCollection" })
          }
          else {
            setCheck(true)
          }

        }}>
          <Image
            style={[styles.backicon, { marginTop: 20, marginLeft: 15 }]}
            source={require("../assets/BackIcon.png")}
          ></Image>
        </TouchableOpacity>
      </ImageBackground>

      <View style={{ padding: 20, marginTop: 9 }}>
        {check && (
          <Text style={{ color: "red" }}>Storeid is not there</Text>
        )}
        <Text style={styles.trackYourOrderButton}>
          the {productName} - {productCategory} 😈
        </Text>
        <Text style={[styles.orderInfoText5, styles.gap6]}>
          {productDescription}
        </Text>
        <Text style={[styles.orderpay, styles.gap6]}>£{productPrize}</Text>

        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "AddToBasket",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Search",
            });
            navigation.navigate("Home", { screen: "Deliver" })
          }}
          style={[styles.paynowT, styles.gap7]}
        >
          <Text style={{
            textAlign: "center",
            fontSize: 12,
            color: "#121212",
            textTransform: "uppercase",
            fontFamily: "MonumentExtended-Regular",
            backgroundColor: "#F2C400",
            padding: 10,
            width: "100 %",
          }}>Please select a Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
