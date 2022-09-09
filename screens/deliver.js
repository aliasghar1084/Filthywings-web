import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Linking,
  ActivityIndicator,
  Platform
} from "react-native";
import React from "react";
import { TOKEN, URL, MERCHANT_ID } from "./ids&tokens";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import Hyperlink from "react-native-hyperlink";
import * as WebBrowser from "expo-web-browser";
import Alert from "../Components/alert";
const url =
  "https://www.ubereats.com/store/filthy-wings/AqCIKSLASNeOiatv8uEEVw?diningMode=DELIVERY";
const Deliver = ({ navigation }) => {
  const [{ alert, fulfilmentType, city, customerid, tab, screen }, dispatch] =
    useDataLayerValue();
  const deliver = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.ubereats.com/store/filthy-wings/AqCIKSLASNeOiatv8uEEVw?diningMode=DELIVERY"
    );
  };
  const collect = () => {
    dispatch({
      type: actionTypes.SET_SCREEN,
      screen: "Deliver",
    });
    dispatch({
      type: actionTypes.SET_TAB,
      tab: "Home",
    });
    dispatch({
      type: actionTypes.SET_ALERT,
      alert: "Collection from",
    });
    dispatch({
      type: actionTypes.SET_FULFILMENTTYPE,
      fulfilmentType: "pickup",
    });
    // fetch(URL, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     Authorization: `Bearer ${TOKEN}`,
    //   },

    //   body: JSON.stringify({
    //     query: `
    //     query MyQuery {
    //       customers_by_pk(id: "${customerid}") {
    //         merchant{
    //           stores {
    //             address {
    //               zip
    //             }
    //           }
    //         }
    //       }
    //     }

    //     `,
    //     variables: {},
    //   }),
    // })
    //   .then((response) => {
    //     response
    //       .json()
    //       .then((res) => {
    //         dispatch({
    //           type: actionTypes.SET_EACHZIP,
    //           eachzip: res.data.customers_by_pk.merchant.stores,
    //         });
    //       })
    //       .catch((err) => {
    //         console.log("error in getting msgs ", err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log("error in getting msgs ", err);
    //   });
    navigation.navigate("Wings", { screen: "CollectionLocation" });
  };
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <View style={styles.scrollcontainer}>

      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content" // Here is where you change the font-color
      />
      {Platform.OS === "ios" ? (
        <View></View>
      ) : (
        <View style={{ marginTop: 33 }}></View>
      )}
      <ScrollView bounces={false} style={styles.scrollView}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/gg.png")}
            resizeMode="cover"
            style={styles.image}
          >
            <View>
              {/* <View style={{ margin: 10 }}></View> */}
              <TouchableOpacity style={{ padding: 15 }} onPress={() => {
                if (tab == "Home" && screen == "Deliver") {
                  navigation.navigate("Homescreen")
                }
                else {
                  navigation.navigate(tab, { screen: screen })
                }

              }}>
                <Image
                  style={[styles.backicon, { margin: 4 }]}
                  source={require("../assets/BackIcon.png")}
                />
              </TouchableOpacity>
              <View style={{ display: "flex", alignItems: "center" }}>
                <Image
                  style={{
                    top: 188,
                    position: "absolute",
                    height: 332,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                  }}
                  source={require("../assets/blurLoading.png")}
                ></Image>
                <View style={styles.logocontainer}>
                  <Image
                    style={styles.tinyLogo}
                    source={require("../assets/trans.png")}
                  />
                </View>
                <Text style={styles.text2}>TIME TO GET SAUCY</Text>
                <Text style={styles.text1}>WHERE ARE YOU WINGIN'?</Text>

                <TouchableOpacity
                  onPress={collect}
                  // activeOpacity={0.95}
                  style={styles.button1}
                >
                  <Text style={styles.text}>I'LL COLLECT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  // activeOpacity={0.95}
                  style={styles.button1}
                  onPress={() => {
                    deliver();
                  }}
                >
                  <Text style={styles.text}>DELIVER TO ME</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text2: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 24,
    color: "white",
    marginLeft: 10,
    marginTop: 85,
    borderRadius: 2,
  },
  text1: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 14,
    color: "white",
    marginTop: 15,
  },

  button1: {
    alignItems: "center",
    padding: 8,
    width: "90 %",
    height: 41,
    marginTop: 35,

    backgroundColor: "white",
    borderRadius: 2,
  },
  button2: {
    marginLeft: 20,
    marginRight: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 361,
    height: 41,
    left: 14.5,
    top: 485.42,

    backgroundColor: "white",
    borderRadius: 2,
  },
  button3: {
    marginLeft: 20,
    marginRight: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 361,
    height: 41,
    left: 14.5,
    top: 553.42,

    backgroundColor: "white",
    borderRadius: 2,
  },
  text: {
    fontFamily: "MonumentExtended-Regular",
    fontSize: 14,
    color: "black",
  },
  backicon: {
    height: 23,
    width: 23,
  },
  pos: {
    marginTop: 100,
  },
  logocontainer: {
    marginTop: 70,
  },
  scrollcontainer: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    height: 810,
  },
  image: {
    flex: 1,
  },
});
export default Deliver;
