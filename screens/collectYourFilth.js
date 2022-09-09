import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Header } from "react-navigation-stack";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import Arrow from "../assets/arrow1.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useCallback, useState, useReducer } from "react";
import reducer from "../Reducer";
import { TOKEN, MERCHANT_ID, URL } from "./ids&tokens";
import SearchDropDown from "../Components/SearchDropDown";
import Hyperlink from "react-native-hyperlink";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
const CollectYourFilth = ({ navigation, route }) => {
  const [{ zip, customerid, postcode, eachzip, tab, screen }, dispatch] =
    useDataLayerValue();

  const [loader, setLoader] = useState(false);
  const [dataSource] = useState([]);
  const [colors] = useState(["#84DCC6", "#FEC8C8", "#F7E4CF", "#E8DEF3"]);
  const [onChange, setOnChange] = useState(false);
  const [check, setCheck] = useState(false);

  const [disabledw, setDisabledw] = useState(false);
  const [filtered, setFiltered] = useState(dataSource);
  const [searching, setSearching] = useState(false);
  var [zipData, setZipData] = useState("");
  var [foc, setFoc] = useState(false);
  const [head2, setHead2] = useState(false);
  const [mapPostcode, setMapPostcode] = useState("");
  const [postcod, setPostcod] = useState("");
  useFocusEffect(
    useCallback(() => {
      if (route.params != undefined) {
        let temp = route.params.postcode;
        setPostcod(postcod);
        if (route.params.postcode) {
          zipData = temp;
          if (zipData) {
            route.params.postcode = null;
            handleKeyDown(zipData);
          }
        }
      }
    }, [onChange, route, zipData])
  );

  const handleKeyDown = (item) => {
    setHead2(false);
    setCheck(false);
    if (item) {
      setZipData(item);
      zipData = item;
      setLoader(true);
      setDisabledw(true);
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
              let zipq = res.data.merchants[0].stores.filter((res) => {
                let zipfull = res.address.zip;
                return zipfull.match(zipData);
              });
              dispatch({
                type: actionTypes.SET_CATEGORYARRANGEMENTS,
                categoryArrangements:
                  res.data.merchants[0].setting.category_arrangement,
              });
              if (zipq.length > 0) {

                setHead2(false);

                dispatch({
                  type: actionTypes.SET_ZIP,
                  zip: zipq,
                });

                setPostcod("");
                setDisabledw(false);
                setLoader(false);
                setOnChange(false);
                dispatch({
                  type: actionTypes.SET_SCREEN,
                  screen: "CollectYourFilth",
                });
                dispatch({
                  type: actionTypes.SET_TAB,
                  tab: "Wings",
                });
                navigation.navigate("Wings", { screen: "CollectionLocation" });
              } else {
                setHead2(true);
                setPostcod("");
                setDisabledw(false);
                setLoader(false);

                setOnChange(false);
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
  };
  const onSearch = (text) => {
    if (text) {
      setSearching(true);

      const tempList = dataSource.filter((item) => {
        if (item.match(text)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(dataSource);
    }
  };
  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <ScrollView style={styles.scrollView}>
      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content" // Here is where you change the font-color
      />
      <ImageBackground
        source={require("../assets/wings.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ padding: 12, flex: 1 }}>
          <View style={{ margin: 10 }}></View>

          <TouchableOpacity
            onPress={() => {
              if (tab == "Wings" && screen == "CollectYourFilth") {
                dispatch({
                  type: actionTypes.SET_SCREEN,
                  screen: "Deliver",
                });
                dispatch({
                  type: actionTypes.SET_TAB,
                  tab: "Home",
                });
                navigation.navigate("Deliver");
              } else {
                navigation.navigate(tab, { screen: screen });
              }
            }}
          >
            <Image
              style={[styles.backicon, { marginTop: 10 }]}
              source={require("../assets/BackIcon.png")}
            />
          </TouchableOpacity>
          <View style={{ display: "flex", alignItems: "center", }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Image
                style={{
                  // width: '100%',
                  top: 188,
                  position: "absolute",
                  height: 660,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                }}
                source={require("../assets/blurWings.png")}
              ></Image>
            </View>
            <View style={styles.logocontainer}>
              <Image
                style={styles.tinyLogo}
                source={require("../assets/trans.png")}
              />
            </View>
            {loader && (
              <ActivityIndicator
                size="large"
                style={{
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "220%",
                }}
                color="yellow"
              ></ActivityIndicator>
            )}
            <Text style={styles.text1}>COLLECT YOUR FILTH</Text>
          </View>
          <View style={{ marginTop: 40 }}></View>


          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "Raleway_600SemiBold",
            }}
          >
            Enter Your Postcode
          </Text>

          <View style={{ display: "flex", alignItems: "center" }}>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 12,
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  padding: 12,
                  color: "#828282",
                  fontFamily: "Raleway_500Medium",
                  fontSize: 16,
                  backgroundColor: "#ffffff",
                }}
                returnKeyType="search"
                onSubmitEditing={() => {
                  setSearching(false);
                  handleKeyDown(zipData);
                }}
                keyboardType="web-search"
                placeholder="e.g B12 34A"
                placeholderTextColor="#828282"
                onChangeText={(val) => {
                  onSearch(val);
                  setZipData(val);
                }}
                value={zipData}
              />
            </View>

            {head2 && (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,
                  fontFamily: "Raleway_600SemiBold",
                  width: "100%",
                }}
              >
                No location on this zip code
              </Text>
            )}
            {check && (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,
                  fontFamily: "Raleway_600SemiBold",
                  width: "100%",
                }}
              >
                Postcode required
              </Text>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: "10%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 35,
              }}
            >
              <View
                style={{
                  height: "5%",
                  width: "42%",
                  backgroundColor: "#ffffff",
                }}
              ></View>
              <Text
                style={{
                  width: "16%",
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "MonumentExtended-Regular",
                  textTransform: "uppercase",
                  color: "#ffffff",
                }}
              >
                or
              </Text>
              <View
                style={{
                  height: "5%",
                  width: "42%",
                  backgroundColor: "#ffffff",
                }}
              ></View>
            </View>

            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.button1}
              onPress={() => {
                navigation.navigate("Map");
              }}
            >
              <Text style={styles.searchtext}>use my location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default CollectYourFilth;

const styles = StyleSheet.create({
  backicon: {
    height: 23,
    width: 23,
  },
  searchtext: {
    color: "#121212",
    fontSize: 16,
    fontFamily: "MonumentExtended-Regular",
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    borderWidth: 1.5,
    borderRadius: 2,
    height: 41,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  or: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    height: 35,
    width: 365,
    opacity: 0.1,
  },
  button1: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "100%",
    height: 41,
    marginTop: 35,
    textTransform: "uppercase",
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
  text1: {
    fontSize: 20,
    color: "white",
    fontFamily: "MonumentExtended-Regular",
    marginTop: 118,
    borderRadius: 2,
  },
  logocontainer: {
    marginTop: 10,
  },
  container: {

    height: 865,
  },
  image: {
    flex: 1,
    height: 818,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollcontainer: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "black",
  },
});
