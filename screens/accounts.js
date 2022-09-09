import React, { useEffect, useState, useCallback } from "react";
import { styles } from "../stylesheet";
import { Text, View, Image, TouchableOpacity, Alert, StatusBar, SafeAreaView, Platform } from "react-native";
import { TOKEN, URL, MERCHANT_ID } from "./ids&tokens";
import Loading from "./loading";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
export default function Accounts({ navigation }) {
  var [
    {
      email,
      token,
      fname,
      customerid,
      cart,
      zip,
      store,
      account,
      storeid,
      product,
      rewards,
      lname,
      customerapikey,
      tab,
      screen
    },
    dispatch,
  ] = useDataLayerValue();
  const popAction = StackActions.pop(1);
  const [tokenState, setTokenState] = useState(false);
  const [check, setCheck] = useState(false);
  const [accountDelete, setAccountDelete] = useState(false)
  function deleteAccount() {
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${customerapikey}`,
      },

      body: JSON.stringify({
        query: `
        mutation ScrubCustomerInfoV2($details: jsonb) {
          update_orders(where: {customer_details:{_contains: $details}}, _append:{customer_details:{first_name:"Slerp", last_name:"Customer", contact_num:"+447123456789", email:"customer@slerp.com"}}) {
            affected_rows
            returning {
              transaction_id
              customer_details
            }
          }
        }
        
        `,
        variables: {
          "details": {
            "email": email
          }
        },
      }),
    })
      .then((response) => {
        response
          .json()
          .then((res) => {
            let nowDate = new Date()
            console.log('res', res)
            fetch(URL, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
              },

              body: JSON.stringify({
                query: `
                mutation EditCustomer($customerId: ID!, $firstName: String!, $lastName: String!, $email: String!, $merchantId: ID!, $currentPassword: String, $password: String, $passwordConfirmation: String, $contactNum: String, $birthdate: String) {
                  editCustomer(customerId: $customerId, firstName: $firstName, lastName: $lastName, email: $email, merchantId: $merchantId, currentPassword: $currentPassword, password: $password, passwordConfirmation: $passwordConfirmation, contactNum: $contactNum, birthdate: $birthdate) {
                    id
                    first_name
                    last_name
                    email
                    contact_num
                    birthdate
                  }
                }
                
                `,
                variables: {
                  customerId: customerid,
                  email: 'deleted' + nowDate.getFullYear() + (nowDate.getMonth() + 1) + nowDate.getDate() + nowDate.getTime() + '@slerp.com',
                  firstName: "something random",
                  lastName: "something else random",
                  merchantId: MERCHANT_ID,
                },
              }),
            })
              .then((response) => {
                response
                  .json()
                  .then((res) => {
                    console.log('res2', res)
                    AsyncStorage.setItem("customerID", "");
                    AsyncStorage.setItem("firstname", "");
                    AsyncStorage.setItem("customerapikey", "");
                    AsyncStorage.setItem("lastname", "");
                    AsyncStorage.setItem("cart", JSON.stringify([]));
                    AsyncStorage.setItem("email", "");
                    AsyncStorage.setItem("token", "");
                    AsyncStorage.setItem("phoneno", "");
                    setTokenState(true);
                  })
                  .catch((err) => {
                    console.log("error in getting msgs ", err);
                  });
              })
              .catch((err) => {
                console.log("error in getting msgs ", err);
              });
          })
          .catch((err) => {
            console.log("error in getting msgs ", err);
          });
      })
      .catch((err) => {
        console.log("error in getting msgs ", err);
      });
    // console.log("Account deletion")
  }
  useEffect(() => {
    if (tokenState) {

      dispatch({
        type: actionTypes.SET_FINALPRODUCT,
        finalProduct: [],
      });
      dispatch({
        type: actionTypes.SET_REWARDS,
        rewards: [],
      });
      dispatch({
        type: actionTypes.SET_PRODUCT,
        product: "",
      });
      dispatch({
        type: actionTypes.SET_ZIP,
        zip: [],
      });
      dispatch({
        type: actionTypes.SET_STOREID,
        storeid: "",
      });
      AsyncStorage.getItem("phoneno").then((item) => {
        dispatch({
          type: actionTypes.SET_EMAIL,
          phoneno: item,
        });
      });
      AsyncStorage.getItem("email").then((item) => {
        dispatch({
          type: actionTypes.SET_EMAIL,
          email: item,
        });
      });
      AsyncStorage.getItem("customerapikey").then((item) => {
        dispatch({
          type: actionTypes.SET_CUSTOMERAPIKEY,
          customerapikey: item,
        });
      });
      AsyncStorage.getItem("lastname").then((item) => {
        dispatch({
          type: actionTypes.SET_LNAME,
          lname: item,
        });
      });
      AsyncStorage.getItem("customerID").then((item) => {
        dispatch({
          type: actionTypes.SET_CUSTOMERID,
          customerid: item,
        });
      });
      AsyncStorage.getItem("firstname").then((item) => {
        dispatch({
          type: actionTypes.SET_FNAME,
          fname: item,
        });
      });
      AsyncStorage.getItem("cart").then((item) => {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      });
      AsyncStorage.getItem("token")
        .then((item) => {
          dispatch({
            type: actionTypes.SET_TOKEN,
            token: item,
          });
          setTokenState(false)
          navigation.navigate("Home", { screen: "Signin" })
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
    }
  }, [tokenState]);
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <View style={[styles.container]}>
      {token ? <View>
        <MyStatusBar
          backgroundColor="black"
          barStyle="light-content" // Here is where you change the font-color
        />
        {Platform.OS === "ios" ? (
          <View></View>
        ) : (
          <View style={{ marginTop: 33 }}></View>
        )}
        <View style={[styles.gap12, styles.gap1]}>
          {/* <View style={{ marginTop: 10 }}></View> */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                if (tab == "" && screen == "") {
                  navigation.navigate("Home", { screen: "Homescreen" })
                }
                if (tab == "Account" && screen == "Accounts") {
                  dispatch({
                    type: actionTypes.SET_SCREEN,
                    screen: "OrderDelivered",
                  });
                  dispatch({
                    type: actionTypes.SET_TAB,
                    tab: "Basket",
                  });
                  navigation.navigate("OrderDelivered")
                }
                else {
                  navigation.navigate(tab, { screen: screen })
                }
              }}
            >
              <Image
                style={styles.backicon}
                source={require("../assets/BackIcon.png")}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "85%",
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "MonumentExtended-Regular",
                  fontSize: 16,
                }}
              >
                my account
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setCheck(false);
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "Accounts",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Account",
              });
              if (store) {
                navigation.navigate("Wings", { screen: "PlpCollection" });
              } else {
                navigation.navigate("Home", { screen: "Deliver" });
              }
            }}
            key={Math.random()}
            style={[
              {
                borderColor: "rgba(130, 130, 130, 0.1)",
                borderWidth: 3,
                padding: 15,
                marginBottom: 13,
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              },
              styles.gap8,
            ]}
          >
            <Text style={styles.selectTime}>menu (order now)</Text>
            <View>

              <Image
                style={{ width: 17, height: 14 }}
                source={require("../assets/arrow.png")}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "Accounts",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Account",
              });
              navigation.navigate("Home", { screen: "FilthyRewards" })
            }}
            key={Math.random()}
            style={[styles.infoSet3]}
          >
            <Text style={styles.selectTime}>filthy rewards</Text>
            <View>
              <Image
                style={{ width: 17, height: 14 }}
                source={require("../assets/arrow.png")}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "Accounts",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Account",
              });
              navigation.navigate("Home", { screen: "OrderHistory" })
              // navigation.navigate("OrderHistory")
            }}
            key={Math.random()}
            style={[styles.infoSet3]}
          >
            <Text style={styles.selectTime}>order history</Text>
            <View>
              <Image
                style={{ width: 17, height: 14 }}
                source={require("../assets/arrow.png")}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            key={Math.random()}
            onPress={() => {
              navigation.navigate("Home", { screen: "Calculator" });
            }}
            style={[styles.infoSet3]}
          >
            <Text style={styles.selectTime}>wing calculator</Text>
            <TouchableOpacity>
              <Image
                style={{ width: 17, height: 14 }}
                source={require("../assets/arrow.png")}
              ></Image>
            </TouchableOpacity>
          </TouchableOpacity>
          {!customerid ? <View></View> :
            <TouchableOpacity
              onPress={() => {

                Alert.alert(
                  "Account Deletion",
                  "You want to delete the account?",
                  [
                    {
                      text: "No",
                      onPress: () => console.log("no deletion"),
                    },
                    { text: "Yes", onPress: () => deleteAccount() }
                  ]
                );
                // if (accountDelete)
                //   console.log("in")
                // AsyncStorage.setItem("customerID", "");
                // AsyncStorage.setItem("firstname", "");
                // AsyncStorage.setItem("customerapikey", "");
                // AsyncStorage.setItem("lastname", "");
                // AsyncStorage.setItem("cart", JSON.stringify([]));
                // AsyncStorage.setItem("email", "");
                // AsyncStorage.setItem("token", "");

                // setTokenState(true);
              }}
              key={Math.random()}
              style={[styles.infoSet3]}
            >
              <Text style={styles.selectTime}>Delete account</Text>
              <View>
                <Image
                  style={{ width: 17, height: 14 }}
                  source={require("../assets/arrow.png")}
                ></Image>
              </View>
            </TouchableOpacity>}
          {!customerid ? <View></View> :
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem("customerID", "");
                AsyncStorage.setItem("firstname", "");
                AsyncStorage.setItem("customerapikey", "");
                AsyncStorage.setItem("lastname", "");
                AsyncStorage.setItem("cart", JSON.stringify([]));
                AsyncStorage.setItem("email", "");
                AsyncStorage.setItem("token", "");
                AsyncStorage.setItem("phoneno", "");
                setTokenState(true);
              }}
              key={Math.random()}
              style={[styles.infoSet3]}
            >
              <Text style={styles.selectTime}>Sign out</Text>
              <View>
                <Image
                  style={{ width: 17, height: 14 }}
                  source={require("../assets/arrow.png")}
                ></Image>
              </View>
            </TouchableOpacity>}
        </View>
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
              screen: "Accounts",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Account",
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
    </View>
  );
}
