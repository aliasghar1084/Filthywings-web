import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from '../stylesheet';

export default function OrderBasket({ eachBasket }) {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={[styles.infoSet3, { width: '100%' }]}>
                <View style={{ width: '34%' }}>
                    <Image source={require('../assets/foodpackage.png')} style={styles.foodWithPackage}></Image>
                </View>
                <View style={{ width: '66%' }}>
                    <Text style={styles.orderInfoText6}>The {eachBasket.productName} - {eachBasket.productCategory} chicken 😈</Text>
                    <View style={styles.setWithSpace}>
                        <View>
                            <Text style={[styles.orderInfoText2, styles.gap2]}>£{eachBasket.productPrize}</Text>

                            <Text style={[styles.orderInfoText3, styles.gap1, styles.other1]}>Edit Item</Text>
                        </View>
                        <View style={styles.flexrow2}>
                            <Image style={[styles.incdec, styles.gap3]} source={require('../assets/minus.png')}></Image>
                            <Text style={[styles.noOfOrders, styles.gap5]}>2</Text>
                            <Image style={[styles.incdec, , styles.gap4]} source={require('../assets/plus.png')}></Image>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}