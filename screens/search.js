import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  Platform,
  Image
} from "react-native";
import SearchIcon from "../assets/Union.svg";
import CloseIcon from "../assets/closeIcon.svg";
import { TextInput, Searchbar } from "react-native-paper";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import { TOKEN, URL } from "./ids&tokens";
// import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
// import AwesomeIcon from "react-native-vector-icons/FontAwesome";
// import { Feather, Entypo } from "@expo/vector-icons";
import {
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light_Italic,
  Raleway_400Regular_Italic,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black_Italic,
} from "@expo-google-fonts/raleway";
import PLP from "../Components/plp2";
const Search = ({ navigation }) => {

  let [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light_Italic,
    Raleway_400Regular_Italic,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black_Italic,
    "MonumentExtended-Regular": require("../assets/fonts/MonumentExtended-Regular.otf"),
    "MonumentExtended-Ultrabold": require("../assets/fonts/MonumentExtended-Ultrabold.otf"),
  });
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
      token,
      screen,
      tab
    },
    dispatch,
  ] = useDataLayerValue();
  const [filteredData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");
  const [categories, setCategories] = useState("");
  const [check, setCheck] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [clicked, setClicked] = useState(true);
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
                  query GetLocation {
                    categories {
                      id
                      name
                      special_availabilities
                      merchant {
                        stores {
                      name
                      slug
                      is_open
                      store_variants(where: {published_at: {_is_null: false}, product_variant: {product: {archived_at: {_is_null: true}}, archived_at: {_is_null: true}, default_variant: {_eq: true}, published: {_eq: true}}}, order_by: {product_variant: {product: {featured: desc}}}) {
                        in_stock
                        stock_count
                        stock_type
                        stock_sold
                        published_at
                        product_variant {
                          name
                          id
                          description
                          options
                          image
                          restrictions
                          limit
                          price
                          vat
                          product {
                            slug
                            product_id: id
                            category {
                              name
                            }
                          }
                        }
                      }
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
              setCategories(res.data.categories);
            })
            .catch((err) => {
              console.log("error in getting msgs ", err);
            });
        })
        .catch((err) => {
          console.log("error in getting msgs ", err);
        });

      return () => { };
    }, [categories])
  );


  const search1 = (categories) => {
    let products = [];

    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categories[i].merchant.stores.length; j++) {
        for (
          let x = 0;
          x < categories[i].merchant.stores[j].store_variants.length;
          x++
        ) {
          products.push(
            categories[i].merchant.stores[j].store_variants[x].product_variant
          );
        }
      }
    }

    return products;
  };

  const searchFilter = (text) => {
    let products = search1(categories);

    if (text) {
      const newData = products.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setsearch(text);
    } else {
      setfilterData(masterData);
      setsearch(text);
    }
  };
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  const ItemView = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>

        <Text
          style={[
            styles.texte,
            {
              color: "white",
              fontSize: 14,
              fontFamily: "MonumentExtended-Regular",
              marginLeft: 22,
            },
          ]}
        >
          {item.product.category.name}
        </Text>
        <View
          style={{
            marginTop: 7,
            width: "100%",
            height: "1%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "84.5%",
            }}
          ></View>
        </View>

        <View style={{ alignItems: "center", width: "100%" }}>
          <View>
            <PLP
              productslug={item.product.slug}
              element={item}
              navigation={navigation}
              currentCategory={item.product.category.name}
              productName={item.name}
              productDescription={item.description}
              productPrize={item.price.toFixed(2)}
            />
            <View
              style={{
                backgroundColor: "#ffffff",
                height: 2.5,
                width: "88%",
              }}
            ></View>
          </View>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => { };
  const ListEmptyView = () => {
    return (
      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "black",
          alignItems: "center",
          marginTop: "100%",
        }}
      >
        {search ? (
          <View>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                justifyContent: "center",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              aw clucks, we couldn’t find a match.
            </Text>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                justifyContent: "center",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              Try searching for something else instead
            </Text>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                justifyContent: "center",
                color: "black",
                textTransform: "uppercase",
              }}
            >
              aw clucks, we couldn’t find a match.
            </Text>
          </View>
        )}
      </View>
    );
  };
  return (
    <View
      style={[
        styles.cuntainer,
        {
          width: '100%',
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
        },
      ]}
    >
      {token ?
        <View style={{ width: '100%', height: '100vh' }}>
          <MyStatusBar
            backgroundColor="black"
            barStyle="light-content" // Here is where you change the font-color
          />
          {Platform.OS === "ios" ? (
            <View></View>
          ) : (
            <View style={{ marginTop: 33 }}></View>
          )}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#121212",
              alignItems: "center",
              justifyContent: "center",
              height: 60,
            }}
          >
            <Searchbar
              clearIcon={() => (search ? <Image style={{ width: 20, height: 20 }} source={require("../assets/closeIcon.svg")}></Image> : <View></View>)}
              showCancel="false"
              returnKeyType="search"
              inputStyle={{
                fontSize: 14,
                fontFamily: "Raleway_600SemiBold",
                marginLeft: -5,
                elevation: 0
              }}
              //           import SearchIcon from "../assets/Union.svg";
              // import CloseIcon from "../assets/closeIcon.svg";
              keyboardType="web-search"
              style={styles.textInputStyle}
              placeholder="Search menu"
              placeholderTextColor={"#828282"}
              onChangeText={(text) => searchFilter(text)}
              value={search}
              icon={() => (<Image style={{ width: 20, height: 20 }} source={require("../assets/Union.svg")}></Image>)}
              iconColor={"#fff"}
              theme={{ colors: { text: "#ffffff" } }}
            />
            <View
              style={{
                height: 30,
                width: "0.2%",
                backgroundColor: "#828282",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
            <TouchableOpacity style={{ width: "14.5%" }}>
              <Text
                style={{
                  color: "grey",
                  textAlign: "center",
                  fontFamily: "Raleway_600SemiBold",
                  fontSize: 12,
                }}
                onPress={() => {
                  Keyboard.dismiss();
                  setsearch("");
                }}
              >
                {" "}
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            ListEmptyComponent={ListEmptyView}
          ></FlatList>
        </View> :
        <View style={{ color: 'white', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 14,
              marginBottom: 20,
              fontFamily: "Raleway_600SemiBold",
              // textDecorationLine: "underline",
            }}
          >
            You are not login or checkout as a guest
          </Text>
          <TouchableOpacity onPress={() => {
            dispatch({
              type: actionTypes.SET_SCREEN,
              screen: "YourBasket",
            });
            dispatch({
              type: actionTypes.SET_TAB,
              tab: "Basket",
            });
            navigation.navigate("Home", { screen: "Signin" })
          }
          }>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "Raleway_600SemiBold",
                textDecorationLine: "underline",
              }}
            >
              Want to signin or checkout as guest?
            </Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  cuntainer: {
    backgroundColor: "black",
    flexGrow: 1,
  },
  itemStyle: {
    padding: 15,

    color: "#f44336",
  },
  textInputStyle: {
    fontFamily: "Raleway_600SemiBold",
    width: "85%",
    height: 60,
    fontSize: 14,
    borderColor: "black",
    backgroundColor: "#121212",
    elevation: 0
  },
});
