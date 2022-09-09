
import React, { useState, useCallback, useEffect } from "react";
import { styles } from "../stylesheet";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import { TOKEN, URL, MERCHANT_SLUG } from "./ids&tokens";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { Index } from "typeorm";
var tempCart;

export default function AddToBasket({ navigation, route }) {
  var [
    {
      product,
      cart,
      lists,
      tab,
      screen,
      storeSlug,
      productSlug,
      productModifiers,
      finalProduct,
      addBaskets,
      prize,
      cart,
      initialModifier
    },
    dispatch,
  ] = useDataLayerValue();
  let min1 = false;
  // let max1 = 0
  var lp = [];
  var finProduct = []
  const [check, setCheck] = useState(false)
  var [modifiers, setModifiers] = useState(false)
  const [addsBasket, setAddsBasket] = useState(false);
  const [list, setList] = useState([]);
  let lastindex;

  function oneSelection(e) {
    if (singleProductCheck) {
      setSingleProductCheck(false)
    } else {
      setSingleProductCheck(true);
      dispatch({
        type: actionTypes.SET_FINALPRODUCT,
        finalProduct: productToShow.productTotal,
      });
    }

  }
  function selection(index, i, min, max) {
    setModifiers(false);
    let newList = [...list];
    newList[index][i] = !newList[index][i];
    if (min == 0 && max == 0) {
      setList(newList);
    } else if (min != 0 && max != 0 && min == max) {
      let total = 0;
      for (let j = 0; j < newList[index].length; j++) {
        if (newList[index][j] == true) {
          total = total + 1;
        }
      }
      let changeindex = 0;
      if (total > max) {
        for (let x = 0; x < newList[index].length; x++) {
          if (newList[index][x] == true) {
            if (x != i) {
              changeindex = x;
            }
          }
        }
        newList[index][changeindex] = false;
        // Alert.alert(`You can choose maximum ${max} adds on in this category`);
        setList(newList);
      } else if (total < min) {
        setList(newList);
        setModifiers(true);
      }
    } else if (min > max) {
      let total = 0;
      for (let j = 0; j < newList[index].length; j++) {
        if (newList[index][j] == true) {
          total = total + 1;
        }
      }
      // let changeindex = 0;
      // // if (total > max) {
      // for (let x = 0; x < newList[index].length; x++) {
      //   if (newList[index][x] == true) {
      //     if (x != i) {
      //       changeindex = x;
      //     }
      //   }
      // }
      // newList[index][changeindex] = false;
      // Alert.alert(`You can choose maximum ${max} adds on in this category`);
      setList(newList);
      // }
      if (total < min) {
        setList(newList);
        setModifiers(true);
      }
    } else {
      let total = 0;
      for (let j = 0; j < newList[index].length; j++) {
        if (newList[index][j] == true) {
          total = total + 1;
        }
      }
      let changeindex = 0;
      if (total > max) {
        for (let x = 0; x < newList[index].length; x++) {
          if (newList[index][x] == true) {
            if (x != i) {
              changeindex = x;
            }
          }
        }
        newList[index][changeindex] = false;
        // Alert.alert(`You can choose maximum ${max} adds on in this category`);
        setList(newList);
      } else if (total < min) {
        setList(newList);
        setModifiers(true);
      }
    }
    dispatch({
      type: actionTypes.SET_FINALPRODUCT,
      finalProduct: [],
    });
    lp = [];
    finProduct = [];

    productModifiers.map((element, index = 0) => {
      let modifierGroup = element.modifier_group.id;
      element.modifier_group.modifier_assocs.map((ele, i = 0) => {
        if (list[index][i] == true) {
          lp.push({ modifiers: ele, modifiergroup: modifierGroup });
        }
      });
    });
    productModifiers.map((element1, index = 0) => {
      let min2 = element1.modifier_group.minimum;
      min2 = parseInt(min2);
      let max2 = element1.modifier_group.maximum;
      max2 = parseInt(max2);
      if (min2 != 0 && max2 != 0) {
        let total1 = 0;
        element1.modifier_group.modifier_assocs.map((ele, i = 0) => {
          if (list[index][i] == true) {
            total1 += 1;
          }
        });
        if (total1 < min2) {
          setModifiers(true);
        }
      }
    });
    if (lp.length) {
      let price = 0;
      for (let i = 0; i < lp.length; i++) {
        price = lp[i].modifiers.modifier.price;
        price = price.toFixed(2);
        finProduct.push({
          addsOnPrize: price,
          productVariantName: lp[i].modifiers.modifier.name,
          modifierId: lp[i].modifiers.modifier.id,
          modifierGroupId: lp[i].modifiergroup,
        });
      }
      let fp = [];
      let fp1 = [];
      dispatch({
        type: actionTypes.SET_FINALPRODUCT,
        finalProduct: finProduct,
      });
    } else {
      dispatch({
        type: actionTypes.SET_FINALPRODUCT,
        finalProduct: [],
      });
    }
  }
  const [singleProductCheck, setSingleProductCheck] = useState(false)
  const [cartChange, setCartChange] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrize, setProductPrize] = useState("");
  const [loader, setLoader] = useState(false);
  const [disabledw, setDisabledw] = useState(false);
  const [noadd, setNoAdd] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  const [isProductUpdated, setIsProductUpdated] = useState(false);
  let productslug = ''
  useFocusEffect(
    useCallback(() => {
      console.log('hello1')
      // if (!isProductUpdated) {
      AsyncStorage.getItem("selectedProduct").then((item) => {
        if (item) {
          let val = JSON.parse(item)
          productslug = val.productSlug
          setProductToShow(JSON.parse(item));
        } else {
          productslug = product.productSlug
          setProductToShow(product);
        }

        setIsProductUpdated(true);

        //   }, [])
        // );
        // useFocusEffect(
        //   useCallback(() => {
        console.log('hello2')
        // merchant: `${MERCHANT_SLUG}`,
        // console.log(storeSlug)
        console.log(productslug)
        setLoader(true)
        fetch(URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },

          body: JSON.stringify({
            query: `
          query getProduct($merchant: String!, $slug: String!, $storeSlug: String!, $contextualPricingEnabled: Boolean, $fulfillmentType: String) {
            products(where: {merchant: {slug: {_eq: $merchant}}, slug: {_eq: $slug}, archived_at: {_is_null: true}}, limit: 1) {
              id
              name
              description
              category {
                id
                name
                slug
              }
              default_vat
              featured
              slug
              default_variant_id
              options
              attributes
              allergens
              variants: product_variants(where: {store_variants: {published_at: {_is_null: false}}}) {
                default_variant
                calorie_data
                id
                name
                sku
                description
                attributes
                options
                image
                published
                restrictions
                limit
                price: contextual_price(args: {order_fulfillment_type: $fulfillmentType, contextual_pricing_enabled: $contextualPricingEnabled})
                vat: contextual_vat(args: {order_fulfillment_type: $fulfillmentType, contextual_pricing_enabled: $contextualPricingEnabled})
                pricing_by_fulfillment_type: pricings {
                  price
                  vat
                  price_with_vat
                  fulfillment_type
                }
                archived_at
                store_variants(where: {storeByPreorderStoreId: {slug: {_eq: $storeSlug}}, product_variant: {product: {slug: {_eq: $slug}}}}) {
                  in_stock
                  store_id
                  stock_count
                  stock_type
                  stock_sold
                  published_at
                  product_variant {
                    id
                  }
                }
                additionalImages: additional_images {
                  image
                  id
                }
                source: product {
                  slug
                  category_id
                  category {
                    id
                    name
                    slug
                  }
                }
              }
              modifier_group_arrangement
              product_modifiers: product_modifier_groups {
                modifier_group {
                  id
                  name
                  minimum
                  minimum_enabled
                  maximum
                  maximum_enabled
                  modifier_arrangement
                  modifier_assocs: modifier_group_modifiers(where: {modifier: {archived_at: {_is_null: true}, store_modifiers: {published_at: {_is_null: false}, storeByPreorderStoreId: {slug: {_eq: $storeSlug}}}}}) {
                    id
                    modifier {
                      price
                      id
                      name
                      vat
                      sku
                      image
                      store_modifiers(where: {storeByPreorderStoreId: {slug: {_eq: $storeSlug}}}) {
                        in_stock
                      }
                    }
                  }
                }
              }
            }
          }
        
        `,
            variables: {
              merchant: `${MERCHANT_SLUG}`,
              storeSlug: storeSlug,
              slug: productslug,
              fulfillmentType: "pickup",
              contextualPricingEnabled: false,
            },
          }),
        })
          .then((response) => {
            response
              .json()
              .then((res) => {
                dispatch({
                  type: actionTypes.SET_FINALPRODUCT,
                  finalProduct: [],
                });
                let newList = [];
                setList([]);
                let resData = res.data.products
                if (resData.length) {

                  let prodModiUnArr = res.data.products[0].product_modifiers
                  let prodModiArrangement = res.data.products[0].modifier_group_arrangement
                  console.log(prodModiArrangement)
                  var size = Object.keys(prodModiArrangement).length;
                  console.log(size)
                  let ArrProdModi = []
                  for (let i = 0; i < size; i++) {
                    prodModiUnArr.map((element) => {
                      if (prodModiArrangement[`${i}`] == element.modifier_group.id) {
                        ArrProdModi.push(element)
                      }
                      // console.log(element.modifier_group.id)
                    })
                    // console.log(prodModiArrangement[`${i}`])
                  }
                  let list1 = [];
                  let pm = ArrProdModi;
                  let pms;

                  for (let i = 0; i < pm.length; i++) {
                    pms = pm[i].modifier_group.modifier_assocs;
                    for (let j = 0; j < pms.length; j++) {
                      list1.push(false);
                    }
                    newList = [...newList, list1];
                    list1 = [];
                  }
                  setList(newList);
                  // console.log(ArrProdModi)
                  dispatch({
                    type: actionTypes.SET_PRODUCTMODIFIERS,
                    productModifiers: ArrProdModi,
                  });
                }
                else {
                  dispatch({
                    type: actionTypes.SET_PRODUCTMODIFIERS,
                    productModifiers: [],
                  });
                }

                setLoader(false)
              })
              .catch((err) => {
                setLoader(false)
                console.log("error in getting msgs ", err);
              });
          })
          .catch((err) => {
            setLoader(false)
            console.log("error in getting msgs ", err);
          });
      });
      // }
    }, [])
  );
  useEffect(() => {
    console.log('hello3')
    if (productToShow) {

      setProductId(productToShow.productId);
      setProductName(productToShow.productName);
      setProductCategory(productToShow.productCategory);
      setProductDescription(productToShow.productDescription);
      setProductPrize(productToShow.productPrize);
    }
    AsyncStorage.getItem("cart").then((item) => {

      if (item) {
        dispatch({
          type: actionTypes.SET_CART,
          cart: JSON.parse(item),
        });
      }
    });
  }, [cartChange, productToShow]);
  function addBasket() {
    productModifiers.map((element1, index = 0) => {
      let min2 = element1.modifier_group.minimum
      min2 = parseInt(min2)
      let max2 = element1.modifier_group.maximum
      max2 = parseInt(max2)
      if (min2 != 0 && max2 != 0) {


        let total1 = 0
        element1.modifier_group.modifier_assocs.map((ele, i = 0) => {
          if (list[index][i] == true) {
            total1 += 1
          }
        });
        if (total1 < min2) {
          modifiers = true
        }
      }
    });

    setAddsBasket(false);
    setNoAdd(false);
    setDisabledw(true);
    setLoader(true);
    let singleProd = {
      productTotal: finalProduct,
      productId: productId,
      productName: productName,
      productCategory: productCategory,
      productDescription: productDescription,
      productPrize: productPrize,
      quantity: 1,
      imageurl: productToShow.imageurl
    };
    if (!cart || cart.length == 0) {
      if (finalProduct.length) {
        let subprice = 0
        finalProduct.map((element) => {
          let addsOP = element.addsOnPrize
          let subfinal = parseFloat(addsOP)
          subprice = subprice + subfinal
        })
        let pri = parseFloat(productPrize)
        subprice = subprice + pri
        subprice = subprice.toFixed(2)

        dispatch({
          type: actionTypes.SET_PRIZE,
          prize: subprice,
        });
      }
      else {
        dispatch({
          type: actionTypes.SET_PRIZE,
          prize: productPrize,
        });
      }
      AsyncStorage.setItem("cart", JSON.stringify([singleProd]));
      setCartChange(!cartChange);
      setLoader(false);
      setDisabledw(false);
      if (modifiers == false) {
        setAddsBasket(true);
      }
      else {
        Alert.alert(`Fulfill the modifiers choose limits as mentioned`);
      }

    } else {
      let findCart = cart.find((element, index) => {
        lastindex = index;
        return element.productName == productName;

      });
      if (findCart == undefined) {
        if (finalProduct.length) {
          let subprice = 0
          finalProduct.map((element) => {
            let addsOP = element.addsOnPrize
            let subfinal = parseFloat(addsOP)
            subprice = subprice + subfinal
          })
          let pri = parseFloat(productPrize)
          subprice = subprice + pri
          subprice = subprice.toFixed(2)
          dispatch({
            type: actionTypes.SET_PRIZE,
            prize: subprice,
          });
        }
        else {
          dispatch({
            type: actionTypes.SET_PRIZE,
            prize: productPrize,
          });
        }
        // cart = cart.concat(finalProduct)
        let final = [...cart, singleProd];
        AsyncStorage.setItem("cart", JSON.stringify(final));
        setCartChange(!cartChange);
        setLoader(false);
        setDisabledw(false);
      } else {
        if (finalProduct.length) {

          let prodVarFind = cart[lastindex].productTotal
          let sProduct = []
          prodVarFind.map((x) => {
            finalProduct.map((y) => {
              if (x.productVariantName == y.productVariantName) {
                sProduct.push(x);
              }
            })
          })
          if (sProduct.length == 0) {

            let protot = cart[lastindex].productTotal
            protot = protot.concat(finalProduct)
            cart[lastindex].productTotal = protot;
            let subprice = 0

            protot.map((element) => {

              let addsOP = element.addsOnPrize
              let subfinal = parseFloat(addsOP)
              subprice = subprice + subfinal
            })
            let pri = parseFloat(productPrize)
            subprice = subprice + pri
            subprice = subprice.toFixed(2)
            dispatch({
              type: actionTypes.SET_PRIZE,
              prize: subprice,
            });


          }
          else {
            const isSameUser = (sProduct, finalProduct) => sProduct.productVariantName === finalProduct.productVariantName;


            const onlyInLeft = (left, right, compareFunction) =>
              left.filter(leftValue =>
                !right.some(rightValue =>
                  compareFunction(leftValue, rightValue)));

            const onlyInA = onlyInLeft(sProduct, finalProduct, isSameUser);
            const onlyInB = onlyInLeft(finalProduct, sProduct, isSameUser);

            let difference = onlyInB

            let protot = cart[lastindex].productTotal
            protot = protot.concat(difference)
            cart[lastindex].productTotal = protot;
            let subprice = 0
            protot.map((element) => {

              let addsOP = element.addsOnPrize
              let subfinal = parseFloat(addsOP)
              subprice = subprice + subfinal
            })
            let pri = parseFloat(productPrize)
            subprice = subprice + pri
            subprice = subprice.toFixed(2)
            dispatch({
              type: actionTypes.SET_PRIZE,
              prize: subprice,
            });
          }
        }


        let qua = cart[lastindex].quantity;
        cart[lastindex].quantity = qua + 1;
        AsyncStorage.setItem("cart", JSON.stringify(cart));
        setCartChange(!cartChange);

        setLoader(false);
        setDisabledw(false);

      }
      dispatch({
        type: actionTypes.SET_FINALPRODUCT,
        finalProduct: [],
      });
      if (modifiers == false) {
        setAddsBasket(true);
      }

      else {
        Alert.alert(`Fulfill the modifiers choose limits as mentioned`);
      }
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
      {addsBasket && (
        <View style={[styles.alert]}>
          <View style={styles.flexrow2}>
            <Image
              style={styles.alertImage}
              source={require("../assets/InfoSmall.png")}
            ></Image>
            <Text style={styles.alertText}>Item added to basket</Text>
          </View>
          <TouchableOpacity
            disabled={loader}
            onPress={() => {
              setAddsBasket(false)
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "AddToBasket",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Wings",
              });
              navigation.navigate("Basket", { screen: "YourBasket" });
            }
            }
          >
            <Text style={styles.alertLink}>View cart</Text>
          </TouchableOpacity>
        </View>
      )
      }

      <ImageBackground
        source={productToShow.imageurl === undefined ? require("../assets/bigfoodpackage.png") : { uri: productToShow.imageurl }}
        style={styles.image1}
        resizeMode="contain"
      >
        <TouchableOpacity
          disabled={loader}
          onPress={() => {
            if (tab === "Wings" && screen === "AddToBasket") {
              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "PlpCollection",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Wings",
              });
              navigation.navigate("PlpCollection");

            } else {
              navigation.navigate(tab, { screen: screen });
            }
          }}
        >
          <Image
            style={[styles.backicon, { marginTop: 20, marginLeft: 15 }]}
            source={require("../assets/BackIcon.png")}
          ></Image>
        </TouchableOpacity>
      </ImageBackground>
      {
        loader && (
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
        )
      }
      {/* <View style={{
        bottom: 0, position: 'absolute', width: '100%', zIndex: 20, justifyContent: "center",
        alignItems: "center",
      }}>
        <View style={{
          zIndex: 20, opacity: 1, width: "90 %", justifyContent: "center", backgroundColor: 'black',
          alignItems: "center",
        }}>
          <TouchableOpacity
            disabled={loader}
            onPress={addBasket}
            style={[{

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: '100%',
              zIndex: 20
            }]}
          >
            <Text style={{

              width: "100 %",
              textAlign: "center",
              fontSize: 14,
              color: "#121212",
              backgroundColor: "#F2C400",
              textTransform: "uppercase",
              fontFamily: "MonumentExtended-Regular",
              backgroundColor: "#F2C400",
              padding: 10,

            }}>add to basket</Text>
          </TouchableOpacity>
          
        </View>
      </View> */}
      {
        loader ? <View></View> :
          <ScrollView bounces={false} style={{ padding: 20 }}>
            <Text style={styles.trackYourOrderButton}>
              the {productName} - {productCategory} 😈
            </Text>
            <Text style={[styles.orderInfoText5, styles.gap6]}>
              {productDescription}
            </Text>
            <Text style={[styles.orderpay, styles.gap6]}>£{productPrize}</Text>
            {
              list === undefined && !list.length ? (
                <View></View>
              ) : (
                productModifiers.map((element, index = 0) => {
                  let min = element.modifier_group.minimum
                  min = parseInt(min)
                  let max = element.modifier_group.maximum
                  max = parseInt(max)

                  // min1 = min
                  // max1 = max
                  return (
                    <View key={index}>
                      <Text
                        style={{

                          marginTop: 30,
                          fontSize: 13,
                          color: "#FFFFFF",
                          textTransform: "uppercase",
                          fontFamily: "MonumentExtended-Regular",
                        }}
                      >
                        {element.modifier_group.name}
                      </Text>
                      {(min == 0 && max == 0) ? <View></View> : (min == max ? <Text
                        style={{
                          // marginBottom: 30,
                          // marginTop: 30,
                          fontSize: 11,
                          color: "#FFFFFF",
                          textTransform: "uppercase",
                          fontFamily: "MonumentExtended-Regular",
                        }}
                      >
                        Choose {min}
                      </Text> :
                        min > max ? (
                          <Text
                            style={{
                              // marginBottom: 30,
                              // marginTop: 30,
                              fontSize: 11,
                              color: "#FFFFFF",
                              textTransform: "uppercase",
                              fontFamily: "MonumentExtended-Regular",
                            }}
                          >
                            Choose atleast {min}
                          </Text>)
                          :
                          <Text
                            style={{
                              // marginBottom: 30,
                              // marginTop: 30,
                              fontSize: 11,
                              color: "#FFFFFF",
                              textTransform: "uppercase",
                              fontFamily: "MonumentExtended-Regular",
                            }}
                          >
                            Choose from {min} to {max}
                          </Text>)}
                      <View style={{ marginBottom: 30 }}></View>
                      {element.modifier_group.modifier_assocs.map((ele, i = 0) => {
                        let price = ele.modifier.price;
                        price = price.toFixed(2);

                        return (
                          <TouchableOpacity
                            activeOpacity={1}
                            disabled={loader}
                            onPress={() => selection(index, i, min, max)}
                            style={[
                              {
                                width: "100%",
                                height: 65,
                                backgroundColor: "#181818",
                                justifyContent: "space-between",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                              },
                              {

                                marginBottom: 10,
                              },
                            ]}
                            key={i}
                          >
                            <View style={{ width: "2%" }}></View>
                            {list[index] === undefined ? (
                              <View></View>
                            ) : list[index][i] ? (
                              <Image
                                style={{
                                  width: "6%",
                                  height: 23,
                                }}
                                source={require("../assets/checked.png")}
                              ></Image>
                            ) : (
                              <Image
                                style={{
                                  width: "6%",
                                  height: 23,

                                }}
                                source={require("../assets/unchecked.png")}
                              ></Image>
                            )}
                            <View style={{ width: "3%" }}></View>

                            <View style={{ width: "3%" }}></View>
                            <Text
                              style={{
                                width: "60%",
                                fontSize: 11,
                                color: "#FFFFFF",

                                fontFamily: "MonumentExtended-Regular",
                              }}
                            >
                              {ele.modifier.name}
                            </Text>
                            <View style={{ width: "9%" }}></View>
                            <Text
                              style={{
                                width: "15%",
                                fontSize: 9,
                                color: "#FFFFFF",
                                fontFamily: "MonumentExtended-Regular",
                              }}
                            >
                              +£{price}
                            </Text>
                            <View style={{ width: "2%" }}></View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })
              )}
            <TouchableOpacity
              disabled={loader}
              onPress={addBasket}
              style={[styles.paynowT, styles.gap7]}
            >
              <Text style={styles.payNow1}>add to basket</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 30 }}></View>
          </ScrollView>
      }
    </View >
  );
}
