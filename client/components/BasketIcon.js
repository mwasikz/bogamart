import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';

const BasketIcon = () => {

    const styles = {
        viewClass: {

            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    backgroundColor: 'white'
                },
                android: {
                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 10,
                    elevation: 3,


                },
            }),
        }
    };

    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);


    if (items.length == 0) return null;

    return (
        <View className="absolute bottom-9 w-full z-50" >
            <TouchableOpacity
                onPress={() => navigation.navigate("Basket")}
                className="bg-[#ef8700] mx-5 px-3 py-2 rounded-lg flex-row items-center space-x-1" style={styles.viewClass}>
                <Text className="text-gray-600 font-bold text-lg bg-white py-1 px-3 rounded-full">{items.length}</Text>
                <Text className="flex-1 text-white font-extrabold text-lg text-center">
                    View Basket
                </Text>
                <Text className="text-lg text-white font-extrabold">
                    <Currency quantity={basketTotal} currency="BDT" />
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon