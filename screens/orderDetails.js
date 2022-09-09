import { styles } from "../stylesheet";

import React, { useState, useEffect, useCallback } from "react";

// import AppLoading from "expo-app-loading";
import YourOrder from "../Components/yourOrder";
import {
    // StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    // Button,
    Image,
    TouchableOpacity,
    Alert,
    Platform
} from "react-native";
import { TOKEN, URL, PUBLISHABLE_KEY } from "./ids&tokens";
// import { StripeProvider } from "@stripe/stripe-react-native";
// import { useStripe } from "@stripe/stripe-react-native";
import Aalert from "../Components/alert";
import OrderBillInfo from "../Components/orderBillInfo";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OrderDetails = ({ navigation, route, userJourney }) => {
    const [
        { ordertotalprice, orderitems, orderaddress
            , ordertime, updatedaddress, clientSecret, ephemeralKey, stripecustomerid, cart, fixTime, ordercartid, alert },
        dispatch
    ] = useDataLayerValue();
    let totalprice = parseFloat(ordertotalprice)
    totalprice = totalprice.toFixed(2);
    // const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [emptyCart, setEmptyCart] = useState(false)
    const [yourOrder, setYourOrder] = React.useState(true);

    const [delivering, setDelivering] = React.useState(true);
    useFocusEffect(
        useCallback(() => {
            fetch(URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                    query: `
                    query MyQuery {
                        orders(where: {cart_id: {_eq: "${ordercartid}"}}) {
                          cart_id
                          store {
                            address {
                              city
                              country
                              contact_num
                              zip
                                line_1
                                line_2
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
                                type: actionTypes.SET_ORDERADDRESS,
                                orderaddress: res.data.orders[0].store.address,
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
        <View style={styles.container}>
            <MyStatusBar
                backgroundColor="black"
                barStyle="light-content" // Here is where you change the font-color
            />
            {Platform.OS === "ios" ? (
                <View></View>
            ) : (
                <View style={{ marginTop: 33 }}></View>
            )}

            {alert ? <Aalert navigation={navigation} tab1={"Account"} screen1={"OrderDetails"} /> : <View></View>}
            <View style={styles.orderInfosSet}>
                <TouchableOpacity onPress={() => navigation.navigate("Home", { screen: "OrderHistory" })}>
                    <Image
                        style={styles.backicon}
                        source={require("../assets/BackIcon.png")}
                    ></Image>
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.infoSet1, { width: "100%" }]}
                        onPress={() => {
                            setYourOrder(!yourOrder);
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
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
                            <Text style={styles.orderInfoHeader}>order details</Text>
                        </View>
                        <View style={{ marginTop: 10 }}></View>
                        {yourOrder ? <View>
                            {orderitems.map((element, index) => {
                                return (
                                    <View key={index} style={[styles.infoSet, { width: '100%' }]}>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
                                            <Text style={[{
                                                color: "#828282",
                                                fontFamily: "Raleway_700Bold",
                                                fontSize: 12,
                                            }, { width: '18%' }]}>{element.quantity} X</Text>
                                            <Text style={[{
                                                color: "#828282",
                                                fontFamily: "Raleway_700Bold",
                                                fontSize: 12,
                                            }, { width: '82%' }]}>The {element.productName} - {element.productCategory} chicken 😈</Text>
                                        </View>
                                        <View style={{ width: '5%' }}></View>
                                        <View style={{ width: '15%' }}><Text style={[{
                                            color: "#828282",
                                            fontFamily: "Raleway_700Bold",
                                            fontSize: 12,
                                        }]}>£{element.amount}</Text></View>
                                    </View>
                                )
                            })}
                            <View style={{ paddingTop: 15, paddingBottom: 15 }}>
                                <View style={styles.flexrow}>
                                    <Text style={styles.orderInfoText5}>Subtotal</Text>
                                    <Text style={styles.orderInfoText5}>£{totalprice}</Text>
                                </View>
                                <View style={styles.flexrow}>
                                    <Text style={styles.orderInfoText5}>Delivery</Text>
                                    <Text style={styles.orderInfoText5}>£0.00</Text>
                                </View>
                                <View style={styles.flexrow}>
                                    <Text style={styles.orderInfoText5}>Small Order Fee</Text>
                                    <Text style={styles.orderInfoText5}>£0.00</Text>
                                </View>
                                <View style={styles.flexrow}>
                                    <Text style={styles.orderInfoText3}>Order Total</Text>
                                    <Text style={styles.orderInfoText3}>£{totalprice}</Text>
                                </View>
                            </View>
                        </View> : null}
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
                            <Text style={styles.orderInfoHeader}>Collection details</Text>
                        </View>
                        {delivering ? (
                            <View style={styles.gap1}>

                                <Text style={{
                                    color: "#828282",
                                    fontFamily: "Raleway_700Bold",
                                    fontSize: 12,
                                }}>
                                    Collection Time - {ordertime}
                                </Text>
                                {orderaddress.line_1 ?
                                    <Text style={[{
                                        color: "#828282",
                                        fontFamily: "Raleway_700Bold",
                                        fontSize: 12,
                                    }, { width: "43%" }]}>
                                        {orderaddress.line_1},
                                    </Text>
                                    : <View></View>}
                                {orderaddress.line_2 ?
                                    <Text style={[{
                                        color: "#828282",
                                        fontFamily: "Raleway_700Bold",
                                        fontSize: 12,
                                    }, { width: "43%" }]}>
                                        {orderaddress.line_2},
                                    </Text>
                                    : <View></View>}
                                {orderaddress.country ?
                                    <Text style={[{
                                        color: "#828282",
                                        fontFamily: "Raleway_700Bold",
                                        fontSize: 12,
                                    }, { width: "43%" }]}>
                                        {orderaddress.country},
                                    </Text>
                                    : <View></View>}
                                {orderaddress.zip ?
                                    <Text style={[{
                                        color: "#828282",
                                        fontFamily: "Raleway_700Bold",
                                        fontSize: 12,
                                    }, { width: "43%" }]}>
                                        {orderaddress.zip}
                                    </Text>
                                    : <View></View>}
                            </View>
                        ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.trackYourOrder, { width: "100%" }]}
                        onPress={() => navigation.navigate("OrderTracker", {})}
                    >
                        <Text style={styles.trackYourOrderButton}>track my order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default OrderDetails;
