import { styles } from "../stylesheet";
// import StripeCheckout from 'react-native-stripe-checkout-webview';
// import { Elements } from "@stripe/react-stripe-js"
// import { loadStripe } from "@stripe/stripe-js"
import React, { useState, useEffect } from "react";
import YourOrder from "../Components/yourOrder";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import { TOKEN, URL, PUBLISHABLE_KEY, MERCHANT_NAME } from "./ids&tokens";
import { Button, TextInput } from "react-native-paper";
// import { StripeProvider } from "@stripe/stripe-react-native";
// import { useStripe } from "@stripe/stripe-react-native";
import Aalert from "../Components/alert";
import OrderBillInfo from "../Components/orderBillInfo";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import CollectionLocation from "./chooseLocation";
const Collections = ({ navigation, route, userJourney }) => {
  var [
    {
      updatedaddress,
      storeAddress,
      clientSecret,
      ephemeralKey,
      stripecustomerid,
      cart,
      fixTime,
      cartid,
      totalprice,
      overallprice,
      discount,
      filthyRewardsCoins,
      saveorder,
      screen,
      tab,
      editTime,
      alert,
      tab,
      screen
    },
    dispatch,
  ] = useDataLayerValue();
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [check, setCheck] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [yourOrder, setYourOrder] = React.useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [change, setChange] = useState(false);
  const [change1, setChange1] = useState(false);
  const [delivering, setDelivering] = React.useState(true);
  const [emptyCart1, setEmptyCart1] = useState(false);
  const [emptyCart2, setEmptyCart2] = useState(false);
  useEffect(() => {
    if (emptyCart2) {
      AsyncStorage.getItem("cart").then((item) => {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      });
      setEmptyCart2(false);
      dispatch({
        type: actionTypes.SET_SCREEN,
        screen: "Collections",
      });
      dispatch({
        type: actionTypes.SET_TAB,
        tab: "Basket",
      });
      navigation.navigate("Wings", { screen: "CollectionLocation" });
    }
  }, [emptyCart2]);
  useEffect(() => {
    if (emptyCart) {
      AsyncStorage.getItem("cart").then((item) => {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      });
      setEmptyCart(false);
      navigation.navigate("CookingYourFilth");
    }
  }, [emptyCart]);
  useEffect(() => {
    if (emptyCart1) {
      AsyncStorage.getItem("cart").then((item) => {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      });
      setEmptyCart1(false);

    }
  }, [emptyCart1]);
  function removediscountcode() {
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        mutation removeDiscount($cartId: ID!) {
          cart: removeDiscount(cartId: $cartId) {
            id
          }
        } 
            `,
        variables: {
          cartId: `${cartid}`,
        },
      }),
    })
      .then((response) => {
        response
          .json()
          .then((res) => {
            let totaldiscount = 0.0;
            dispatch({
              type: actionTypes.SET_DISCOUNT,
              discount: totaldiscount,
            });
            dispatch({
              type: actionTypes.SET_OVERALLPRICE,
              overallprice: totalprice,
            });
            dispatch({
              type: actionTypes.SET_TOTALPRICE,
              totalprice: totalprice,
            });


            setChange(false);
            setEdit(false);
          })
          .catch((err) => {

            console.log("error in getting msgs ", err);
          });
      })
      .catch((err) => {
        console.log("error in getting msgs ", err);
      });
  }
  function discountcode() {
    setCheck(false);
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query: `
            mutation applyDiscount($cartId: ID!, $discountCode: String) {
              discount: applyDiscount(cartId: $cartId, discountCode: $discountCode) {
                discountCode
                totalDiscount
                discountId
                value
                target
                trigger
                type
              }
            }
            
            
            `,
        variables: {
          discountCode: `${promoCode}`,
          cartId: `${cartid}`,
        },
      }),
    })
      .then((response) => {
        response
          .json()
          .then((res) => {
            let totaldiscount = res.data.discount.totalDiscount;
            totaldiscount = parseFloat(totaldiscount);
            dispatch({
              type: actionTypes.SET_DISCOUNT,
              discount: totaldiscount,
            });
            dispatch({
              type: actionTypes.SET_TOTALPRICE,
              totalprice: totalprice,
            });

            overallprice = totalprice - totaldiscount - filthyRewardsCoins;
            dispatch({
              type: actionTypes.SET_OVERALLPRICE,
              overallprice: overallprice,
            });
            setEdit(true);
          })
          .catch((err) => {
            setCheck(true);
            console.log("error in getting msgs ", err);
          });
      })
      .catch((err) => {
        console.log("error in getting msgs ", err);
      });
  }
  async function payment() {
    let price = totalprice - discount - filthyRewardsCoins
    price = price.toFixed(2)
    // if (price == 0) {
    //   dispatch({
    //     type: actionTypes.SET_SAVEORDER,
    //     saveorder: cart,
    //   });
    //   AsyncStorage.setItem("cartprod", JSON.stringify([]));
    //   setEmptyCart(true);
    // }
    // else {

    console.log("Hello", price)

    if (price != 0) {
      // const initSheetResponse = await initPaymentSheet({
      //   customerId: stripecustomerid,
      //   customerEphemeralKeySecret: ephemeralKey,
      //   paymentIntentClientSecret: clientSecret,
      //   merchantDisplayName: MERCHANT_NAME,
      //   testEnv: true,
      //   allowsDelayedPaymentMethods: true,
      //   applePay: true,
      //   merchantCountryCode: 'US'
      // });

      // const sheetResponse = await presentPaymentSheet();
      // console.log(sheetResponse)
      // if (sheetResponse.hasOwnProperty("error")) {
      //   console.log("Hello1")
      //   // dispatch({
      //   //   type: actionTypes.SET_SAVEORDER,
      //   //   saveorder: cart,
      //   // });
      //   // AsyncStorage.setItem("cart", JSON.stringify([]));
      //   // setEmptyCart(true);
      //   // Alert.alert("PaymentSheet cannot set up a PaymentIntent in status");
      // } else {
      dispatch({
        type: actionTypes.SET_SAVEORDER,
        saveorder: cart,
      });
      AsyncStorage.setItem("cart", JSON.stringify([]));
      setEmptyCart(true);
      // }
    } else {
      dispatch({
        type: actionTypes.SET_SAVEORDER,
        saveorder: cart,
      });
      AsyncStorage.setItem("cart", JSON.stringify([]));
      setEmptyCart(true);
    }

    // }

  }
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <ScrollView bounces={false} style={styles.container}>
      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content" // Here is where you change the font-color
      />
      {Platform.OS === "ios" ? (
        <View></View>
      ) : (
        <View style={{ marginTop: 33 }}></View>
      )}

      {/* <View style={{ marginTop: 30 }}></View> */}

      {alert && <Aalert navigation={navigation} tab1={"Basket"} screen1={"Collections"} />}
      <View style={styles.orderInfosSet}>
        <TouchableOpacity onPress={() => {

          if (tab == "Basket" && screen == "Collections") {
            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "Details",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Basket",
            });
            navigation.navigate("Details", {})
          }
          else {
            navigation.navigate(tab, { screen: screen })
          }
        }}>
          <Image
            style={styles.backicon}
            source={require("../assets/BackIcon.png")}
          ></Image>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.infoSet1, { width: "100%" }]}
            onPress={() => {
              setYourOrder(!yourOrder);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {yourOrder ? (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/chevron-arrow-down.png")}
                ></Image>
              ) : (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/right-chevron.png")}
                ></Image>
              )}
              <Text style={styles.orderInfoHeader}>your order</Text>
            </View>
            {yourOrder ? <YourOrder /> : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.infoSet2, { width: "100%" }]}
            onPress={() => {
              setDelivering(!delivering);
            }}
          >
            <View style={styles.flexrow2}>
              {delivering ? (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/chevron-arrow-down.png")}
                ></Image>
              ) : (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/right-chevron.png")}
                ></Image>
              )}
              <Text style={styles.orderInfoHeader}>Collection details</Text>
            </View>
            {delivering ? (
              <View style={styles.gap1}>
                <View style={styles.flexrow1}>
                  <Text style={{
                    color: "#828282",
                    fontFamily: "Raleway_700Bold",
                    fontSize: 12,
                  }}>
                    Collection Time - {fixTime}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: actionTypes.SET_SCREEN,
                        screen: "Collections",
                      });
                      dispatch({
                        type: actionTypes.SET_TAB,
                        tab: "Basket",
                      });
                      dispatch({
                        type: actionTypes.SET_EDITTIME,
                        editTime: true,
                      });
                      navigation.navigate("Basket", {
                        screen: "ChooseCollection",
                      });
                    }}
                  >
                    <Text style={{
                      color: "#828282",
                      fontFamily: "Raleway_700Bold",
                      fontSize: 10,
                      textDecorationLine: "underline",
                    }}>Edit Time</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.flexrow1, { width: "100%" }]}>
                  <View style={{ flexDirection: "column", width: '43%' }}>
                    {storeAddress.line_1 ?
                      <Text style={[{
                        color: "#828282",
                        fontFamily: "Raleway_700Bold",
                        fontSize: 12,
                      }]}>
                        {storeAddress.line_1},
                      </Text>
                      : <View></View>}
                    {storeAddress.line_2 ?
                      <Text style={[{
                        color: "#828282",
                        fontFamily: "Raleway_700Bold",
                        fontSize: 12,
                      }]}>
                        {storeAddress.line_2},
                      </Text>
                      : <View></View>}
                    {storeAddress.city ?
                      <Text style={[{
                        color: "#828282",
                        fontFamily: "Raleway_700Bold",
                        fontSize: 12,
                      }]}>
                        {storeAddress.city},
                      </Text>
                      : <View></View>}
                    {storeAddress.zip ?
                      <Text style={[{
                        color: "#828282",
                        fontFamily: "Raleway_700Bold",
                        fontSize: 12,
                      }]}>
                        {storeAddress.zip}
                      </Text>
                      : <View></View>}
                  </View>
                  <View style={{ width: "25%" }}></View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: actionTypes.SET_CARTID,
                        cartid: "",
                      });

                      AsyncStorage.setItem("cart", JSON.stringify([]));
                      setEmptyCart2(true);
                    }}
                    style={{ width: "32%", flexDirection: "row-reverse" }}
                  >
                    <Text style={{
                      color: "#828282",
                      fontFamily: "Raleway_700Bold",
                      fontSize: 10,
                      textDecorationLine: "underline",
                    }}>Edit Location</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
        {check && (
          <Text
            style={{
              color: "red",
              fontFamily: "Raleway_500Medium",
              fontSize: 12,
              width: "50%",
            }}
          >
            Invalid Promo Code
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setChange(!change)}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {change ? (
            <Text
              style={{
                color: "#FFFFFF",
                textTransform: "capitalize",
                fontFamily: "Raleway_700Bold",
                fontSize: 20,
              }}
            >
              -
            </Text>
          ) : (
            <Text
              style={{
                color: "#FFFFFF",
                textTransform: "capitalize",
                fontFamily: "Raleway_700Bold",
                fontSize: 20,
              }}
            >
              +
            </Text>
          )}
          <Text
            style={[
              styles.orderInfoText3,
              { textDecorationLine: "underline" },
            ]}
          >
            Add Promo Code
          </Text>
        </TouchableOpacity>

        {change && (
          <View>
            <TextInput
              editable={!edit}
              onChangeText={(value) => setPromoCode(value)}
              outlineColor="rgba(155, 155, 155, 0.2)"
              activeOutlineColor="rgba(242, 196, 0, 0.21)"
              mode="outlined"
              placeholder="e.g E6FDW3"
              placeholderTextColor="#fff"
              style={{
                width: "100%",
                backgroundColor: "rgba(130, 130, 130, 0.09)",
                fontSize: 14,
              }}
              theme={{
                colors: {
                  text: "#fff",
                },
              }}
              value={promoCode}
            />
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <TouchableOpacity
                disabled={edit}
                onPress={() => {
                  discountcode();
                }}
                style={{ width: "45 %" }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 12,
                    color: "#121212",
                    textTransform: "uppercase",
                    fontFamily: "MonumentExtended-Regular",
                    backgroundColor: "#F2C400",
                    padding: 6,
                    width: "100 %",
                  }}
                >
                  Apply
                </Text>
              </TouchableOpacity>
              <View style={{ width: "10%" }}></View>
              <TouchableOpacity
                onPress={() => {
                  removediscountcode();
                }}
                style={{ width: "45 %" }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 12,
                    color: "#121212",
                    textTransform: "uppercase",
                    fontFamily: "MonumentExtended-Regular",
                    backgroundColor: "#ffffff",
                    padding: 6,
                    width: "100 %",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() => setChange1(!change1)}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {change1 ? (
            <Text
              style={{
                color: "#FFFFFF",
                textTransform: "capitalize",
                fontFamily: "Raleway_700Bold",
                fontSize: 20,
              }}
            >
              -
            </Text>
          ) : (
            <Text
              style={{
                color: "#FFFFFF",
                textTransform: "capitalize",
                fontFamily: "Raleway_700Bold",
                fontSize: 20,
              }}
            >
              +
            </Text>
          )}
          <Text
            style={[
              styles.orderInfoText3,
              { textDecorationLine: "underline" },
            ]}
          >
            Redeem rewards
          </Text>
        </TouchableOpacity>
        {change1 && (
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "Collections",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Basket",
              });
              navigation.navigate("Home", { screen: "FilthyRewards" });
            }}
            style={{ width: "100%" }}
          >
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 12,
                color: "#121212",
                textTransform: "uppercase",
                fontFamily: "MonumentExtended-Regular",
                backgroundColor: "#F2C400",
                padding: 6,
                width: "100 %",
              }}
            >
              Redeem
            </Text>
          </TouchableOpacity>
        )}
        <OrderBillInfo />
        <TouchableOpacity
          onPress={() => {
            payment();
          }}
          style={styles.paynowT}
        >
          <Text style={styles.payNow}>Pay now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Collections;
