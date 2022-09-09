import React, { useCallback } from "react";
// import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import { styles } from "../stylesheet";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDataLayerValue } from "../DataLayer";
import { TOKEN, URL } from "./ids&tokens";
import { actionTypes } from "../Reducer";
import YourOrder from "../Components/yourOrder";
export default function CookingYourFilth({ navigation }) {
  const [
    { updatedaddress, saveorder, tab, screen, cartid, transid, fixTime, storeAddress, },
    dispatch,
  ] = useDataLayerValue();
  const [orderThanks, setOrderThanks] = React.useState(false);
  const [yourOrder, setYourOrder] = React.useState(true);
  const [delivering, setDelivering] = React.useState(true);
  useFocusEffect(
    useCallback(() => {
      console.log('cartid', cartid)
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          query: `
                  query getOrder($cartId: uuid) {
                    orders(where:{cart_id:{_eq: $cartId}}) {
                      transaction_id
                    }
                  }
          
                  `,
          variables: {
            cartId: `${cartid}`,
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              dispatch({
                type: actionTypes.SET_TRANSID,
                transid: res.data.orders[0].transaction_id,
              });
            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
    }, [])
  );
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

      <View style={styles.headerset}>
        <ImageBackground
          resizeMode="cover"
          source={require("../assets/Forks.png")}
          style={styles.image}
        >

          <TouchableOpacity
            style={{ width: "90%" }}
            onPress={() => navigation.navigate("Home", { screen: "Homescreen" })}
          >
            <Image
              style={[styles.backicon, { marginBottom: 20 }]}
              source={require("../assets/BackIcon.png")}
            ></Image>
          </TouchableOpacity>
          <View style={styles.logoWithText}>
            <Image
              style={styles.logo}
              source={require("../assets/LogoWhite.png")}
            ></Image>
            <Text style={styles.text}>
              cookin’ up your filth right about now 🔥
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.orderInfosSet}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', }}>
          <Image
            style={{
              height: 23,
              width: 23,
            }}
            source={require("../assets/checked.png")}
          ></Image>
          <Text style={styles.checkboxText}>Thank you for your order</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.infoSet1, { width: "100%" }]}
            onPress={() => {
              setYourOrder(!yourOrder);
            }}
          >
            <View style={styles.flexrow2}>
              {yourOrder ? (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/chevron-arrow-down.png")}
                ></Image>
              ) : (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/right-chevron.png")}
                ></Image>
              )}
              <Text style={styles.orderInfoHeader}>your order #{transid}</Text>
            </View>
            {yourOrder ? (
              <View>
                {saveorder.map((element, index) => {
                  return (
                    <View >
                      <View key={index} style={styles.infoSet}>
                        <Text style={{
                          color: "#828282",
                          // textTransform: "uppercase",
                          fontFamily: "Raleway_700Bold",
                          fontSize: 12,
                          width: 250,
                        }}>
                          The {element.productName} - {element.productCategory}{" "}
                          chicken 😈
                        </Text>
                        <Text style={{
                          color: "#828282",
                          // textTransform: "uppercase",
                          fontFamily: "Raleway_700Bold",
                          fontSize: 10,
                        }}>
                          X{element.quantity}
                        </Text>
                      </View>
                      {
                        element.productTotal === undefined ? <View></View> :
                          element.productTotal.map((ele, index) => {
                            return (
                              <View style={{
                                width: '100%', flexDirection: 'row', alignItems: 'space-between'
                                , justifyContent: 'space-between'
                              }} >
                                <Text style={{
                                  color: "#828282",
                                  fontFamily: "Raleway_700Bold",
                                  fontSize: 10,
                                  width: '75%'
                                }}>{ele.productVariantName}</Text>
                                <View style={{ width: '5%' }}></View>
                                <Text></Text>
                                <Text style={{
                                  color: "#828282",
                                  textAlign: 'right',
                                  fontFamily: "Raleway_700Bold",
                                  fontSize: 10,
                                  width: '15%'
                                }}>+£{ele.addsOnPrize}</Text></View>
                            )
                          })
                      }
                    </View>
                  );
                })}
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.infoSet2, { width: "100%" }]}
            onPress={() => {
              setDelivering(!delivering);
            }}
          >
            <View style={styles.flexrow2}>
              {delivering ? (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/chevron-arrow-down.png")}
                ></Image>
              ) : (
                <Image
                  style={styles.chevronSet}
                  source={require("../assets/right-chevron.png")}
                ></Image>
              )}
              <Text style={styles.orderInfoHeader}>Collection Details</Text>
            </View>
            {delivering ? (
              <View style={styles.gap1}>
                <Text style={{
                  color: "#828282",
                  fontFamily: "Raleway_700Bold",
                  fontSize: 12,
                }}>
                  Collection Time - {fixTime}
                </Text>
                <View style={{ flexDirection: "column", width: '43%' }}>
                  {storeAddress.line_1 ?
                    <Text style={[{
                      color: "#828282",
                      fontFamily: "Raleway_700Bold",
                      fontSize: 12,
                    }]}>
                      {storeAddress.line_1},
                    </Text>
                    : <View></View>}
                  {storeAddress.line_2 ?
                    <Text style={[{
                      color: "#828282",
                      fontFamily: "Raleway_700Bold",
                      fontSize: 12,
                    }]}>
                      {storeAddress.line_2},
                    </Text>
                    : <View></View>}
                  {storeAddress.city ?
                    <Text style={[{
                      color: "#828282",
                      fontFamily: "Raleway_700Bold",
                      fontSize: 12,
                    }]}>
                      {storeAddress.city},
                    </Text>
                    : <View></View>}
                  {storeAddress.zip ?
                    <Text style={[{
                      color: "#828282",
                      fontFamily: "Raleway_700Bold",
                      fontSize: 12,
                    }]}>
                      {storeAddress.zip}
                    </Text>
                    : <View></View>}
                </View>
                <View style={{ width: "57%" }}></View>
              </View>
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "PlpCollection",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Wings",
              });
              navigation.navigate("PlpCollection");
            }}
            style={[styles.paynowT, { width: "100%" }]}
          >
            <Text style={styles.payNow}>back to menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.trackYourOrder, { width: "100%" }]}
            onPress={() => navigation.navigate("FollowYourFilth", {})}
          >
            <Text style={styles.trackYourOrderButton}>Track My Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
