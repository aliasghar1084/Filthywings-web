import React, { useState, useCallback } from "react";
import { styles } from "../stylesheet";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import Alert from "../Components/alert";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import PLP from "../Components/plp";
import { useEffect } from "react";
export default function PlpCollection({ navigation }) {
  const [{ store, tab, screen, alert, categoryArrangements }, dispatch] =
    useDataLayerValue();
  const [check, setCheck] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [categoryStores, setCategoryStores] = useState([]);
  let [categories, setCategories] = useState([]);
  let [list, setList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState();
  const [categoryStoresInitial, setCategoryStoresInitial] = useState([]);
  const getProductVariantImage = (variant, placeholder) => {
    const el = variant.product_variant || variant;
    const parseError = `https://placehold.co/400x400/random/random?text=${(
      el.name || "Slerp"
    ).substr(0, 1)}`;

    let imageUrl;
    if (el.image) {
      const image = el.image;
      const variantId = el.id;
      const imageParts = image.split(".");
      const baseName = imageParts.slice(0, imageParts.length - 1).join(".");
      const ext = imageParts[imageParts.length - 1];
      const imagePath = `${variantId}_${baseName}.png`;
      imageUrl = `https://assets.slerpdemo.com/uploads/images/variant/${variantId}/${imagePath}`;
    }

    if (placeholder == false) return imageUrl;
    else {
      try {
        if (!el.image) {
          return parseError;
        } else {
          return imageUrl;
        }
      } catch {
        return parseError;
      }
    }
  };
  // let catStores = store.categories;
  useFocusEffect(
    useCallback(() => {

      let catStores = store.categories;
      if (catStores != undefined) {
        // setCategories([])
        console.log(catStores.length);
        catStores = catStores.filter((element) => {
          console.log(element.name);
          console.log(element.archived_at);
          return element.archived_at == null;
        });
        console.log(catStores.length);
        let cats = []
        // console.log(catStores);
        for (let i = 0; i < catStores.length - 1; i++) {
          // console.log(i);
          // if (categories.length < catStores.length) {
          if (categoryArrangements[`${i}`] != undefined) {
            // console.log(categoryArrangements[`${i}`]);

            // console.log(catStores[i].id);
            for (let j = 0; j < catStores.length - 1; j++) {
              if (catStores[j].id == categoryArrangements[`${i}`]) {
                // console.log(categoryArrangements[`${i}`]);
                cats.push(catStores[j].name);
              }
            }
          }

          // for (let j = 0; catStores.length; i++) {
          //   if (catStores[j].id == categoryArrangements[`${i}`]) {
          // categories.push(catStores[j].name);
          //   }
          // }

          if (i == 0) {
            list.push(true);
          } else {
            list.push(false);
            // }
          }
        }
        setCategories(cats)
        let catStores1 = store.categories;
        catStores1 = catStores1.filter((element) => {
          console.log(element.name);
          console.log(element.archived_at);
          return element.archived_at == null;
        });
        let firstCategory = 0;
        for (let j = 0; j < catStores1.length; j++) {
          if (catStores1[j].id == categoryArrangements["0"]) {
            firstCategory = j;
            // categories.push(catStores[j].name);
          }
        }
        let tempCategoryStores1 =
          catStores1[firstCategory].merchant.stores[0].store_variants.filter(
            checkStore
          );

        function checkStore(element) {
          return (
            element.product_variant.product.category.name ==
            catStores1[firstCategory].name
          );
        }
        setCurrentCategory(catStores1[firstCategory].name);
        setCategoryStoresInitial(tempCategoryStores1);
        if (tempCategoryStores1.length) {
          setCheck1(false);
        } else {
          setCheck1(true);
        }
      }
    }, [store])
  );
  function selectCategory(category, index) {
    let i;
    let newList = [...list];
    newList[index] = true;
    for (i = 0; i < list.length; i++) {
      if (i != index) {
        newList[i] = false;
      }
    }
    setList(newList);
    setCurrentCategory(category);
    let tempCategoryStores =
      store.categories[0].merchant.stores[0].store_variants.filter(checkStores);
    function checkStores(element) {
      return element.product_variant.product.category.name == category;
    }

    setCategoryStores(tempCategoryStores);
    if (tempCategoryStores.length) {
      setCheck1(false);
    } else {
      setCheck1(true);
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
    <ScrollView bounces={false} style={{ height: "100 %", flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ height: "100 %", flex: 1 }}>
        <View style={{ backgroundColor: "black" }}>
          <MyStatusBar
            backgroundColor="black"
            barStyle="light-content" // Here is where you change the font-color
          />
          {Platform.OS === "ios" ? (
            <View></View>
          ) : (
            <View style={{ marginTop: 33 }}></View>
          )}
          {/* <View style={{ marginTop: 30 }}></View> */}
          {alert ? (
            <Alert
              navigation={navigation}
              tab1={"Wings"}
              screen1={"PlpCollection"}
            />
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            onPress={() => {
              if (tab == "Wings" && screen == "PlpCollection") {
                dispatch({
                  type: actionTypes.SET_SCREEN,
                  screen: "CollectionLocation",
                });
                dispatch({
                  type: actionTypes.SET_TAB,
                  tab: "Wings",
                });
                navigation.navigate("CollectionLocation");
              } else {
                navigation.navigate(tab, { screen: screen });
              }
            }}
          >
            <Image
              style={[styles.backicon, { marginLeft: 15, marginTop: 15 }]}
              source={require("../assets/BackIcon.png")}
            ></Image>
          </TouchableOpacity>
          <View>
            <ScrollView bounces={false}
              horizontal
              style={[
                {
                  flexDirection: "row",
                },
              ]}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                {categories.map((category, index = 0) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.5}
                      onPress={() => {
                        setCheck(false);
                        selectCategory(category, index);
                      }}
                      style={{ padding: 10, alignItems: "center" }}
                    >
                      <Text
                        style={[
                          styles.texte,
                          {
                            color: list[index] ? "#F2C400" : "#ffffff",
                            fontSize: 12,
                            fontFamily: "MonumentExtended-Regular",
                          },
                        ]}
                      >
                        {category}
                      </Text>
                      <View
                        style={{
                          height: 2,
                          width: "90%",
                          backgroundColor: list[index] ? "#F2C400" : "#ffffff",
                        }}
                      ></View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <View style={{ alignItems: "center" }}>
              <ImageBackground
                resizeMode="cover"
                source={require("../assets/Group-6772.png")}
                style={{ width: "100%", height: 80, justifyContent: "center" }}
              >
                <View style={{ width: "74%", marginLeft: 22 }}>
                  <Text style={[styles.inimg]}>{currentCategory}</Text>

                  <Text style={[styles.header2]}>
                    Succulent single joint wings in buttermilk batter, deep
                    fried.
                  </Text>
                </View>
              </ImageBackground>
              {check &&
                categoryStoresInitial.map((element, index) => {
                  let productPrize = element.product_variant.price;
                  productPrize = productPrize.toFixed(2);
                  return (
                    <View
                      style={{ alignItems: "center", width: "100%" }}
                      key={index}
                    >
                      <PLP
                        element={element}
                        navigation={navigation}
                        currentCategory={currentCategory}
                        productName={element.product_variant.name}
                        productDescription={element.product_variant.description}
                        productPrize={productPrize}
                        productslug={element.product_variant.product.slug}
                      />
                      <View
                        style={{
                          backgroundColor: "#ffffff",
                          height: 0.5,
                          width: "88%",
                        }}
                      ></View>
                    </View>
                  );
                })}

              {categoryStores.map((element, index) => {
                let productPrize = element.product_variant.price;
                productPrize = productPrize.toFixed(2);
                return (
                  <View
                    style={{ alignItems: "center", width: "100%" }}
                    key={index}
                  >
                    <View>
                      <PLP
                        element={element}
                        navigation={navigation}
                        currentCategory={currentCategory}
                        productName={element.product_variant.name}
                        productDescription={element.product_variant.description}
                        productPrize={productPrize}
                        productslug={element.product_variant.product.slug}
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
                );
              })}
              {check1 && (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      marginTop: 20,
                      fontFamily: "Raleway_500Medium",
                      fontSize: 14,
                      color: "#ffffff",
                    }}
                  >
                    NO PRODUCTS THERE
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
