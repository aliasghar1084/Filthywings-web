import React from 'react';
import { styles } from '../stylesheet';
import { Text, View, TouchableOpacity } from 'react-native';
import Alert from '../Components/alert';
export default function EmptyBasket({ navigation }) {
    return (
        <View style={styles.container}>
            <Alert />
            <View style={[styles.gap12, styles.gap6]}>
                <Text style={styles.heading2}>your basket</Text>
                <Text style={styles.inputLabel2}>Looks like there’s no items in your basket... yet.</Text>
                <TouchableOpacity onPress={() => navigation.navigate("CollectionLocationSearch")} style={[styles.paynowT, styles.gap7]}><Text style={styles.payNow}>browse menu</Text></TouchableOpacity>
            </View>
        </View>
    );
}
