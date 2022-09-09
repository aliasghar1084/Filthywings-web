import React, { useEffect, useState } from "react";
import { styles } from "../stylesheet";
import { getDistance, getPreciseDistance } from "geolib";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import Choose from "../Components/choose";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { TOKEN, MERCHANT_ID, URL } from "./ids&tokens";
let orderItem = [];
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function FilthyRewards({ navigation }) {
  var [
    {
      customerid,
      cartid,
      customerapikey,
      rewards,
      totalprice,
      filthyRewardsCoins,
      tab,
      screen,
      discount
    },
    dispatch,
  ] = useDataLayerValue();
  const [check, setCheck] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    if (customerid) {
      console.log('CUSTOMER API KEY', customerapikey)
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${customerapikey}`,
        },
        body: JSON.stringify({
          query: `
                      query GetRewards {
                        customer_rewards(limit:10, where: {customer: {id: {_eq: "${customerid}"}, merchant: {id: {_eq: "${MERCHANT_ID}"}}}, archived_at: {_is_null: true}, reward: {archived_at: {_is_null: true}}, redeemed_at: {_is_null: true}}, order_by: {inserted_at: desc}) {
                          id
                          redeemed_at
                          required_quantity
                          reward {
                            description
                            name
                            required_quantity
                            loyalty_card_id
                            loyalty_card {
                              name
                              image
                              description
                              ends_at
                            }
                            reward_value
                            reward_value_type
                            product_ids
                            product_limit
                            redeem_reward_message
                            reward_type
                          }
                          customer {
                            orders {
                              transaction_id
                              inserted_at
                            }
                          }
                        }
                      }
                      
                    `,
          variables: {
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              dispatch({
                type: actionTypes.SET_REWARDS,
                rewards: res.data.customer_rewards,
              });

            })
            .catch((err) => {
              setLoader(false);
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
    } else {
    }
    setLoader(false);
  }, []);
  function rewarddiscount(customerrewardid) {
    setCheck(false);
    if (cartid) {
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${customerapikey}`,
        },
        body: JSON.stringify({
          query: `
          mutation ApplyRewardDiscount($customerRewardId: ID!, $cartId: ID!) {
            applyRewardDiscount(customerRewardId: $customerRewardId, cartId: $cartId) {
              type
              value
              totalDiscount
            }
          }
                    `,
          variables: {
            customerRewardId: `${customerrewardid}`,
            cartId: `${cartid}`,
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              let filthyRewards = res.data.applyRewardDiscount.totalDiscount;
              filthyRewards = parseFloat(filthyRewards);
              filthyRewardsCoins = filthyRewardsCoins + filthyRewards;
              dispatch({
                type: actionTypes.SET_FILTHYREWARDSCOINS,
                filthyRewardsCoins: filthyRewardsCoins,
              });
              dispatch({
                type: actionTypes.SET_FILTHYREWARDS,
                filthyRewards: filthyRewards,
              });
              let price = totalprice - discount - filthyRewardsCoins
              price = price.toFixed(2)

              if (price < 0) {
                dispatch({
                  type: actionTypes.SET_NOMORE,
                  nomore: true,
                });
                dispatch({
                  type: actionTypes.SET_SCREEN,
                  screen: "FilthyRewards",
                });
                dispatch({
                  type: actionTypes.SET_TAB,
                  tab: "Home",
                });
                navigation.navigate("Basket", { screen: "Collections" });
              }
              else {
                dispatch({
                  type: actionTypes.SET_NOMORE,
                  nomore: false,
                });
                dispatch({
                  type: actionTypes.SET_SCREEN,
                  screen: "FilthyRewards",
                });
                dispatch({
                  type: actionTypes.SET_TAB,
                  tab: "Home",
                });
                navigation.navigate("Basket", { screen: "Collections" });
              }

            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
    } else {
      setCheck(true);
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
    <ScrollView bounces={false}
      keyboardShouldPersistTaps="handled"
      style={[styles.scrollView, { height: "100%" }]}
    >
      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content" // Here is where you change the font-color
      />
      {Platform.OS === "ios" ? (
        <View></View>
      ) : (
        <View style={{ marginTop: 33 }}></View>
      )}
      {loader ? <View></View> :
        <View style={{ paddingLeft: 23, paddingRight: 23 }}>
          <TouchableOpacity onPress={() => {
            if (tab == "Home" && screen == "FilthyRewards") {
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "Accounts",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Account",
              });
              navigation.navigate("Accounts")
            }
            else {
              navigation.navigate(tab, { screen: screen })
            }
          }}>
            <Image
              style={[styles.backicon, { marginTop: 20 }]}
              source={require("../assets/BackIcon.png")}
            ></Image>
          </TouchableOpacity>
          {check && (
            <Text
              style={{
                color: "red",
                fontFamily: "Raleway_500Medium",
                fontSize: 12,
                marginBottom: 13,
                width: "50%",
              }}
            >
              Add some items in cart
            </Text>
          )}

          <Text
            style={{
              fontFamily: "MonumentExtended-Ultrabold",
              fontSize: 14,
              color: "#FFFFFF",
              textTransform: "uppercase",
              marginTop: 20,
            }}
          >
            filthy rewards
          </Text>
          <ImageBackground
            style={{
              width: "100%",
              height: 73,
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            source={require("../assets/Filthyheaders.png")}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "MonumentExtended-Regular",
                fontSize: 24,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {rewards.length ? rewards.length : ""} filth coins
            </Text>

          </ImageBackground>

          <Text
            style={{
              fontFamily: "Raleway_500Medium",
              fontSize: 12,
              color: "#828282",
              marginTop: 20,
            }}
          >
            Collect filth coin for every order you place on the Filthy Wings app.
            Save up your coins and use them on future orders for exclusive
            discounts.
          </Text>
          <Text
            style={[
              {
                fontFamily: "MonumentExtended-Ultrabold",
                fontSize: 14,
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginTop: 20,
              },
            ]}
          >
            filth coin history
          </Text>
          <Text
            style={{
              fontFamily: "Raleway_500Medium",
              fontSize: 12,
              color: "#828282",
              marginTop: 5,
            }}
          >
            See past orders and how many filth coins you gained.
          </Text>
          <View style={styles.gap6}></View>
        </View>}
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
      {rewards.length ? (
        loader ? <View></View> :
          rewards.map((element, index) => {
            let cusrewid = element.id;
            let name = element.reward.loyalty_card.name;
            let price = element.reward.reward_value;
            price = price.toFixed(2);
            return (
              <View key={index}>

                {element.customer.orders.map((ele, index) => {
                  let date = ele.inserted_at;
                  date = date.split("T");
                  date = date[0].split("-");
                  let year = parseInt(date[0]);
                  let month = parseInt(date[1]);
                  let day = parseInt(date[2]);
                  let fullDate = day + " " + monthName[month - 1] + " " + year;
                  return (
                    <View key={index}>
                      <View style={{ marginTop: 14 }}></View>
                      <View style={[styles.chooseSet]}>
                        <View style={styles.width2}></View>
                        <Image
                          style={styles.chooseImage}
                          source={require("../assets/FilthyRewards.png")}
                        ></Image>
                        <View style={styles.width1}></View>
                        <View
                          style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Text style={styles.chooseText1}>{name}</Text>
                          <Text style={styles.chooseText2}>
                            Order #{ele.transaction_id}
                          </Text>
                          <Text style={styles.chooseText2}>{fullDate}</Text>
                        </View>
                        {cartid ? (
                          <TouchableOpacity
                            onPress={() => {
                              rewarddiscount(cusrewid);
                            }}
                            style={{
                              width: "33%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
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
                        ) : (
                          <View style={{ width: "33%" }}></View>
                        )}
                        <View style={{ width: "3%" }}></View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })
      ) : (
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 130,
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "Raleway_600SemiBold",
            }}
          >
            No Filth Coin to redeem
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
