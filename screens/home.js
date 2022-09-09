import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Touchable,
  Platform
} from "react-native";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import ImgViewer from "react-native-image-viewer-web";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
let interval = undefined;
import Loading from "./loading";

const Homescreen = ({ navigation }) => {
  const [
    {
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
      filthyRewardsShow,
      screen,
      tab
    },
    dispatch,
  ] = useDataLayerValue();
  const [tokenState, setTokenState] = useState(false);
  const [check, setCheck] = useState(false);
  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);
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
      AsyncStorage.getItem("email").then((item) => {
        dispatch({
          type: actionTypes.SET_EMAIL,
          email: item,
        });
      });
      AsyncStorage.getItem("phoneno").then((item) => {
        dispatch({
          type: actionTypes.SET_PHONENO,
          phoneno: item,
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
          if (!check) {
            navigation.navigate("Signup");
          } else {
            navigation.navigate("Signin");
          }
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
    }
  }, [tokenState]);
  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 0.1);
      }, 30);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (progress >= 10) {
      setRunning(false);
      clearInterval(interval);
      setProgress(0);
    }
  }, [progress]);

  state: {
    isFocused: true;
  }
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <View>
      {running ? (
        <Loading progress={progress} />
      ) : (
        <ScrollView bounces={false} style={styles.scrollView}>

          <MyStatusBar
            backgroundColor="black"
            barStyle="light-content" // Here is where you change the font-color
          />
          {Platform.OS === "ios" ? (
            <View></View>
          ) : (
            <View style={{ marginTop: 33 }}></View>
          )}
          <SafeAreaView style={styles.scrollcontainer}>
            <View style={styles.container}>
              <View style={{ marginTop: 15 }}></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "95%",
                }}
              >
                {fname ? (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: actionTypes.SET_ACCOUNT,
                        account: true,
                      });
                      dispatch({
                        type: actionTypes.SET_SCREEN,
                        screen: "Homescreen",
                      });
                      dispatch({
                        type: actionTypes.SET_TAB,
                        tab: "Home",
                      });
                      navigation.navigate("Account", {
                        screen: "Accounts",
                        initial: false,
                      });
                    }}
                    activeOpacity={0.95}
                    style={styles.signinbutton}
                  >
                    <Text style={styles.text}>Hi {fname}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setCheck(true);
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
                    activeOpacity={0.95}
                    style={styles.signinbutton}
                  >
                    <Text style={styles.text}>Sign in</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Image
                style={styles.logocontainer}
                source={require("../assets/LogoWhite.png")}
              ></Image>

              <TouchableOpacity
                onPress={() => {
                  dispatch({
                    type: actionTypes.SET_SCREEN,
                    screen: "Homescreen",
                  });
                  dispatch({
                    type: actionTypes.SET_TAB,
                    tab: "Home",
                  });
                  if (token) {

                    navigation.navigate("Deliver");
                  } else {
                    navigation.navigate("Signin");
                  }
                }}
                activeOpacity={0.95}
                style={styles.button}
              >
                <Text
                  style={{
                    fontFamily: "MonumentExtended-Regular",
                    color: "black",
                  }}
                >
                  ORDER NOW
                </Text>
              </TouchableOpacity>

              <Text style={[styles.header1, styles.top1]}>filthy offers</Text>

              <View style={styles.courselContainer}>
                <ImageBackground
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    paddingLeft: 30,
                  }}
                  source={require("../assets/Home1.png")}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MonumentExtended-Regular",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                    }}
                  >
                    weekend filth fest
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "MonumentExtended-Regular",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      marginTop: 9,
                      width: "58 %",
                    }}
                  >
                    20% OFF Fri-Sun between 6pm to 10pm with JUST EAT{" "}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 24,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "MonumentExtended-Regular",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        marginRight: 5,
                      }}
                    >
                      GIVE IT TO ME
                    </Text>
                    <Image
                      style={{ width: 10, height: 10 }}
                      source={require("../assets/arrow.png")}
                    ></Image>
                  </View>
                  <View style={{ marginTop: 8, width: "100%", height: "1%" }}>
                    <View
                      style={{
                        height: "80%",
                        width: "34.5%",
                        backgroundColor: "#ffffff",
                      }}
                    ></View>
                  </View>
                </ImageBackground>
              </View>
              <Text style={[styles.header1, styles.top2]}>
                get your filth coin
              </Text>

              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    width: "90%",
                    height: 329,
                  },
                ]}
              >

                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: actionTypes.SET_SCREEN,
                      screen: "Homescreen",
                    });
                    dispatch({
                      type: actionTypes.SET_TAB,
                      tab: "Home",
                    });
                    navigation.navigate("Home", { screen: "FilthyRewards" })
                  }}
                  style={{
                    marginTop: 12,

                    height: "100%",
                    width: "47%",
                  }}
                >
                  <ImageBackground
                    style={{
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    source={require("../assets/Home2.png")}
                  >
                    <Text
                      style={{
                        transform: [{ rotate: "270deg" }],
                        fontSize: 32,
                        fontFamily: "MonumentExtended-Regular",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        width: 260,
                        textAlign: "center",
                      }}
                    >
                      f$lth Coin
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <View style={{ width: "6%" }}></View>
                <View
                  style={{
                    marginTop: 12,

                    height: "100%",
                    width: "47%",
                  }}
                >
                  <View style={{ height: "47%" }}>
                    <ImageBackground
                      style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      source={require("../assets/Home3.png")}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "MonumentExtended-Regular",
                          textTransform: "uppercase",
                          color: "#FFFFFF",
                          padding: 21,
                        }}
                      >
                        buy wings, get cluck bucks
                      </Text>
                    </ImageBackground>
                  </View>
                  <View style={{ height: "6%" }}></View>
                  {customerid ?
                    <TouchableOpacity
                      onPress={() => {
                        dispatch({
                          type: actionTypes.SET_SCREEN,
                          screen: "Homescreen",
                        });
                        dispatch({
                          type: actionTypes.SET_TAB,
                          tab: "Home",
                        });
                        navigation.navigate("Home", { screen: "FilthyRewards" })
                      }}
                      style={{ height: "47%" }}
                    >
                      <ImageBackground
                        style={{
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        source={require("../assets/Home5.png")}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "MonumentExtended-Regular",
                              textTransform: "uppercase",
                              color: "#FFFFFF",
                              marginRight: 5,
                            }}
                          >
                            Rewards
                          </Text>
                          <Image
                            style={{ width: 14, height: 14 }}
                            source={require("../assets/arrow.png")}
                          ></Image>
                        </View>
                        <View
                          style={{
                            marginTop: 6,
                            width: "100%",
                            height: "1%",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              height: "80%",
                              width: "64.5%",
                              backgroundColor: "#ffffff",
                            }}
                          ></View>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={() => {
                        setCheck(false);
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
                      style={{ height: "47%" }}
                    >
                      <ImageBackground
                        style={{
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        source={require("../assets/Home5.png")}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "MonumentExtended-Regular",
                              textTransform: "uppercase",
                              color: "#FFFFFF",
                              marginRight: 5,
                            }}
                          >
                            sign up
                          </Text>
                          <Image
                            style={{ width: 14, height: 14 }}
                            source={require("../assets/arrow.png")}
                          ></Image>
                        </View>
                        <View
                          style={{
                            marginTop: 6,
                            width: "100%",
                            height: "1%",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              height: "80%",
                              width: "64.5%",
                              backgroundColor: "#ffffff",
                            }}
                          ></View>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  }
                </View>
              </View>
              <Text style={[styles.header1, styles.top2]}>
                you + wings = pure filth
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Calculator", { homecheck: "check" });
                }}
                style={styles.calculatorContainer}
              >
                <ImageBackground
                  style={{ height: "100%", paddingLeft: 30 }}
                  source={require("../assets/Home4.png")}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "MonumentExtended-Regular",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      marginTop: 40,
                    }}
                  >
                    Wing calculator 🍗{" "}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "MonumentExtended-Regular",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        marginRight: 5,
                      }}
                    >
                      we’ll sort the numbers
                    </Text>
                    <Image
                      style={{ width: 10, height: 10 }}
                      source={require("../assets/arrow.png")}
                    ></Image>
                  </View>
                  <View style={{ marginTop: 8, width: "100%", height: "1%" }}>
                    <View
                      style={{
                        height: "80%",
                        width: "64.5%",
                        backgroundColor: "#ffffff",
                      }}
                    ></View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <Text style={[styles.header1, styles.top2]}>
                join the filthy family
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",

                  marginTop: 12,
                  marginBottom: 10,
                  width: "90%",
                }}
              >
                {customerid ?
                  <TouchableOpacity
                    onPress={() => {
                      setCheck(true);
                      AsyncStorage.setItem("customerID", "");
                      AsyncStorage.setItem("firstname", "");
                      AsyncStorage.setItem("customerapikey", "");
                      AsyncStorage.setItem("lastname", "");
                      AsyncStorage.setItem("cart", JSON.stringify([]));
                      AsyncStorage.setItem("email", "");
                      AsyncStorage.setItem("token", "");
                      AsyncStorage.setItem("phoneno", "");
                      setTokenState(true);
                      // navigation.navigate("Home", { screen: "FilthyRewards" })
                    }}
                    style={{ width: "47%", height: 162 }}
                  >
                    <ImageBackground
                      style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      source={require("../assets/Home7.png")}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "MonumentExtended-Regular",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            marginRight: 5,
                          }}
                        >
                          Signout
                        </Text>
                        <Image
                          style={{ width: 14, height: 14, marginBottom: 4 }}
                          source={require("../assets/arrow.png")}
                        ></Image>
                      </View>
                      <View
                        style={{
                          marginTop: 6,
                          width: "100%",
                          height: "1%",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: "80%",
                            width: "73.5%",
                            backgroundColor: "#ffffff",
                          }}
                        ></View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => {
                      setCheck(false);
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
                    style={{ width: "47%", height: 162 }}
                  >
                    <ImageBackground
                      style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      source={require("../assets/Home7.png")}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "MonumentExtended-Regular",
                            textTransform: "uppercase",
                            color: "#FFFFFF",
                            marginRight: 5,
                          }}
                        >
                          create account
                        </Text>
                        <Image
                          style={{ width: 14, height: 14, marginBottom: 4 }}
                          source={require("../assets/arrow.png")}
                        ></Image>
                      </View>
                      <View
                        style={{
                          marginTop: 6,
                          width: "100%",
                          height: "1%",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: "80%",
                            width: "73.5%",
                            backgroundColor: "#ffffff",
                          }}
                        ></View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                }
                <View style={{ width: "6%" }}></View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: actionTypes.SET_SCREEN,
                      screen: "Homescreen",
                    });
                    dispatch({
                      type: actionTypes.SET_TAB,
                      tab: "Home",
                    });
                    navigation.navigate("Home", {
                      screen: "OrderHistory",
                    });
                  }}
                  style={{ width: "47%", height: 162 }}
                >
                  <ImageBackground
                    style={{
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    source={require("../assets/Home6.png")}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "MonumentExtended-Regular",
                          textTransform: "uppercase",
                          color: "#FFFFFF",
                          marginRight: 5,
                        }}
                      >
                        order history
                      </Text>
                      <Image
                        style={{ width: 14, height: 14, marginBottom: 4 }}
                        source={require("../assets/arrow.png")}
                      ></Image>
                    </View>
                    <View
                      style={{
                        marginTop: 6,
                        width: "100%",
                        height: "1%",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          height: "80%",
                          width: "73.5%",
                          backgroundColor: "#ffffff",
                        }}
                      ></View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <StatusBar style="auto" />
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  calculatorContainer1: {
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 1180,
    flexDirection: "row",
    elevation: 8,

    height: 200,
    width: 350,
  },

  createaccountContainer: {
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "row",

    marginTop: 50,
    elevation: 8,

    height: 150,
    width: 170,
  },
  orderhistoryContainer: {

    backgroundColor: "green",
    marginLeft: 0,
    flexDirection: "row",
    marginTop: 50,
    elevation: 8,

    height: 200,
    width: 170,
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
  },
  calculatorContainer: {

    marginTop: 12,

    height: 191,
    width: "90%",
  },
  courselContainer: {
    marginTop: 12,

    height: 186,
    width: "90%",
  },
  scrollcontainer: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollView: {
    backgroundColor: "black",
    height: "100vh",
  },

  containerr: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {
    color: "green",
    width: "50%",
  },

  imgcontainer: {
    flex: 1,
    resizeMode: "contain",
  },
  imgcontainer2: {
    flex: 1,
    resizeMode: "contain",
  },
  ImgViewer: {
    width: 100,
    height: 100,
  },
  container21: {
    flex: 1,
    paddingHorizontal: 10,
  },
  box: {
    height: 180,
    width: 500,
  },
  flithbox: {
    marginTop: 700,
    flex: 1,
    height: 50,
    width: 5,
  },
  flith1box: {
    flex: 4,
    height: 100,
    width: 100,
  },
  boxLabel: {
    minWidth: 80,
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  label: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "100",
  },
  previewContainer: {
    flexDirection: "row",
    width: "43%",
  },
  previewContainer1: {
    flexDirection: "row",
    width: "43%",
    color: "black",
  },
  previewContainer2: {
    paddingTop: 5,
    width: "43%",
    color: "black",
  },

  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 3,
    width: 50,
    textAlign: "center",
  },

  logocontainer: {
    height: 66,
    width: 114,
    marginTop: 30,
  },
  filthcoincontainer: {
    backgroundColor: "yellow",
    marginLeft: -250,
    flexDirection: "row",
    height: 210,
    width: 210,
    marginTop: 300,
  },
  rectangle: {
    flexDirection: "row",
  },
  buywingscontainer: {
    backgroundColor: "yellow",
    marginLeft: -250,
    flexDirection: "row",
    height: 210,
    width: 210,
    marginTop: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },

  sllider: {
    marginTop: 300,
    flex: 0.4,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  slllider: {
    marginTop: 25,
    flex: 0.5,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  signinbutton: {
    fontFamily: "MonumentExtended-Regular",
    color: "white",
    textDecorationLine: "underline",
    flexDirection: "row",
    textAlign: "left",
    width: "100%",
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  header1: {
    fontFamily: "MonumentExtended-Regular",
    color: "#F9F9F9",
    width: "90%",
    textTransform: "uppercase",
    fontSize: 14,
  },
  top1: {
    marginTop: 45,
  },
  top2: {
    marginTop: 38,
  },
  top3: {
    top: 911,
  },
  top4: {
    top: 1177,
  },
  rideforusbutton: {
    width: 45,
    backgroundColor: "#121212",
    marginTop: 17,
  },
  button: {
    borderRadius: 2,
    height: 41,
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 37,
  },
  text: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 13,
    width: "90%",
    color: "white",
    textDecorationLine: "underline",
    textTransform: "uppercase",
  },
  textorder: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: "wheat",
    borderRadius: 50,
  },
  controls: {
    width: "100%",
    marginBottom: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dotGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },
  dotActive: {
    backgroundColor: "#ffffff",
  },
  buttons: {
    fontSize: 14,
    color: "#ffffff",
    marginHorizontal: 14,
    padding: 15,
  },
});

export default Homescreen;
