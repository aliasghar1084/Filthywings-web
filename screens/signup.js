import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import Required from "../assets/required.svg";
import { TextInput } from "react-native-paper";
import { MERCHANT_ID, TOKEN, URL } from "./ids&tokens";
import { useDataLayerValue } from '../DataLayer';
import { actionTypes } from '../Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Signin = ({ navigation }) => {
  const [{ token, customerid, fname, lname, email, phoneno }, dispatch] = useDataLayerValue();
  const [tokenState, setTokenState] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [emailSignup, setEmailSignup] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [popup, setPopup] = useState(false);
  const [disabledw, setDisabledw] = useState(false)
  const [popup2, setPopup2] = useState(false);
  const [loader, setLoader] = useState(false)
  const [check, setCheck] = useState(false)
  const disablede = () => {
    setLoader(true)
    setPopup(false)
    setPopup2(false)
    setDisabledw(true)
    senddata();

  }
  useEffect(() => {
    if (tokenState) {

      AsyncStorage.getItem('phoneno')
        .then((item) => {
          dispatch({
            type: actionTypes.SET_PHONENO,
            phoneno: item
          })
        })
      AsyncStorage.getItem('customerID')
        .then((item) => {
          dispatch({
            type: actionTypes.SET_CUSTOMERID,
            customerid: item
          })
        })
      AsyncStorage.getItem('email')
        .then((item) => {
          dispatch({
            type: actionTypes.SET_EMAIL,
            email: item
          });
        })
      AsyncStorage.getItem('lastname')
        .then((item) => {
          dispatch({
            type: actionTypes.SET_LNAME,
            lname: item
          });
        })
      AsyncStorage.getItem('firstname')
        .then((item) => {
          dispatch({
            type: actionTypes.SET_FNAME,
            fname: item
          });
        })
      AsyncStorage.getItem('token')
        .then((item) => {
          if (item) {
            dispatch({
              type: actionTypes.SET_TOKEN,
              token: item
            });
            setPopup2(false)
            setLoader(false)
            navigation.navigate("Homescreen");
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.log('error in getting msgs ', err);
          }
        });
    }
  }, [tokenState])
  let data1 = useState({

  });
  async function senddata() {

    data1 = {
      firstName: first,
      lastName: last,
      email: emailSignup,
      password: password,
      phoneNo: phoneNo
    };
    if (data1.firstName === '' || data1.lastName === '' || data1.email === '' || data1.password === '' || data1.phoneNo === '') {
      setPopup(true);
      setLoader(false)
    }
    else {
      setPopup(false);

      await fetch(URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          query: `
          mutation CreateCustomer($firstName: String!, $lastName: String!, $email: String!, $password: String!, $passwordConfirmation: String!, $merchantId: ID!, $contactNum: String!, $birthdate: String, $marketingOptIn: Boolean) {
            createCustomer(firstName: $firstName, lastName: $lastName, email: $email, password: $password, passwordConfirmation: $passwordConfirmation, merchantId: $merchantId, contactNum: $contactNum, birthdate: $birthdate, marketingOptIn: $marketingOptIn) {
              id
              firstName
              lastName
              email
              contactNum
              salutation
              apiKey
            }
          }
          `,
          variables:
          {
            "merchantId": `${MERCHANT_ID}`,
            "firstName": data1.firstName,
            "lastName": data1.lastName,
            "email": data1.email,
            "password": data1.password,
            "passwordConfirmation": data1.password,
            "contactNum": data1.phoneNo,
            "birthdate": "2001-12-03",
            "marketingOptIn": false
          }
        })
      })
        .then((response) => {
          response.json()
            .then((res) => {
              if (res.data.createCustomer) {
                AsyncStorage.setItem('email', data1.email)
                AsyncStorage.setItem('lastname', data1.lastName)
                AsyncStorage.setItem('firstname', data1.firstName)
                AsyncStorage.setItem('phoneno', data1.phoneNo)
                AsyncStorage.setItem('customerID', res.data.createCustomer.id)
                AsyncStorage.setItem('token', TOKEN)
                setTokenState(true)
              }
              else {
                setPopup2(true)
                setLoader(false)
              }
            })
            .catch((err) => {
              console.log('error in getting msgs ', err);
            });
        })
        .catch((err) => {
          console.log('error in getting msgs ', err);
        });

    }

    setDisabledw(false)
    // setEmailSignup("")
    // setPassword("")
    // setFirst("")
    // setLast("")
  }
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <View style={styles.scrollcontainer}>

      <KeyboardAvoidingView behavior="position">
        <MyStatusBar
          backgroundColor="black"
          barStyle="light-content" // Here is where you change the font-color
        />
        <ScrollView bounces={false} style={styles.scrollView}>

          <TouchableOpacity
            activeOpacity={0.5}
            style={[{ margin: 10 }]}
            onPress={() => navigation.navigate("Homescreen")}
          >
            <View style={{ margin: 8 }}></View>
            <Image
              style={{ height: 30, width: 30, margin: 8 }}
              source={require("../assets/BackIcon.png")}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <Image
              style={styles.logocontainer}
              source={require("../assets/LogoWhite.png")}
            ></Image>

            <View style={styles.containe}>
              <TouchableOpacity style={[styles.butto]} activeOpacity={0.95}

                onPress={() => navigation.navigate("Signin")}>

                <Text style={styles.tixt}> SIGN IN</Text>

                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{ width: "100%" }}
                    source={require("../assets/Vector.png")}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.rightbutto]} activeOpacity={0.95}>

                <Text style={styles.tixt}> SIGN UP</Text>

                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{ width: "100%" }}
                    source={require("../assets/yline.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
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
            <View style={styles.containe13}>
              {popup && <Text style={{ color: '#F2C400' }}>All fields are required</Text>}
              {popup2 && <Text style={{ color: 'red' }}>User already exist</Text>}
              <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {!first.length && <Image
                    style={{ marginTop: 2, width: 11, height: 11, marginRight: 3 }}
                    source={require("../assets/required.svg")}
                  ></Image>}
                  <Text style={styles.text1}>First Name</Text>
                </View>
                <TextInput
                  outlineColor="rgba(155, 155, 155, 0.2)"
                  activeOutlineColor="rgba(242, 196, 0, 0.21)"
                  mode="outlined"
                  placeholder="First Name"
                  placeholderTextColor="#fff"
                  value={first}
                  onChangeText={value => setFirst(value)}
                  theme={{
                    colors: {
                      text: '#fff',
                    },
                  }}
                  style={{
                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                    fontFamily: "Raleway_400Regular",
                    fontSize: 14,
                    color: "#ffffff",
                  }}
                />
              </View>
            </View>
            <View style={styles.containe1}>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {!last.length && <Image
                    style={{ marginTop: 2, width: 11, height: 11, marginRight: 3 }}
                    source={require("../assets/required.svg")}
                  ></Image>}
                  <Text style={styles.text1}>Last Name</Text>
                </View>

                <TextInput
                  outlineColor="rgba(155, 155, 155, 0.2)"
                  activeOutlineColor="rgba(242, 196, 0, 0.21)"
                  mode="outlined"
                  placeholder="Last Name"
                  placeholderTextColor="#fff"
                  value={last}
                  onChangeText={value => setLast(value)}
                  theme={{
                    colors: {
                      text: '#fff',
                    },
                  }}
                  style={{
                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                    fontFamily: "Raleway_400Regular",
                    fontSize: 14,
                    color: "#ffffff",
                  }}
                />
              </View>
            </View>
            <View style={styles.containe1}>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {!phoneNo.length && <Image
                    style={{ marginTop: 2, width: 11, height: 11, marginRight: 3 }}
                    source={require("../assets/required.svg")}
                  ></Image>}
                  <Text style={styles.text1}>Phone no</Text>
                </View>

                <TextInput

                  keyboardType='numeric'
                  outlineColor="rgba(155, 155, 155, 0.2)"
                  activeOutlineColor="rgba(242, 196, 0, 0.21)"
                  mode="outlined"
                  placeholder="Phone no"
                  placeholderTextColor="#fff"
                  value={phoneNo}
                  // keyboardType="email-address"
                  theme={{
                    colors: {
                      text: '#fff',
                    },
                  }}
                  onChangeText={value => setPhoneNo(value)}
                  style={{
                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                    fontFamily: "Raleway_400Regular",
                    fontSize: 14,
                    color: "#ffffff",
                  }}
                />
              </View>
            </View>
            <View style={styles.containe1}>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {!emailSignup.length && <Image
                    style={{ marginTop: 2, width: 11, height: 11, marginRight: 3 }}
                    source={require("../assets/required.svg")}
                  ></Image>}
                  <Text style={styles.text1}>Email</Text>
                </View>

                <TextInput
                  outlineColor="rgba(155, 155, 155, 0.2)"
                  activeOutlineColor="rgba(242, 196, 0, 0.21)"
                  mode="outlined"
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  value={emailSignup}
                  keyboardType="email-address"
                  theme={{
                    colors: {
                      text: '#fff',
                    },
                  }}
                  onChangeText={value => setEmailSignup(value)}
                  style={{
                    backgroundColor: "rgba(130, 130, 130, 0.09)",
                    fontFamily: "Raleway_400Regular",
                    fontSize: 14,
                    color: "#ffffff",
                  }}
                />
              </View>
            </View>

            <View style={styles.containe2}>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {!password.length && <Image
                    style={{ marginTop: 2, width: 11, height: 11, marginRight: 3 }}
                    source={require("../assets/required.svg")}
                  ></Image>}
                  <Text style={styles.text1}>Password</Text>
                </View>
                <View onFocus={() => {
                  setCheck(true)
                }}
                  onBlur={() => {
                    setCheck(false)
                  }} style={{
                    flexDirection: 'row', width: '100%', height: 58, marginTop: 6, alignContent: 'center', alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: check ? 'rgba(242, 196, 0, 0.21)' : 'rgba(155, 155, 155, 0.2)', borderWidth: check ? 2 : 1, borderRadius: 5, backgroundColor: "rgba(130, 130, 130, 0.09)"
                  }}>
                  <TextInput
                    outlineColor="rgba(130, 130, 130, 0.00)"
                    activeOutlineColor="rgba(130, 130, 130, 0.00)"
                    mode="outlined"
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={value => setPassword(value)}
                    theme={{
                      colors: {
                        text: '#fff',
                      },
                    }}
                    style={{
                      backgroundColor: "rgba(130, 130, 130, 0.00)",
                      fontFamily: "Raleway_400Regular",
                      fontSize: 14,
                      color: "#ffffff",
                      width: '90%',
                      marginBottom: 8
                    }}
                    secureTextEntry={passwordVisible}
                  />
                  <Pressable style={{ width: '10%' }} onPress={() => { setPasswordVisible(!passwordVisible) }}>
                    <MaterialCommunityIcons name={passwordVisible ? "eye" : "eye-off"} size={22} color="#fff" backgroundColor="#fff" />
                  </Pressable>
                </View>
              </View>

              <View style={{ marginTop: 15, width: "100%" }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#828282",
                    fontFamily: "Raleway_500Medium",
                  }}
                >
                  Passwords must include a minimum of 8 characters, a lowercase
                  letter, an uppercaseletter and a number.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "#F2C400",
                  width: "90%",
                  marginTop: 30,
                  height: 41,
                }}
                disabled={disabledw}
                onPress={disablede}
                activeOpacity={0.95}
              >
                <Text style={styles.signintext}>SIGN UP</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                // height: 2,
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  height: 1,
                  width: "42%",
                  backgroundColor: "#828282",
                }}
              ></View>
              <Text
                style={{
                  width: "16%",
                  textAlign: "center",
                  fontSize: 16,
                  // height: "100%",
                  fontFamily: "MonumentExtended-Regular",
                  textTransform: "uppercase",
                  color: "#828282",
                }}
              >
                or
              </Text>
              <View
                style={{
                  height: 1,
                  width: "42%",
                  backgroundColor: "#828282",
                }}
              ></View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Text
                style={{
                  color: "#828282",
                  fontSize: 12,
                  fontFamily: "MonumentExtended-Regular",
                  marginTop: 10,
                }}
              >
                CHECKOUT AS GUEST
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: "45%",
                backgroundColor: "#828282",
              }}
            ></View>
          </View>
          <View style={{ marginTop: 120 }}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  containe13: {
    marginTop: 33,
    flex: 1,
    flexDirection: "column",
    width: "90%",
  },
  containe1: {
    marginTop: 10,
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
    color: "white",
    fontFamily: "MonumentExtended-Regular",
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
    height: Dimensions.get("window").height - 10
  },
  scrollView: {
    backgroundColor: "#121212",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Signin;
