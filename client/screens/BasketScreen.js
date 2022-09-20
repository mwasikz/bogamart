import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../features/shopSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { ArrowLeftIcon, XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from "react-currency-formatter";
import PreparingOrderScreen from './PreparingOrderScreen';

const BasketScreen = () => {

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
                    shadowRadius: 5,
                    elevation: 10,
                },
            }),
        }
    };

    const navigation = useNavigation();
    const shop = useSelector(selectShop);
    const products = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBusket, setGroupedItemsInBusket] = useState([]);


    useEffect(() => {
        const groupedItems = products.reduce((results, product) => {
            (results[product.id] = results[product.id] || []).push(product);
            return results;
        }, {});

        setGroupedItemsInBusket(groupedItems);
    }, [products]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className="pb-10 px-2 bg-white" style={styles.viewClass}>
                    <View>
                        <TouchableOpacity
                            onPress={navigation.goBack}
                            className="absolute top-10 left-1 p-5 bg-white rounded-full opacity-80">
                            <ArrowLeftIcon size={20} color="#ef8700" />
                        </TouchableOpacity>
                        <Text className="text-xl font-medium text-center mt-10 text-[#361c00]">Basket</Text>

                    </View>

                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 my-5 bg-white">
                    <Image
                        source={require("../assets/package.png")}
                        className="h-10 w-10"
                    />
                    <Text className="flex-1">Deliver in 30-45 minute</Text>
                    <TouchableOpacity>
                        <Text className="text-[#319206]">Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="divide-y divide-gray-200">

                    {Object.entries(groupedItemsInBusket).map(([key, products]) => (
                        <View key={key} className="flex-row items-center space-x-3 py-3 px-5 bg-white">
                            <Text className="text-gray-500 text-lg">{products.length} x</Text>
                            <Image
                                source={{
                                    uri: urlFor(products[0]?.image).url()
                                }}
                                className="h-12 w-12 rounded-full"
                            />
                            <Text className="flex-1">{products[0]?.name}</Text>
                            <Text className="text-gray-600">
                                <Currency quantity={products[0]?.price} currency="BDT" />
                            </Text>

                            <TouchableOpacity>
                                <XCircleIcon color="#9e110bff" height={30} width={30}
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-600">Subtotal</Text>
                        <Text className="text-gray-600">
                            <Currency quantity={basketTotal} currency="BDT" />
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-600">Delivery Fee</Text>
                        <Text className="text-gray-600">
                            <Currency quantity={50} currency="BDT" />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Order Total</Text>
                        <Text className="font-extrabold text-[#361c00]">
                            <Currency quantity={basketTotal + 50} currency="BDT" />
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PreparingOrderScreen')}
                        className="rounded-lg bg-[#ef8700] p-2" style={styles.viewClass}>
                        <Text className="text-center text-white text-lg font-bold p-1">Place Order</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default BasketScreen;
