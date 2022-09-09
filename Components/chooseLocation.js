import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, navigation } from 'react-native';
import { styles } from '../stylesheet';
export default function chooselocationcomponent({ navigation }) {
    const [collectionTime, setCollectionTime] = React.useState({
        title: "730"
    })
    return (
        <View key={Math.random()} style={styles.infoSet3}>
        </View>
    );
}
