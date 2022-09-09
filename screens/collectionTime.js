import React, { useEffect, useState, useCallback } from "react";
import { styles } from "../stylesheet";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Alert from "../Components/alert";
import CollectionTime from "../Components/collectionTime";

import { MERCHANT_ID, TOKEN, URL } from "./ids&tokens";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
let timeslots = [];
const ChooseCollection = ({ navigation }) => {
  const [
    {
      storeAddress,
      endtime,
      starttime,
      cart,
      storeid,
      fulfilmentType,
      customerid,
      fulfilmentDate,
      fixTime,
      ordritms,
      cartid,
      timelist,
      tab,
      screen,
      editTime,
      alert
    },
    dispatch,
  ] = useDataLayerValue();
  const [loader, setLoader] = useState(false);
  const [check, setCheck] = useState(false);
  const [dateState, setDateState] = useState(false);
  var hours = new Date().getHours();
  hours = parseInt(hours);
  const [orderItems, setOrderItems] = useState([]);
  cart.map((element) => {
    let appliedModifiers = []
    if (orderItems.length < cart.length) {
      let quantity = element.quantity
      element.productTotal.map((ele) => {
        appliedModifiers.push(
          {
            modifierGroupId: ele.modifierGroupId,
            modifierId: ele.modifierId,
            quantity: 1
          }
        )
      })
      orderItems.push({
        productVariantId: element.productId,
        quantity: quantity,
        appliedModifiers: appliedModifiers
      });
    }
  });
  var today = new Date().getDate();
  var month = new Date().getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  if (today < 10) {
    today = "0" + today;
  }
  var year = new Date().getFullYear();
  let dateToday = year + "-" + month + "-" + today;
  let tomorrow = new Date();
  tomorrow.setDate(parseInt(today) + 1);
  tomorrow = tomorrow.getDate();
  if (tomorrow < 10) {
    tomorrow = "0" + tomorrow;
  }
  if (tomorrow == "01") {
    month = new Date().getMonth() + 2;
    if (month < 10) {
      month = "0" + month;
    }
  }
  let dateTomorrow = year + "-" + month + "-" + tomorrow;
  var fulfilDate = dateToday;

  useFocusEffect(
    useCallback(() => {
      setLoader(true);
      setCheck(false);
      dateState ? (fulfilDate = dateTomorrow) : (fulfilDate = dateToday);
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          query: `
          query getValidAvailableStores($merchantId: String!, $fulfillmentType: String!, $fulfillmentDate: String!, $address: String) {
            getValidStores(
              merchantId: $merchantId
              fulfillmentType: $fulfillmentType
              fulfillmentDate: $fulfillmentDate
              address: $address
            ) {
              stores {
                name
                id
                fulfillmentTimeslots(
                  fulfillmentDate: $fulfillmentDate
                  fulfillmentType: $fulfillmentType
                ) {
                  endTime
                  startTime
                  value
                  __typename
                }
                address {
                  line1
                  line2
                  zip
                  city
                  country
                  contactNum
                  geom {
                    coordinates
                    __typename
                  }
                  __typename
                }
                __typename
              }
              errors {
                message
                store {
                  id
                  name
                  __typename
                }
                __typename
              }
              __typename
            }
          }
          `,

          variables: {
            merchantId: `${MERCHANT_ID}`,
            fulfillmentType: "pickup",
            fulfillmentDate: `${fulfilDate}`,
            address: `${storeAddress.line_1}, ${storeAddress.line_2},${storeAddress.city}, ${storeAddress.zip}`,
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              let timeslote = res.data.getValidStores[0].stores.find(
                (element) => {
                  return element.id == storeid;
                }
              );
              timeslots = [];
              if (timeslote != undefined) {
                let timeslot = timeslote.fulfillmentTimeslots;
                let timeSlotLength = timeslot.length;
                timeslote.fulfillmentTimeslots.map((element) => {

                  if (timeslots.length < timeSlotLength) {
                    if (element.startTime) {
                      let start = element.startTime;
                      start = start.split(":");
                      start = start[0] + ":" + start[1];
                      timeslots.push(start);
                    } else {
                      timeslots.push(element.startTime);
                    }
                    if (timeslots.length == timeSlotLength) {
                      let end = element.endTime;
                      end = end.split(":");
                      end = end[0] + ":" + end[1];
                      timeslots.push(end);
                    }
                  }
                });
                let time = timeslots.filter((element) => {
                  return element !== null;
                });
                dispatch({
                  type: actionTypes.SET_TIMELIST,
                  timelist: time,
                });
                setLoader(false);
              } else {
                dispatch({
                  type: actionTypes.SET_TIMELIST,
                  timelist: timeslots,
                });
                setLoader(false);
                setCheck(true);
              }
            })
            .catch((err) => {
              setLoader(false);
              dispatch({
                type: actionTypes.SET_TIMELIST,
                timelist: [],
              });
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          setLoader(false);
          dispatch({
            type: actionTypes.SET_TIMELIST,
            timelist: [],
          });
          console.log("error in getting msgs ", err);
        });
    }, [dateState])
  );
  function hello() {
  }
  function slerpcart(time) {
    setLoader(true);
    dispatch({
      type: actionTypes.SET_FULFILMENTDATE,
      fulfilmentDate: fulfilDate,
    });
    dispatch({
      type: actionTypes.SET_FIXTIME,
      fixTime: time,
    });
    dispatch({
      type: actionTypes.SET_ORDRITMS,
      ordritms: orderItems,
    });
    if (editTime) {
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          query: `
        mutation updateSlerpCart($cartId: ID!, $fulfillmentType: String, $address: String, $fulfillmentTime: String, $fulfillmentDate: String, $orderItems: OrderItemParams) {
          updateSlerpCart(address: $address, cartId: $cartId, fulfillmentType: $fulfillmentType, fulfillmentTime: $fulfillmentTime, fulfillmentDate: $fulfillmentDate, orderItems: $orderItems) {
            id
          }
        }
      
      `,
          variables: {
            cartId: `${cartid}`,
            fulfillmentType: `${fulfilmentType}`,
            address: null,
            fulfillmentTime: `${time}`,
            fulfillmentDate: `${fulfilDate}`,
            orderItems: ordritms,
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              setLoader(false);
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "ChooseCollection",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Basket",
              });
              dispatch({
                type: actionTypes.SET_EDITTIME,
                editTime: false,
              });
              navigation.navigate("Collections", {});
            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });

    } else {
      setLoader(false);
      dispatch({
        type: actionTypes.SET_SCREEN,
        screen: "ChooseCollection",
      });
      dispatch({
        type: actionTypes.SET_TAB,
        tab: "Basket",
      });
      navigation.navigate("Details", {});
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
      {alert && <Alert navigation={navigation} tab1={"Basket"} screen1={"CollectionTime"} />}

      <View style={styles.orderInfosSet}>
        <TouchableOpacity onPress={() => {
          if (tab == "Basket" && screen == "ChooseCollection") {
            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "YourBasket",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Basket",
            });
            navigation.navigate("YourBasket", {})
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
        <Text style={styles.heading}>choose collection time</Text>
        <View style={styles.aligndates}>
          <TouchableOpacity
            onPress={() => setDateState(false)}
            style={styles.datesbutton}
            activeOpacity={0.95}
          >
            <Text style={[styles.datestixt]}>TODAY</Text>
            <View style={styles.ylinealign}>
              {dateState ? (
                <Image
                  style={styles.size2}
                  source={require("../assets/Vector.png")}
                />
              ) : (
                <Image
                  style={styles.size2}
                  source={require("../assets/yline.png")}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDateState(true)}
            style={[styles.datesbutton]}
            activeOpacity={0.95}
          >
            <Text style={[styles.datestixt]}>TOMORROW</Text>
            <View style={styles.ylinealign}>
              {dateState ? (
                <Image
                  style={styles.size2}
                  source={require("../assets/yline.png")}
                />
              ) : (
                <Image
                  style={styles.size2}
                  source={require("../assets/Vector.png")}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        {loader && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // height: '100%',
              // position: "absolute",
              // left: '46%',
              zIndex: 999,
              marginTop: 180,
              // marginBottom: 70
            }}
          >
            {/* <View style={{ top: '50%', position: 'absolute' }}></View> */}
            <ActivityIndicator
              size="large"
              style={
                {
                  // position: "absolute",
                  // alignItems: "center",
                  // justifyContent: "center",
                  // height: "100%",
                }
              }
              color="#F2C400"
            ></ActivityIndicator>
          </View>
        )}
        {loader ?
          <View></View>
          :
          <View>
            {timelist.map((element, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    slerpcart(element);
                  }}
                  style={[styles.infoSet3, { width: "100%" }]}
                >
                  <Text style={styles.orderInfoText3}>{element}</Text>
                  <Text style={styles.selectTime}>select</Text>
                </TouchableOpacity>
              );
            })}
            {timelist.length == 0 && (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14,
                    fontFamily: "MonumentExtended-Regular",
                  }}
                >
                  Closed!
                </Text>
                {!dateState && (
                  <View>
                    <TouchableOpacity onPress={() => setDateState(true)}>
                      <Text
                        style={{
                          color: "#ffffff",
                          fontSize: 14,
                          fontFamily: "Raleway_600SemiBold",
                          textDecorationLine: "underline",
                        }}
                      >
                        You can book for tomorrow
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#ffffff",
                        fontSize: 12,
                        fontFamily: "Raleway_600SemiBold",
                      }}
                    >
                      or
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Wings", { screen: "CollectionLocation" })
                  }
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                      fontFamily: "Raleway_600SemiBold",
                      textDecorationLine: "underline",
                    }}
                  >
                    Choose Another Store
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>}
      </View>
    </ScrollView>
  );
};
export default ChooseCollection;
