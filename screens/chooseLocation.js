import React, { useEffect, useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import Choose from "../Components/choose";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { TOKEN, MERCHANT_ID, URL } from "./ids&tokens";
let start = 0;
let end = 0;

function Time({ zip, curDay }) {
  if (zip == undefined) {
    zip = [];
  }
  const [{ storeid, storeAddress, starttime, endtime, storeSlug }, dispatch] =
    useDataLayerValue();
  let startTime;
  let endTime;
  const [list, setList] = useState([]);
  for (let i = 0; i < zip.length; i++) {
    if (list.length < 2) list.push(false);
  }
  const selection = (index, name, id, address, start, end, store) => {
    let i;
    let newList = [...list];
    newList[index] = true;
    for (i = 0; i < zip.length; i++) {
      if (i != index) {
        newList[i] = false;
      }
    }
    start = start.split(":");
    start = start[0];
    start = parseInt(start);
    end = end.split(":");
    end = end[0];
    end = parseInt(end);

    setList(newList);
    dispatch({
      type: actionTypes.SET_STORESLUG,
      storeSlug: store.slug,
    });
    dispatch({
      type: actionTypes.SET_CITY,
      city: name,
    });
    dispatch({
      type: actionTypes.SET_STOREID,
      storeid: id,
    });
    dispatch({
      type: actionTypes.SET_STOREADDRESS,
      storeAddress: address,
    });
    dispatch({
      type: actionTypes.SET_STARTTIME,
      starttime: start,
    });
    dispatch({
      type: actionTypes.SET_ENDTIME,
      endtime: end,
    });
  };
  return (
    <ScrollView bounces={false}>
      {zip.map((adds, index = 0) => {
        let miles;
        if (adds.is_open) {
          startTime = adds.operating_schedules[curDay].start;
          startTime = startTime.split(":");
          startTime = startTime[0];
          startTime = parseInt(startTime);

          endTime = adds.operating_schedules[curDay].end;
          endTime = endTime.split(":");
          endTime = endTime[0];
          endTime = parseInt(endTime);

          if (startTime >= 0 && startTime <= 11) {
            if (startTime == 0) {
              startTime = 12 + "am";
            } else {
              startTime = startTime + "am";
            }
          } else {
            if (startTime == 12) {
              startTime = startTime + "pm";
            } else {
              startTime = startTime % 12;
              startTime = startTime + "pm";
            }
          }
          if (endTime >= 0 && endTime <= 11) {
            if (endTime == 0) {
              endTime = 12 + "am";
            } else {
              endTime = endTime + "am";
            }
          } else {
            if (endTime == 12) {
              endTime = endTime + "pm";
            } else {
              endTime = endTime % 12;
              endTime = endTime + "pm";
            }
          }
          var dis = getDistance(
            {
              latitude: adds.address.geom.coordinates[0],
              longitude: adds.address.geom.coordinates[1],
            },
            { latitude: 51.4804063, longitude: -0.1758172 }
          );
          miles = dis / 1609.34;
          miles = miles.toFixed(2);
        }
        return (
          <View>
            {adds.is_open ?
              <TouchableOpacity
                style={{
                  borderColor: list[index] ? "rgba(242, 196, 0, 0.2)" : null,
                  borderWidth: list[index] ? 1 : 0,
                  marginBottom: 10,
                }}
                onPress={() =>
                  selection(
                    index,
                    adds.name,
                    adds.id,
                    adds.address,
                    adds.operating_schedules[curDay].start,
                    adds.operating_schedules[curDay].end,
                    adds
                  )
                }
                key={index}
              >
                <Choose
                  location={adds.name}
                  distance={`${miles} miles away`}
                  time={
                    adds.is_open
                      ? `Opening times: ${startTime} - ${endTime}`
                      : `closed`
                  }
                />
              </TouchableOpacity>
              : <View></View>
            }
          </View>

        );
      })}
    </ScrollView>
  );
}
export default function CollectionLocation({ navigation }) {
  const [{ zip, store, storeid, fulfilmentType, tab, screen, token }, dispatch] =
    useDataLayerValue();
  const [check, setCheck] = useState(false);
  const [loader, setLoader] = useState(false)
  useFocusEffect(
    useCallback(() => {
      // setLoader(false)
      AsyncStorage.setItem("cart", JSON.stringify([]));
      AsyncStorage.getItem("cart").then((item) => {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      });
      // if (zip.length == 0) {
      setLoader(true)

      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },

        body: JSON.stringify({
          query: `
        query GetLocations {
          merchants(where: {id: {_eq: "${MERCHANT_ID}"}}) {
            id
                    name
                    slug
                    version
                    setting
                    stores {
                      id
                      name
                      slug
                      settings
                      operating_schedules
                      schedules
                      address {
                        city
                        contact_num
                        country
                        default_billing_address
                        default_shipping_address
                        flat_number
                        geom
                        id
                        inserted_at
                        label
                        line_1
                        line_2
                        location_type
                        updated_at
                        zip
                      }
                      is_open
                      is_warehouse
                    }
          }
        }
        
        `,
          variables: {},
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              console.log(res.data.merchants)
              let zipq = res.data.merchants[0].stores
              // .filter((res) => {
              //   let zipfull = res.address.zip;
              //   return zipfull.match(zipData);
              // });
              dispatch({
                type: actionTypes.SET_CATEGORYARRANGEMENTS,
                categoryArrangements:
                  res.data.merchants[0].setting.category_arrangement,
              });
              setLoader(false)
              if (zipq.length > 0) {

                // setHead2(false);

                dispatch({
                  type: actionTypes.SET_ZIP,
                  zip: zipq,
                });

                // setPostcod("");
                // setDisabledw(false);
                // setLoader(false);
                // setOnChange(false);
                // dispatch({
                //   type: actionTypes.SET_SCREEN,
                //   screen: "Deliver",
                // });
                // dispatch({
                //   type: actionTypes.SET_TAB,
                //   tab: "Home",
                // });
                // navigation.navigate("Wings", { screen: "CollectionLocation" });
              } else {
                // setHead2(true);
                // setPostcod("");
                // setDisabledw(false);
                // setLoader(false);

                // setOnChange(false);
              }
            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
      // }
    }, [])
  );

  let today = new Date().getDay();
  const dayarr = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let curDay = dayarr[today];

  function select() {
    setCheck(false);
    if (storeid) {
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          query: `
          
          query GetLocation($storeId: uuid!) {
            categories {
              id
              name
              special_availabilities
              merchant {
                stores(where: {id: {_eq: $storeId}}) {
                  name
                  slug
                  is_open
                  store_variants (where: {published_at: {_is_null: false}, product_variant: {product: {archived_at: {_is_null: true}}, archived_at: {_is_null: true}, default_variant: {_eq: true}, published: {_eq: true}}}, order_by: {product_variant: {product: {featured: desc}}}) {
                    in_stock
                    stock_count
                    stock_type
                    stock_sold
                    published_at
                    product_variant {
                      name
                      id
                      description
                      options
                      image
                      restrictions
                      limit
                      price
                      vat
                      product {
                        slug
                        product_id: id
                        category {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          
        
        `,
          variables: {
            storeId: `${storeid}`,
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              // console.log(res.data)
              dispatch({
                type: actionTypes.SET_STORE,
                store: res.data,
              });
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "CollectionLocation",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Wings",
              });
              navigation.navigate("PlpCollection");
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
    <ScrollView bounces={false} keyboardShouldPersistTaps="handled" style={[styles.scrollView]}>
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
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/Groupbk.png")}
          style={styles.image2}
        >
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
          {/* <View style={{ margin: 6 }}></View> */}
          <TouchableOpacity
            onPress={() => {
              if (tab == "Wings" && screen == "CollectionLocation") {
                dispatch({
                  type: actionTypes.SET_SCREEN,
                  screen: "Deliver",
                });
                dispatch({
                  type: actionTypes.SET_TAB,
                  tab: "Home",
                });
                navigation.navigate("Home", { screen: "Deliver" });
              } else {
                navigation.navigate(tab, { screen: screen });
              }
            }}
          >
            <Image
              style={[styles.backicon, styles.gap14]}
              source={require("../assets/BackIcon.png")}
            ></Image>
          </TouchableOpacity>
          <View style={[styles.gap9]}>
            <View style={[styles.align]}>
              <Image
                style={[styles.logo1]}
                source={require("../assets/LogoWhite.png")}
              ></Image>
              <Text style={[styles.header, styles.gap10]}>
                choose your location
              </Text>
            </View>

            <View style={styles.gap13}></View>
            <View style={styles.gap13}></View>
            {loader ?
              <View></View> :
              <Time zip={zip} curDay={curDay}></Time>
            }
            <TouchableOpacity
              onPress={select}
              style={[styles.paynowT, styles.gap7, { width: "100%" }]}
            >
              <Text style={styles.payNow}>select and continue</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
              screen: "CollectionLocation",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Wings",
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
