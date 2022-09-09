import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../stylesheet";
import { SLERP_ASSETS_DOMAIN } from "../screens/ids&tokens";
import { useDataLayerValue } from '../DataLayer';
import { actionTypes } from '../Reducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function PLP({
  productslug, element, navigation, currentCategory, productName,
  productDescription, productPrize
}) {
  const getProductVariantImage = (variant, placeholder) => {
    const el = (variant.product_variant || variant)
    const parseError = `https://placehold.co/400x400/random/random?text=${(
      el.name || 'Slerp'
    ).substr(0, 1)}`

    let imageUrl
    if (el.image) {
      const image = el.image
      const variantId = el.id
      const imageParts = image.split('.')
      const baseName = imageParts.slice(0, imageParts.length - 1).join('.')
      const ext = imageParts[imageParts.length - 1]
      const fileType = ext.split('?')
      const fileTypeFinal = fileType[0]
      const imagePath = `${variantId}_${baseName}.${fileTypeFinal}`
      imageUrl = `https://${SLERP_ASSETS_DOMAIN}/uploads/images/variant/${variantId}/${imagePath}` + '_standard.jpg'
    }

    if (placeholder == false) return imageUrl
    else {
      try {
        if (!el.image) {
          return parseError
        } else {
          return imageUrl
        }
      } catch {
        return parseError
      }
    }
  }
  const placeholder = false
  const imageurl = getProductVariantImage(element, placeholder)
  const [{ product, storeid }, dispatch] = useDataLayerValue();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          padding: 15,
        },
      ]}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={() => {


          let product1 = {
            imageurl: imageurl,
            productId: element.id,
            productName: productName,
            productCategory: currentCategory,
            productDescription: productDescription,
            productPrize: productPrize,
            productSlug: productslug
          };
          dispatch({
            type: actionTypes.SET_PRODUCT,
            product: product1
          });
          // console.log(ele)
          dispatch({
            type: actionTypes.SET_PRODUCTSLUG,
            productSlug: productslug,
          });
          dispatch({
            type: actionTypes.SET_ADDBASKET,
            addBaskets: true,
          });
          console.log(product1)
          if (storeid) {
            AsyncStorage.setItem("selectedProduct", JSON.stringify(product1));
            AsyncStorage.getItem("selectedProduct").then((item) => {

              dispatch({
                type: actionTypes.SET_SCREEN,
                screen: "search",
              });
              dispatch({
                type: actionTypes.SET_TAB,
                tab: "Search",
              });
              navigation.navigate("Wings", { screen: "AddToBasket" });
            });


            // navigation.navigate("Wings", { screen: "AddToBasket" });
          }
          else {
            AsyncStorage.setItem("selectedProduct", '');
            navigation.navigate("Search", { screen: "AddToBasket" });
          }

        }}
      >
        <View
          style={{
            width: "26%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {imageurl === undefined ?
            <Image
              style={{ width: "80%" }}
              source={require("../assets/Loade.png")}
            />
            :
            <Image
              style={{ width: "80%", height: 75 }}
              source={{ uri: imageurl }}
            />
          }
        </View>

        <View style={{ width: "74%", justifyContent: "center" }}>
          <Text style={[styles.header1]}>
            {productName} - {currentCategory} 😈
          </Text>




          <Text
            numberOfLines={2}
            style={[
              {
                fontFamily: "Raleway_500Medium",
                fontSize: 10,
                color: "#828282",
              },
              styles.gap1,
            ]}
          >
            {productDescription ? productDescription : "No description"}
          </Text>

          <Text style={[styles.header3, styles.gap1]}>£{productPrize}</Text>

        </View>

      </TouchableOpacity>
    </View>
  );
}
