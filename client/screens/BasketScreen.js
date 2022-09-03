import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from '../features/shopSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from "react-currency-formatter";
import PreparingOrderScreen from './PreparingOrderScreen';

const BasketScreen = () => {
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
                <View className="p-5 bg-white shadow-2xl">
                    <View>
                        <Text className="text-lg font-bold text-center mt-10">Basket</Text>

                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-white absolute top-10 right-5"
                    >
                        <XCircleIcon color="#9e110bff" height={50} width={50} />
                    </TouchableOpacity>
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
                                <Text
                                    className="text-red-700 text-xs"
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                >
                                    Remove
                                </Text>
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
                        <Text className="font-extrabold">
                            <Currency quantity={basketTotal + 50} currency="BDT" />
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PreparingOrderScreen')}
                        className="rounded-lg bg-[#ef8700] p-2">
                        <Text className="text-center text-white text-lg font-bold p-1">Place Order</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default BasketScreen;