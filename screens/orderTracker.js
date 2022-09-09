import React, { useState, useEffect, useCallback } from "react";
import { styles } from "../stylesheet";
// import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Platform
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TOKEN } from "./ids&tokens";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
let interval = undefined;
export default function OrderTracker({ navigation }) {
    const [
        {
            ordercartid,
            customerid,
            customerapikey,
            transid
        },
        dispatch,
    ] = useDataLayerValue();
    const [orderStatus, setOrderStatus] = useState("")
    const [orderReceived, setOrderReceived] = React.useState(true);
    const [cooking, setCooking] = React.useState(false);
    const [onWay, setOnWay] = React.useState(false);
    const [delivered, setDelivered] = React.useState(false);
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
    const [fulfilmentDate, setFulfilmentDate] = useState("");
    const [fulfillment_time, setFulfilmentTime] = useState("");
    const [inserteddate, setInserteddate] = useState("");
    useFocusEffect(
        useCallback(() => {
            fetch(`https://graph-qa.api.slerpdemo.com/v1/graphql`, {
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
                      status
                      inserted_at
                      fulfillment_date
                      fulfillment_time_range
                    }
                  }
          
                  `,
                    variables: {
                        cartId: `${ordercartid}`,
                    },
                }),
            })
                .then((response) => {
                    response
                        .json()
                        .then((res) => {
                            let date = res.data.orders[0].inserted_at;
                            date = date.split("T");
                            date = date[0].split("-");
                            let year = parseInt(date[0]);
                            let month = parseInt(date[1]);
                            let day = parseInt(date[2]);
                            let date1 = res.data.orders[0].fulfillment_date;
                            date1 = date1.split("T");
                            date1 = date1[0].split("-");
                            let year1 = parseInt(date1[0]);
                            let month1 = parseInt(date1[1]);
                            let day1 = parseInt(date1[2]);
                            setInserteddate(monthName[month - 1] + " " + day + " " + year);
                            setFulfilmentDate(monthName[month1 - 1] + " " + day1 + " " + year1);
                            setFulfilmentTime(res.data.orders[0].fulfillment_time_range)
                            dispatch({
                                type: actionTypes.SET_TRANSID,
                                transid: res.data.orders[0].transaction_id,
                            });
                            interval = setInterval(() => {
                                if (res.data.orders[0].status === "pending") {
                                    // setOrderReceived(true)
                                    setCooking(true)
                                    setOnWay(false)
                                    setDelivered(false)
                                }
                                else if (res.data.orders[0].status === "accepted") {
                                    // setOrderReceived(true)
                                    setCooking(true)
                                    setOnWay(true)
                                    setDelivered(false)
                                }
                                else if (res.data.orders[0].status === "fulfilled") {
                                    // setOrderReceived(true)
                                    setCooking(true)
                                    setOnWay(true)
                                    setDelivered(true)
                                }

                            }, 60000);
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

    useFocusEffect(
        useCallback(() => {

            if (delivered) {
                clearInterval(interval);
            }
        }, [delivered])
    );

    const MyStatusBar = ({ backgroundColor, ...props }) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    );
    return (
        <View style={[styles.container]}>
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
                        onPress={() => navigation.navigate("OrderDetails")}
                    >
                        <Image
                            style={[styles.backicon, { marginBottom: 20 }]}
                            source={require("../assets/BackIcon.png")}
                        ></Image>
                    </TouchableOpacity>
                    <View style={[styles.logoWithText, { width: "100%" }]}>
                        <Image
                            style={styles.logo}
                            source={require("../assets/LogoWhite.png")}
                        ></Image>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "MonumentExtended-Regular",

                                color: "#ffffff",
                                textAlign: "center",
                                textTransform: "uppercase",
                            }}
                        >
                            Follow your filth 👇
                        </Text>

                    </View>
                </ImageBackground>

            </View>
            <TouchableOpacity
                disabled={true}
                style={styles.checkBoxesSet}
            >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {orderReceived ?
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/checked.png")}
                        ></Image>
                        :
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/unchecked.png")}
                        ></Image>
                    }
                    <View>
                        <Text style={styles.checkboxText}>order received (#{transid})</Text>
                        <Text style={styles.checkBoxTextDown}>{inserteddate}</Text>
                    </View>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {cooking ?
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/checked.png")}
                        ></Image>
                        :
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/unchecked.png")}
                        ></Image>
                    }
                    <View>
                        <Text style={styles.checkboxText}>cookin’ up your filth</Text>
                        <Text style={styles.checkBoxTextDown}>{inserteddate}</Text>
                    </View>
                </View>

                <View style={styles.verticleLine}></View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {onWay ?
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/checked.png")}
                        ></Image>
                        :
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/unchecked.png")}
                        ></Image>
                    }
                    <View>
                        <Text style={styles.checkboxText}>Ready for collection</Text>
                        <Text style={styles.checkBoxTextDown}>{fulfillment_time}, {fulfilmentDate}</Text>
                    </View>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {delivered ?
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/checked.png")}
                        ></Image>
                        :
                        <Image
                            style={{
                                height: 23,
                                width: 23,
                            }}
                            source={require("../assets/unchecked.png")}
                        ></Image>
                    }
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.checkboxText}>collected. Enjoy your filth.</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
