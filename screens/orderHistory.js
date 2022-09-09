import React, { useEffect, useState } from "react";
import { styles } from "../stylesheet";
import { getDistance, getPreciseDistance } from "geolib";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import Choose from "../Components/choose";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { TOKEN, MERCHANT_ID, URL } from "./ids&tokens";
// let storeId
let start = 0;
let end = 0;
let orderItem = [];
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
export default function OrderHistory({ navigation }) {
  const [
    {
      zip,
      store,
      storeid,
      fulfilmentType,
      customerid,
      cartid,
      orders,
      ordertotalprice,
      orderitems,
      orderaddress,
      ordertime,
      ordercartid,
      tab,
      screen
    },
    dispatch,
  ] = useDataLayerValue();
  const [check, setCheck] = useState(false);
  useEffect(() => {
    console.log(customerid)
    if (customerid) {
      fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          query: `
                    query GetCustomer($customerId: uuid!) {
                        customers_by_pk(id: $customerId) {
                          orders(order_by: {inserted_at: desc}) {
                            cart_id
                            transaction_id
                            subtotal
                            total
                            order_notes
                            fulfillment_type
                            inserted_at
                            order_notes
                            recipient_details
                            delivery
                            customer_details
                            delivery_charge
                            discount_code: discounts_cache(path: "code")
                            total_discount: discounts_cache(path: "total_discount")
                            discount_target: discounts_cache(path: "target")
                            discount_type: discounts_cache(path: "type")
                            discount_value: discounts_cache(path: "value")
                            status
                            fulfillment_date
                            fulfillment_time_range
                            order_items {
                              amount
                              quantity
                              product_variant {
                                name
                                image
                                product {
                                  category {
                                    name
                                  }
                                }
                              }
                            }
                            cart {
                                address
                              }
                          }
                        }
                      }
                      
                    
          
        
        `,
          variables: {
            customerId: `${customerid}`,
          },
        }),
      })
        .then((response) => {
          response
            .json()
            .then((res) => {
              console.log(res)
              dispatch({
                type: actionTypes.SET_ORDERS,
                orders: res.data.customers_by_pk.orders,
              });
            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });
    } else {
    }
  }, []);
  function selectOrder(price, orderItems, fulfillment_time_range, cart_id) {
    orderItems.map((element, index) => {
      if (orderItem.length < orderItems.length) {
        let amount = element.amount;
        amount = amount.toFixed(2);
        let singleorder = {
          productName: element.product_variant.name,
          productCategory: element.product_variant.product.category.name,
          quantity: element.quantity,
          amount: amount,
        };
        orderItem.push(singleorder);
      }
    });
    dispatch({
      type: actionTypes.SET_ORDERCARTID,
      ordercartid: cart_id,
    });
    dispatch({
      type: actionTypes.SET_ORDERTOTALPRICE,
      ordertotalprice: price,
    });
    dispatch({
      type: actionTypes.SET_ORDERITEMS,
      orderitems: orderItem,
    });
    dispatch({
      type: actionTypes.SET_ORDERTIME,
      ordertime: fulfillment_time_range,
    });
    dispatch({
      type: actionTypes.SET_SCREEN,
      screen: "OrderHistory",
    });
    dispatch({
      type: actionTypes.SET_TAB,
      tab: "Home",
    });
    orderItem = [];
    navigation.navigate("Account", {
      screen: "OrderDetails",
    });
  }
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <ScrollView bounces={false}
      keyboardShouldPersistTaps="handled"
      style={[styles.scrollView]}
    >
      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content" // Here is where you change the font-color
      />
      {Platform.OS === "ios" ? (
        <View></View>
      ) : (
        <View style={{ marginTop: 33 }}></View>
      )}
      <View style={{ paddingLeft: 23, paddingRight: 23 }}>
        <TouchableOpacity onPress={() => {
          if (tab == "Home" && screen == "OrderHistory") {
            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "Accounts",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Account",
            });
            navigation.navigate("Account", { screen: "Accounts" })
          }
          else {
            navigation.navigate(tab, { screen: screen })
          }
        }}>
          <Image
            style={[styles.backicon, { marginTop: 20 }]}
            source={require("../assets/BackIcon.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={[styles.header, styles.gap7]}>order history</Text>
        <View style={styles.gap6}></View>
        {orders.length ? (
          orders.map((element, index) => {
            let date = element.inserted_at;
            date = date.split("T");
            date = date[0].split("-");
            let year = parseInt(date[0]);
            let month = parseInt(date[1]);
            let day = parseInt(date[2]);
            let price = element.subtotal;
            price = price.toFixed(2);
            let fullDate = day + " " + monthName[month - 1] + " " + year;
            return (
              <View key={index}>
                <View style={{ marginTop: 14 }}></View>
                <TouchableOpacity
                  onPress={() =>
                    selectOrder(
                      price,
                      element.order_items,
                      element.fulfillment_time_range,
                      element.cart_id
                    )
                  }
                  style={[styles.chooseSet]}
                >
                  <View style={styles.width2}></View>
                  <Image
                    style={styles.chooseImage}
                    source={require("../assets/orderImage.png")}
                  ></Image>
                  <View style={styles.width1}></View>
                  <View
                    style={{
                      width: "70%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Text style={styles.chooseText1}>
                      order #{element.transaction_id}
                    </Text>
                    <Text style={styles.chooseText2}>£{price}</Text>
                    <Text style={styles.chooseText2}>{fullDate}</Text>
                  </View>
                  <View>
                    <Image
                      style={styles.chevronSet}
                      source={require("../assets/right-chevron.png")}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                marginTop: 260,
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "Raleway_600SemiBold",
              }}
            >
              No Order histroy
            </Text>
          </View>
        )}
        <View style={{ marginBottom: 45 }}></View>
      </View>
    </ScrollView>
  );
}
