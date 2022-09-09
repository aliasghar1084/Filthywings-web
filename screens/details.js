import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Platform,
  Linking
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { styles } from "../stylesheet";
import { TOKEN, MERCHANT_ID, URL } from "./ids&tokens";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import OrderBillInfo from "../Components/orderBillInfo";
import Aalert from "../Components/alert";
// import { StripeProvider } from "@stripe/stripe-react-native";
// import { useStripe } from "@stripe/stripe-react-native";
import { FirstName } from "../Components/contxtApi";
export default function Details({ navigation }) {
  const [
    {
      storeAddress,
      fulfilmentType,
      fulfilmentDate,
      fixTime,
      ordritms,
      cartid,
      fname,
      lname,
      email,
      customerid,
      updatedaddress,
      clientSecret,
      ephemeralKey,
      stripecustomerid,
      storeid,
      alert,
      phoneno,
      tab,
      screen,
      totalprice,
      discount, filthyRewardsCoins
    },
    dispatch,
  ] = useDataLayerValue();
  const [loader, setLoader] = useState(false);
  const [AddressLine1, setAddressLine1] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [phoneNo, setPhoneNo] = useState(phoneno)
  const [city, setCity] = useState("");
  const [postcode, setPostCode] = useState("");
  const [firstName, setFirstName] = useState(fname);
  const [lastName, setLastName] = useState(lname);
  const [emailDetails, setEmailDetails] = useState(email);
  const [firstNameCheck, setFirstNameCheck] = useState(false);
  const [lastNameCheck, setLastNameCheck] = useState(false);
  const [phoneNoCheck, setPhoneNoCheck] = useState(false);
  const [email1Check, setEmail1Check] = useState(false);
  const [email2Check, setEmail2Check] = useState(false);
  const [AddressLine1Check, setAddressLine1Check] = useState(false);
  const [AddressLine2Check, setAddressLine2Check] = useState(false);
  const [cityCheck, setCityCheck] = useState(false);
  const [postcodeCheck, setPostCodeCheck] = useState(false);

  async function details() {
    let cusid = customerid ? customerid : null;
    setPostCodeCheck(false);
    setAddressLine1Check(false);
    setAddressLine2Check(false);
    setCityCheck(false);
    setEmail1Check(false);
    setEmail2Check(false);
    setFirstNameCheck(false);
    setLastNameCheck(false);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(emailDetails) === false) {
      setEmail2Check(true);
    }
    else if (!firstName) {
      setFirstNameCheck(true);
    } else if (!lastName) {
      setLastNameCheck(true);
    }
    else if (!phoneNo) {
      setPhoneNoCheck(true);
    } else if (!emailDetails) {
      setEmail1Check(true);
    }
    else {
      setLoader(true);

      dispatch({
        type: actionTypes.SET_UPDATEDADDRESS,
        updatedaddress: `${storeAddress.line_1}, ${storeAddress.line_2},${storeAddress.city}, ${storeAddress.zip}`,
      });
      console.log("storeId", storeid);
      console.log("merchantId", MERCHANT_ID);
      console.log("fulfillmentType", fulfilmentType);
      console.log("fulfillmentDate", fulfilmentDate);
      console.log("fulfillmentTime", fixTime);
      // console.log(
      //   `Address: ${AddressLine1}, ${AddressLine2}, ${city}, ${postcode}`
      // );
      console.log("orderItems", ordritms);
      console.log("customerId", cusid);
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          query: `
          mutation CreateSlerpCart($storeId: ID!, $merchantId: ID!, $fulfillmentType: String!, $address: String, $fulfillmentDate: String, $fulfillmentTime: String, $orderItems: [OrderItemParams], $customerId: String) {
            createSlerpCart(storeId: $storeId, merchantId: $merchantId, fulfillmentType: $fulfillmentType, address: $address, fulfillmentDate: $fulfillmentDate, fulfillmentTime: $fulfillmentTime, orderItems: $orderItems, customerId: $customerId) {
              id
              __typename
            }
          }
  
        `,

          variables: {
            "storeId": `${storeid}`,
            "merchantId": `${MERCHANT_ID}`,
            "fulfillmentType": `${fulfilmentType}`,
            "fulfillmentDate": `${fulfilmentDate}`,
            "fulfillmentTime": `${fixTime}`,
            "address": null,
            "orderItems": ordritms,
            "customerId": cusid
          }
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              console.log(res)
              dispatch({
                type: actionTypes.SET_CARTID,
                cartid: res.data.createSlerpCart.id,
              });
              let cartids = res.data.createSlerpCart.id;
              fetch(URL, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                  query: `
                  mutation UpdateCustomerDetails(
                    $cartId:ID!,
                    $customerDetails:CustomerDetailsParams!,
                    ) {
                      updateCartCustomerDetails(
                        cartId:$cartId,
                        customerDetails:$customerDetails,
                      ) {
                        id
                      }
                  }
                  
                  `,
                  variables: {
                    cartId: `${cartids}`,
                    customerDetails: {
                      firstName: `${firstName}`,
                      lastName: `${lastName}`,
                      email: "hel@gmail.com",
                      contactNum: `${phoneNo}`,
                    },
                  },
                }),
              })
                .then((response) => {
                  response
                    .json()
                    .then((res) => {
                      console.log(res)
                      console.log('firstname', firstName)
                      console.log("lastname", lastName)
                      console.log('email', emailDetails)
                      console.log('phoneNo', phoneNo)
                      console.log('well')
                    })
                    .catch((err) => {
                      console.log("error in getting msgs ", err);
                    });
                })
                .catch((err) => {
                  console.log("error in getting msgs ", err);
                });
              let price = totalprice - discount - filthyRewardsCoins
              price = price.toFixed(2)
              // if (price != 0) {
              fetch(URL, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                  query: `
                  mutation WebCartPayment($cartId:ID!, $cancelUrl:String!, $mode:String, $successUrl:String!) {
                    payViaWeb(cartId:$cartId, cancelUrl:$cancelUrl, mode:$mode, successUrl:$successUrl) {
                      sessionData
                    }
                  }

                  `,

                  variables: {
                    "cartId": `${cartids}`,
                    "cancelUrl": "http://localhost:19006/cancel",
                    "successUrl": "http://localhost:19006/success"
                  },
                }),
              })
                .then((response) => {
                  response
                    .json()
                    .then(async (res) => {
                      console.log('cartid', cartids)
                      console.log(res)
                      setLoader(false);
                      // dispatch({
                      //   type: actionTypes.SET_SCREEN,
                      //   screen: "Details",
                      // });
                      // dispatch({
                      //   type: actionTypes.SET_TAB,
                      //   tab: "Basket",
                      // });
                      // window.open(res.data.payViaWeb.sessionData.url, "_self")
                      // window.open(res.data.payViaWeb.sessionData.url)
                      let result = await Linking.openURL(res.data.payViaWeb.sessionData.url);
                      // let result = await WebBrowser.openBrowserAsync(
                      //   res.data.payViaWeb.sessionData.url
                      // );
                      navigation.navigate("Collections", {});
                    })
                    .catch((err) => {
                      console.log("error in getting msgs ", err);
                    });
                })
                .catch((err) => {
                  console.log("error in getting msgs ", err);
                });
              // }
              // else {
              // fetch(URL, {
              //   method: "POST",
              //   headers: {
              //     "content-type": "application/json",
              //     Authorization: `Bearer ${TOKEN}`,
              //   },
              //   body: JSON.stringify({
              //     query: `
              //       mutation payCart($cartId: ID!, $cancelUrl: String) {  pay(cartId: $cartId, cancelUrl: $cancelUrl) {  
              //           sessionId: session_id    nextStep: next_step  }}

              //     `,
              //     variables: {
              //       cartId: `${cartids}`,
              //       cancelUrl: "https://filthy-wings.slerpdemo.com/order/checkout"
              //     },
              //   }),
              // })
              //   .then((response) => {
              //     response
              //       .json()
              //       .then((res) => {
              //         console.log(res, "00")
              //         console.log("cartids", cartids)
              //         dispatch({
              //           type: actionTypes.SET_CLIENTSECRET,
              //           clientSecret: res.data.pay.sessionId,
              //         });
              //         // dispatch({
              //         //   type: actionTypes.SET_SAVEORDER,
              //         //   saveorder: cart,
              //         // });
              //         // AsyncStorage.setItem("cartprod", JSON.stringify([]));
              //         // setEmptyCart(true);
              //         // navigation.navigate("Collections", {});
              //       })
              //       .catch((err) => {

              //         console.log("error in getting msgs ", err);
              //       });
              //   })
              //   .catch((err) => {

              //     console.log("error in getting msgs ", err);
              //   });
              setAddressLine1("");
              setAddressLine2("");
              setCity("");
              setPostCode("");
              setLoader(false);
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "Details",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Basket",
              });
              navigation.navigate("Collections", {});
              // }
            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });

    }

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
      {alert && <Aalert navigation={navigation} tab1={"Basket"} screen1={"Details"} />}
      {loader && (
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "absolute",
          left: '46%',
          zIndex: 999
          // marginTop: 70,
          // marginBottom: 70
        }}>
          <ActivityIndicator
            size="large"
            style={{
              // position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",

            }}
            color="#F2C400"
          ></ActivityIndicator>
        </View>
      )}
      <View style={styles.orderInfosSet}>
        <TouchableOpacity
          onPress={() => {
            if (tab == "Basket" && screen == "Details") {
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "ChooseCollection",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Basket",
              });
              navigation.navigate("Basket", { screen: "ChooseCollection" });
            } else {
              navigation.navigate(tab, { screen: screen });
            }
          }}
        >
          <Image
            style={styles.backicon}
            source={require("../assets/BackIcon.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.heading}>Order Details</Text>
        <View>
          <Text style={styles.inputLabel}>First name</Text>
          <View style={{ display: "flex", alignItems: "center" }}>
            <TextInput
              editable={customerid ? false : true}
              placeholder="First name"
              placeholderTextColor="#828282"
              style={styles.inputText}
              onChangeText={(val) =>
                fname ? setFirstName(fname) : setFirstName(val)
              }
              value={firstName}
            />
          </View>
          {!firstNameCheck ? (
            <View></View>
          ) : (
            <Text
              style={{
                color: "red",
                fontFamily: "Raleway_500Medium",
                fontSize: 12,
                marginBottom: 8,
                width: "50%",
              }}
            >
              First name required
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.inputLabel}>Last name</Text>
          <View style={{ display: "flex", alignItems: "center" }}>
            <TextInput
              editable={customerid ? false : true}
              placeholder="Last name"
              placeholderTextColor="#828282"
              style={styles.inputText}
              onChangeText={(val) =>
                fname ? setLastName(lname) : setLastName(val)
              }
              value={lastName}
            />
          </View>
          {!lastNameCheck ? (
            <View></View>
          ) : (
            <Text
              style={{
                color: "red",
                fontFamily: "Raleway_500Medium",
                fontSize: 12,
                marginBottom: 8,
                width: "50%",
              }}
            >
              Last name required
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.inputLabel}>Phone no</Text>
          <View style={{ display: "flex", alignItems: "center" }}>
            <TextInput
              keyboardType='numeric'
              editable={phoneno ? false : true}
              placeholder="Phone no"
              placeholderTextColor="#828282"
              style={styles.inputText}
              onChangeText={(val) =>
                phoneno ? setPhoneNo(phoneNo) : setPhoneNo(val)
              }
              value={phoneNo}
            />
          </View>
          {!phoneNoCheck ? (
            <View></View>
          ) : (
            <Text
              style={{
                color: "red",
                fontFamily: "Raleway_500Medium",
                fontSize: 12,
                marginBottom: 8,
                width: "50%",
              }}
            >
              Phone no required
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={{ display: "flex", alignItems: "center" }}>
            <TextInput
              editable={customerid ? false : true}
              placeholder="Email"
              placeholderTextColor="#828282"
              style={styles.inputText}
              onChangeText={(val) =>
                fname ? setEmailDetails(email) : setEmailDetails(val)
              }
              value={emailDetails}
              keyboardType="email-address"
            />
          </View>
          {!email1Check ? (
            <View></View>
          ) : (
            <Text
              style={{
                color: "red",
                fontFamily: "Raleway_500Medium",
                fontSize: 12,
                marginBottom: 8,
                width: "50%",
              }}
            >
              Email required
            </Text>
          )}
          {!email2Check ? (
            <View></View>
          ) : (
            <Text
              style={{
                color: "red",
                fontFamily: "Raleway_500Medium",
                fontSize: 12,
                marginBottom: 8,
                width: "50%",
              }}
            >
              Email is not valid
            </Text>
          )}
        </View>

        <OrderBillInfo />
        <TouchableOpacity style={styles.paynowT} onPress={details}>
          <Text style={styles.payNow}>continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
