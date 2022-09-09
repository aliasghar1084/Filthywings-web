import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  Pressable,
  StatusBar,
  Linking
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { TOKEN, URL } from "./ids&tokens";
import ImgViewer from "react-native-image-viewer-web";
import Required from "../assets/required.svg";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { MERCHANT_ID } from "./ids&tokens";
import Loading from "./loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
let interval = undefined;
const Signin = ({ navigation }) => {
  const [{ token, customerid, fname, lname, email, customerapikey, tab, screen }, dispatch] =
    useDataLayerValue();
  const [tokenState, setTokenState] = useState(false);
  const [check, setCheck] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);
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
      navigation.navigate("Signin");
    }
  }, [progress]);
  useEffect(() => {
    console.log('inner')
    let isMounted = true;
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
    AsyncStorage.getItem("customerID").then((item) => {
      dispatch({
        type: actionTypes.SET_CUSTOMERID,
        customerid: item,
      });
    });
    AsyncStorage.getItem("email").then((item) => {
      console.log(item)
      dispatch({
        type: actionTypes.SET_EMAIL,
        email: item,
      });
    });
    AsyncStorage.getItem("lastname").then((item) => {
      dispatch({
        type: actionTypes.SET_LNAME,
        lname: item,
      });
    });
    AsyncStorage.getItem("firstname").then((item) => {
      dispatch({
        type: actionTypes.SET_FNAME,
        fname: item,
      });
    });
    AsyncStorage.getItem("token")
      .then((item) => {
        if (item) {
          dispatch({
            type: actionTypes.SET_TOKEN,
            token: item,
          });
          navigation.navigate("Homescreen");
        }
        setPopup2(false);

        setDisabledw(false);
        setLoader(false);
      })
      .catch((err) => {
        if (isMounted) {
          console.log("error in getting msgs ", err);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [tokenState]);
  const forgotPassword = async () => {
    Linking.openURL("https://filthy-wings.slerpdemo.com/forgot_password");
    // let result = await WebBrowser.openBrowserAsync(
    //   "https://filthy-wings.slerpdemo.com/forgot_password"
    // );
  };
  const [loader, setLoader] = useState(false);
  let data = useState({});
  const [emailSignin, setEmailSignin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  let changeModalVisible = (bool) => {
    setForgetPassword(bool);
  };
  let [forgetPassword, setForgetPassword] = useState(false);
  const [running1, setRunning1] = useState(true);
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [disabledw, setDisabledw] = useState(false);
  function signupcss() {
    setRunning1(true);
  }
  function guest() {
    AsyncStorage.setItem("token", TOKEN);
    setTokenState(true);
  }
  const disablede = () => {
    setLoader(true);
    setPopup(false);
    setPopup2(false);
    setDisabledw(true);
    send();
  };
  function send() {
    data = {
      email: emailSignin,
      password: password,
    };
    if (data.email === "" || data.password === "") {
      setPopup(true);
      setLoader(false);
      setDisabledw(false);
    } else {
      setPopup(false);

      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          query: `
          query CustomerAuth($email: String!, $password: String!, $merchantId: ID) {
            customerAuth(email: $email, password: $password, merchantId: $merchantId) {
              id
              firstName
              lastName
              salutation
              email
              apiKey
              contactNum
              __typename
            }
          }
          `,
          variables: {
            merchantId: `${MERCHANT_ID}`,
            email: `${data.email}`,
            password: `${data.password}`,
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              if (res.data.customerAuth) {
                console.log(res)
                AsyncStorage.setItem("email", res.data.customerAuth.email);
                AsyncStorage.setItem(
                  "lastname",
                  res.data.customerAuth.lastName
                );
                AsyncStorage.setItem(
                  "firstname",
                  res.data.customerAuth.firstName
                );
                AsyncStorage.setItem(
                  "phoneno",
                  res.data.customerAuth.contactNum
                );
                AsyncStorage.setItem("customerID", res.data.customerAuth.id);
                AsyncStorage.setItem(
                  "customerapikey",
                  res.data.customerAuth.apiKey
                );
                AsyncStorage.setItem("token", TOKEN);
                setTokenState(true);
              } else {
                setPopup2(true);
                setDisabledw(false);
                setLoader(false);
              }
            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
      // setEmailSignin("");
      // setPassword("");
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
    <View style={{ height: '100vh' }}>
      {running ? (
        <Loading progress={progress} />
      ) : (
        <ScrollView bounces={false} style={styles.scrollView}>
          <MyStatusBar
            backgroundColor="black"
            barStyle="light-content" // Here is where you change the font-color
          />
          <View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.gap1]}
              onPress={() => {
                navigation.navigate(tab, { screen: screen })
              }
              }
            >
              <View style={styles.gap2}></View>
              <Image
                style={styles.backIcon}
                source={require("../assets/BackIcon.png")}
              />
            </TouchableOpacity>
            <View style={styles.container}>
              <Image
                style={styles.logocontainer}
                source={require("../assets/LogoWhite.png")}
              ></Image>
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
              <View style={styles.containe}>
                <View style={styles.size3}></View>
                <TouchableOpacity
                  style={styles.butto}
                  onPress={signupcss}
                  activeOpacity={0.95}
                >
                  <Text style={[styles.tixt]}> SIGN IN</Text>
                  <View style={styles.ylinealign}>
                    <Image
                      style={styles.size2}
                      source={require("../assets/yline.png")}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.rightbutto]}
                  onPress={() => navigation.navigate("Signup")}
                  activeOpacity={0.95}
                >
                  <Text style={[styles.tixt]}> SIGN UP</Text>
                  <View style={styles.vectoralign}>
                    <Image
                      style={styles.size2}
                      source={require("../assets/Vector.png")}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.size3}></View>
              </View>

              <View style={styles.containe1}>
                {popup && (
                  <Text style={styles.allwarning}>All fields are required</Text>
                )}
                {popup2 && (
                  <Text style={{ color: "red" }}>Wrong email or password</Text>
                )}
                <View>
                  <View style={styles.labelset}>
                    {!emailSignin.length && <Image
                      style={styles.labelWarning}
                      source={require("../assets/required.svg")}
                    ></Image>}
                    <Text style={styles.text1}>Email</Text>
                  </View>
                  <TextInput
                    onFocus={() => {
                      setCheck(false);
                    }}
                    outlineColor="rgba(155, 155, 155, 0.2)"
                    activeOutlineColor="rgba(242, 196, 0, 0.21)"
                    mode="outlined"
                    placeholder="example@email.com"
                    placeholderTextColor="#fff"
                    value={emailSignin}
                    onChangeText={(value) => setEmailSignin(value)}
                    keyboardType="email-address"
                    style={styles.emailinput1}
                    theme={{
                      colors: {
                        text: "#fff",
                      },
                    }}
                  />
                </View>
              </View>
              <View style={[styles.containe2]}>
                <View>
                  <View style={styles.labelset}>
                    {!password.length && (
                      <Image
                        style={styles.labelWarning}
                        source={require("../assets/required.svg")}
                      ></Image>
                    )}
                    <Text style={styles.text1}>Password</Text>
                  </View>
                  <View
                    onFocus={() => {
                      setCheck(true);
                    }}
                    onBlur={() => {
                      setCheck(false);
                    }}
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      height: 58,
                      marginTop: 6,
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: check
                        ? "rgba(242, 196, 0, 0.21)"
                        : "rgba(155, 155, 155, 0.2)",
                      borderWidth: check ? 2 : 1,
                      borderRadius: 5,
                      backgroundColor: "rgba(130, 130, 130, 0.09)",
                    }}
                  >
                    <TextInput
                      value={password}
                      onChangeText={(value) => setPassword(value)}
                      style={[
                        styles.passwordinput,
                        { marginBottom: 9, borderColor: "white" },
                      ]}
                      mode="outlined"
                      outlineColor="rgba(130, 130, 130, 0.00)"
                      activeOutlineColor="rgba(130, 130, 130, 0.00)"
                      activeOutlineColorAndroid="transparent"
                      placeholder="password"
                      placeholderTextColor="#fff"
                      theme={{
                        colors: {
                          text: "#fff",
                        },
                      }}
                      secureTextEntry={passwordVisible}
                    ></TextInput>
                    <Pressable
                      style={{ width: "10%" }}
                      onPress={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={passwordVisible ? "eye" : "eye-off"}
                        size={22}
                        color="#fff"
                        backgroundColor="#fff"
                      />
                    </Pressable>
                  </View>
                </View>


              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => forgotPassword()}
                style={styles.forgotmove}
              >
                <Text style={styles.forgotmovetext}>FORGOT PASSWORD?</Text>
              </TouchableOpacity>
              <View style={styles.signinbutton1}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                    backgroundColor: "#F2C400",
                    width: "90%",
                    marginTop: 200,
                    height: 41,
                  }}
                  disabled={disabledw}
                  activeOpacity={0.95}
                  onPress={disablede}
                >
                  <Text style={styles.signintext}>SIGN IN</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.oralign}>
                <View style={styles.orline}></View>
                <Text style={styles.ortext}>or</Text>
                <View style={styles.orline}></View>
              </View>
              <TouchableOpacity onPress={guest} style={styles.gap3}>
                <Text style={styles.guest}>CHECKOUT AS GUEST</Text>
              </TouchableOpacity>

              <View style={styles.guestalign}>
                <View style={styles.guestline}></View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelWarning: { marginTop: 2, width: 11, height: 11, marginRight: 3 },
  labelset: { display: "flex", flexDirection: "row", alignItems: "center" },
  datasend: { color: "green" },
  allwarning: { color: "#F2C400" },
  googleButtonalign: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  guestline: {
    height: "20%",
    width: "45%",
    backgroundColor: "#828282",
  },
  guestalign: {
    marginTop: 5,
    width: "100%",
    height: "1%",
    alignItems: "center",
  },
  guest: {
    color: "#828282",
    fontSize: 12,
    fontFamily: "MonumentExtended-Regular",
    marginTop: 10,
  },
  ortext: {
    width: "16%",
    textAlign: "center",
    fontSize: 16,
    height: 26,
    fontFamily: "MonumentExtended-Regular",
    textTransform: "uppercase",
    color: "#828282",
  },
  orline: {
    height: 1,
    width: "42%",
    backgroundColor: "#828282",
  },
  oralign: {
    display: "flex",
    flexDirection: "row",
    height: "2.7%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  signintext1: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#F2C400",
    width: "90%",
    marginTop: 20,
    height: 41,
  },
  signinbutton1: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  forgotmovetext: {
    color: "#828282",
    fontFamily: "MonumentExtended-Regular",
    fontSize: 10,
  },
  forgotmove: { marginTop: 15, alignItems: "flex-end", backgroundColor: 'blue' },
  passwordinput: {
    width: "90%",
    backgroundColor: "rgba(130, 130, 130, 0.0)",
    color: "white",
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
  },
  emailinput1: {
    width: "100%",
    backgroundColor: "rgba(130, 130, 130, 0.09)",
    fontSize: 14,
  },
  vectoralign: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  gapsize1: { marginTop: 20, width: 30 },
  size1: { height: "100%", width: "100%" },
  size3: { width: "5%" },
  size2: { width: "100%" },
  ylinealign: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  backIcon: { height: 30, width: 30, margin: 8 },
  gap4: { marginTop: 30 },
  gap3: { marginTop: 15 },
  gap2: { margin: 8 },
  gap1: { margin: 10 },
  buttonText1: {
    textAlign: "center",
    fontSize: 14,
    color: "#121212",
    textTransform: "uppercase",
    fontFamily: "MonumentExtended-Regular",
    backgroundColor: "#F2C400",
    padding: 10,
    width: "100 %",
  },
  buttonSet1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 21,
  },
  emailinput: {
    marginTop: 8,
    backgroundColor: "rgba(130, 130, 130, 0.09)",
    borderWidth: 1,
    borderColor: "rgba(155, 155, 155, 0.2)",
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
    color: "#ffffff",
    width: "100%",
  },
  emailinputalign: { alignItems: "center", width: "100%" },
  email: {
    marginTop: 24,
    flex: 1,
    flexDirection: "column",
  },
  resetPassword: {
    fontSize: 14,
    fontFamily: "MonumentExtended-Regular",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  cross: { height: 23, width: 23 },
  forgotPasswordheader: { flexDirection: "row-reverse" },
  forgotPassword: {
    position: "absolute",
    bottom: 49,
    backgroundColor: "white",
    width: "100%",
    height: 277,
    backgroundColor: "#121212",
    padding: 13,
  },
  resetpassword: {
    position: "absolute",
    bottom: 49,
    backgroundColor: "white",
    width: "100%",
    height: 427,
    backgroundColor: "#121212",
    padding: 13,
  },
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  containe1: {
    marginTop: 33,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%",
  },
  containe2: {
    marginTop: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%",
  },
  containe: {
    marginTop: 46,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  butto: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 40,
  },
  rightbutto: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 40,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "yellow",
  },
  leftHeader: {
    marginLeft: 20,
    padding: 10,
    alignSelf: "flex-start",
    backgroundColor: "red",
  },
  rightHeader: {
    marginRight: 20,
    padding: 10,
    alignSelf: "flex-end",
    backgroundColor: "red",
  },
  line1: {
    height: 1,
    width: 195,
    backgroundColor: "#ffffff",
    top: 80,
    display: "flex",
  },
  line: {
    alignItems: "center",
    justifyContent: "center",
    top: 20,
    height: 5,
    width: 200,
    marginTop: 20,
    color: "white",
  },
  checkout: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 100,
    marginRight: 20,
    top: 615,
    height: 5,
    width: 200,
    marginTop: 80,
  },
  or: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 25,
    marginRight: 20,
    height: 35,
    width: "90%",
    marginTop: 10,
  },
  ore: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 25,
    marginRight: 20,
    height: 35,
    width: "90%",
    marginTop: 10,
  },
  forgotText: {
    top: 10,
    color: "white",
    marginLeft: 210,
  },
  baseText: {
    color: "white",
    fontWeight: "bold",
  },
  innerText: {
    top: 10,
    color: "white",
    fontWeight: "bold",
  },
  continuewithgoogle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  tixt: {
    padding: 10,
    fontSize: 16,
    fontFamily: "MonumentExtended-Regular",
    color: "white",
  },
  signintext: {
    marginTop: 10,
    fontSize: 14,
    color: "black",
    fontFamily: "MonumentExtended-Regular",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textDecorationLine: "underline",
    fontFamily: "MonumentExtended-Ultrabold",
  },
  text1: {
    fontSize: 12,
    color: "white",
    fontFamily: "Raleway_500Medium",
  },
  button2: {
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 170,
    height: 41,
    right: 14.5,
    top: 30,
    backgroundColor: "transparent",
    borderRadius: 2,
  },
  button1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 170,
    height: 41,
    left: 14.5,
    top: 40,

    backgroundColor: "transparent",
    borderRadius: 2,
  },
  fbButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 41,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#4267B2",
    borderRadius: 2,
  },
  googleButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    top: 20,
    width: "90%",
    height: 41,
    backgroundColor: "white",
    borderRadius: 2,
  },
  signinButton: {
    marginLeft: 15,
    marginRight: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 365,
    height: 41,
    left: 10,
    top: 600,
    backgroundColor: "#F2C400",
    borderRadius: 2,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backcontainer: {
    height: 30,
    width: 30,
  },
  logocontainer: {
    height: 66,
    width: 114,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollcontainer: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#121212",
    height: "100%",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Signin;
