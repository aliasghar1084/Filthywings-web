import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../stylesheet";
import { SLERP_ASSETS_DOMAIN } from "../screens/ids&tokens";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function PLP({
  element,
  navigation,
  currentCategory,
  productName,
  productDescription,
  productPrize,
  productslug,
  addBaskets,
  cart,
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
  const [{ product, tab, screen, productSlug }, dispatch] = useDataLayerValue();
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
          let prize = element.product_variant.price;
          prize = prize.toFixed(2);
          let product = {
            productId: element.product_variant.id,
            productName: productName,
            productCategory: currentCategory,
            productDescription: productDescription,
            productPrize: prize,
            imageurl: imageurl,
            productSlug: productslug
          };
          dispatch({
            type: actionTypes.SET_PRODUCTSLUG,
            productSlug: productslug,
          });
          dispatch({
            type: actionTypes.SET_PRIZE,
            prize: prize,
          });
          dispatch({
            type: actionTypes.SET_PRODUCT,
            product: product,
          });
          dispatch({
            type: actionTypes.SET_SCREEN,
            screen: "PlpCollection",
          });
          dispatch({
            type: actionTypes.SET_TAB,
            tab: "Wings",
          });
          dispatch({
            type: actionTypes.SET_ADDBASKET,
            addBaskets: true,
          });
          AsyncStorage.setItem("selectedProduct", "");
          navigation.navigate("AddToBasket");
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

          <Text numberOfLines={2}
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
