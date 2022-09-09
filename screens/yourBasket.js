import React, { useEffect, useState } from "react";
import { styles } from "../stylesheet";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import Alert from "../Components/alert";
import OrderBillInfo from "../Components/orderBillInfo";
import OrderBasket from "../Components/orderBasket";
import { TOKEN } from "./ids&tokens";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function YourBasket({ navigation }) {
  var [
    {
      product,
      cart,
      zip,
      storeid,
      timelist,
      overallprice,
      totalprice,
      discount,
      filthyRewardsCoins,
      tab,
      screen,
      alert,
      addBaskets,
      prize,
      token
    },
    dispatch,
  ] = useDataLayerValue();
  if (cart == null) {
    cart = [];
  }
  const [onChange, setOnChange] = useState(false);
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(false);
  const [quantity, setQuantity] = useState(false);

  let subtot = 0.0;
  cart.map((element) => {
    let price = element.productPrize
    subtot = subtot + element.quantity * parseFloat(price)
    if (element.productTotal != undefined) {
      element.productTotal.map((ele) => {
        let subprice = ele.addsOnPrize
        subtot = subtot + element.quantity * parseFloat(subprice)
      })
    }
    // element.productTotal.map((ele) => {
    //   let subprice = ele.addsOnPrize
    //   subtot = subtot + parseFloat(subprice)
    // })
    // subtot = subtot + element.quantity * parseFloat(prize);
  },);

  useEffect(() => {
    discount = parseFloat(discount);
    dispatch({
      type: actionTypes.SET_DISCOUNT,
      discount: discount,
    });
    dispatch({
      type: actionTypes.SET_TOTALPRICE,
      totalprice: totalprice,
    });
    filthyRewardsCoins = parseFloat(filthyRewardsCoins);
    dispatch({
      type: actionTypes.SET_FILTHYREWARDSCOINS,
      filthyRewardsCoins: filthyRewardsCoins,
    });

    dispatch({
      type: actionTypes.SET_TOTALPRICE,
      totalprice: subtot,
    });
    overallprice = subtot - discount;
    dispatch({
      type: actionTypes.SET_OVERALLPRICE,
      overallprice: overallprice,
    });
    let newList = [...list];
    cart.map((item, index) => {
      newList[index] = item.quantity;
    });
    setList(newList);
  }, [cart]);
  useEffect(() => {
    if (onChange) {
      AsyncStorage.getItem("cart").then((item) => {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      });
      setOnChange(false);
    }
  }, [onChange]);
  function checkout() {
    if (zip.length == 0 || zip == null) {
      setCheck(true);
    } else {
      setCheck(false);
      for (let i = 0; i < cart.length; i++) {
        cart[i].quantity = list[i];
      }
      dispatch({
        type: actionTypes.SET_CART,
        cart: cart,
      });
      dispatch({
        type: actionTypes.SET_SCREEN,
        screen: "YourBasket",
      });
      dispatch({
        type: actionTypes.SET_TAB,
        tab: "Basket",
      });
      navigation.navigate("ChooseCollection");
    }
  }
  function manageQuantityminus(eachBasket, index) {
    let cartdelete = cart[index];
    let qua = cart[index].quantity;
    cart[index].quantity = qua - 1;
    if (cart[index].quantity <= 0) {
      const newCart = cart.filter((ele) => {
        return ele != cartdelete;
        // });
      });
      AsyncStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      AsyncStorage.setItem("cart", JSON.stringify(cart));
    }
    setOnChange(true);
  }
  function manageQuantityplus(eachBasket, index) {
    let qua = cart[index].quantity;
    cart[index].quantity = qua + 1;
    AsyncStorage.setItem("cart", JSON.stringify(cart));
    setOnChange(true);
  }

  async function selectProduct(eachBasket) {
    dispatch({
      type: actionTypes.SET_PRODUCT,
      product: eachBasket,
    });
    dispatch({
      type: actionTypes.SET_ADDBASKET,
      addBaskets: false,
    });
    AsyncStorage.setItem("selectedProduct", JSON.stringify(eachBasket));
    AsyncStorage.getItem("selectedProduct").then((item) => {

      dispatch({
        type: actionTypes.SET_SCREEN,
        screen: "YourBasket",
      });
      dispatch({
        type: actionTypes.SET_TAB,
        tab: "Basket",
      });
      navigation.navigate("Wings", { screen: "AddToBasket" });
    });
  }
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <ScrollView bounces={false} style={[styles.container]}>
      {token ?
        <View>
          <MyStatusBar
            backgroundColor="black"
            barStyle="light-content" // Here is where you change the font-color
          />
          {Platform.OS === "ios" ? (
            <View></View>
          ) : (
            <View style={{ marginTop: 33 }}></View>
          )}
          {!cart.length ? (
            <View>
              {/* <View style={{ marginTop: 30 }}></View> */}
              {alert ? <Alert navigation={navigation} tab1={"Basket"} screen1={"YourBasket"} /> : <View></View>}
              <TouchableOpacity
                onPress={() => {
                  if (tab == "Basket" && screen == "YourBasket") {
                    dispatch({
                      type: actionTypes.SET_SCREEN,
                      screen: "AddToBasket",
                    });
                    dispatch({
                      type: actionTypes.SET_TAB,
                      tab: "Wings",
                    });

                    navigation.navigate("Wings", { screen: "AddToBasket" });
                  } else {
                    navigation.navigate(tab, { screen: screen });
                  }
                }}
              >
                <Image
                  style={[styles.backicon, { marginTop: 15, marginLeft: 15 }]}
                  source={require("../assets/BackIcon.png")}
                ></Image>
              </TouchableOpacity>
              <View style={styles.orderInfosSet}>
                <Text style={styles.heading1}>your basket</Text>
                <Text
                  style={{
                    fontFamily: "Raleway_600SemiBold",
                    color: "#ffffff",
                    fontSize: 12,
                  }}
                >
                  Looks like there’s no items in your basket... yet.
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Home", { screen: "Deliver" })}
                  style={[styles.paynowT, { marginTop: 25 }]}
                >
                  <Text style={styles.payNow}>Browse menu</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              {/* <View style={{ marginTop: 30 }}></View> */}
              {alert ? <Alert navigation={navigation} tab1={"Basket"} screen1={"YourBasket"} /> : <View></View>}
              <TouchableOpacity
                onPress={() => {
                  if (tab == "Basket" && screen == "YourBasket") {
                    dispatch({
                      type: actionTypes.SET_SCREEN,
                      screen: "AddToBasket",
                    });
                    dispatch({
                      type: actionTypes.SET_TAB,
                      tab: "Wings",
                    });

                    navigation.navigate("Wings", { screen: "AddToBasket" });
                  } else {
                    navigation.navigate(tab, { screen: screen });
                  }
                }}
              >
                <Image
                  style={[styles.backicon, { marginTop: 15, marginLeft: 15 }]}
                  source={require("../assets/BackIcon.png")}
                ></Image>
              </TouchableOpacity>
              <View style={styles.orderInfosSet}>
                <Text style={styles.heading1}>your basket</Text>
                {cart.map((eachBasket, index) => {
                  return (
                    <View key={index} style={{
                      alignItems: "center", borderColor: "rgba(130, 130, 130, 0.1)",
                      borderWidth: 3,
                    }}>
                      <View style={{ width: '100%' }}>
                        <View style={{

                          padding: 15,
                          justifyContent: "space-between",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "row",
                          width: "100%"
                        }}>
                          <View style={{ width: "34%" }}>
                            {eachBasket.imageurl === undefined ?
                              <Image
                                source={require("../assets/foodpackage.png")}
                                style={styles.foodWithPackage}
                              ></Image>
                              :
                              <Image
                                style={{ width: "80%", height: 75 }}
                                source={{ uri: eachBasket.imageurl }}
                              />
                            }
                          </View>
                          <View style={{ width: "66%" }}>
                            <Text style={styles.orderInfoText6}>
                              The {eachBasket.productName} -{" "}
                              {eachBasket.productCategory} chicken 😈
                            </Text>
                            <View style={styles.setWithSpace}>
                              <View>
                                <Text style={[styles.orderInfoText2, styles.gap2]}>
                                  £{eachBasket.productPrize}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (zip.length == 0 || zip == null) {
                                      setCheck(true);
                                    } else {
                                      setCheck(false);
                                      selectProduct(eachBasket);
                                    }
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.orderInfoText3,
                                      styles.gap1,
                                      styles.other1,
                                    ]}
                                  >
                                    Edit Item
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View style={styles.flexrow2}>
                                <TouchableOpacity
                                  onPress={() =>
                                    manageQuantityminus(eachBasket, index)
                                  }
                                >
                                  <Image
                                    style={[styles.incdec, styles.gap3]}
                                    source={require("../assets/minus.png")}
                                  ></Image>
                                </TouchableOpacity>
                                <Text style={[styles.noOfOrders, styles.gap5]}>
                                  {eachBasket.quantity}
                                </Text>
                                <TouchableOpacity
                                  onPress={() =>
                                    manageQuantityplus(eachBasket, index)
                                  }
                                >
                                  <Image
                                    style={[styles.incdec, , styles.gap4]}
                                    source={require("../assets/plus.png")}
                                  ></Image>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>

                        </View>
                        {eachBasket.productTotal === undefined ? <View></View> :
                          eachBasket.productTotal.map((ele, index) => {
                            return (
                              <View style={{
                                paddingLeft: 10, paddingRight: 10, width: '100%', flexDirection: 'row', alignItems: 'space-between'
                                , justifyContent: 'space-between'
                              }} >
                                <Text style={{
                                  color: "#ffffff",
                                  fontFamily: "MonumentExtended-Regular",
                                  fontSize: 10,
                                  width: '75%'
                                }}>{ele.productVariantName}</Text>
                                <View style={{ width: '5%' }}></View>
                                <Text></Text>
                                <Text style={{
                                  color: "#ffffff",
                                  fontFamily: "MonumentExtended-Regular",
                                  fontSize: 8,
                                  width: '15%'
                                }}>+£{ele.addsOnPrize}</Text></View>
                            )
                          })}
                        <View style={{ marginBottom: 13 }}></View>
                      </View>
                    </View>
                  );
                })}
                <OrderBillInfo />
                <TouchableOpacity
                  onPress={() => checkout()}
                  style={[styles.paynowT]}
                >
                  <Text style={styles.payNow}>checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View> :
        <View style={{ color: 'white', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              marginBottom: 20,
              fontFamily: "Raleway_600SemiBold",
              // textDecorationLine: "underline",
            }}
          >
            You are not login or checkout as a guest
          </Text>
          <TouchableOpacity onPress={() => {
            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "YourBasket",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Basket",
            });
            navigation.navigate("Home", { screen: "Signin" })
          }
          }>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "Raleway_600SemiBold",
                textDecorationLine: "underline",
              }}
            >
              Want to signin or checkout as guest?
            </Text>
          </TouchableOpacity>
        </View>}
    </ScrollView>
  );
}
