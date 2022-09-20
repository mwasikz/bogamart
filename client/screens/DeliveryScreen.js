import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectShop } from '../features/shopSlice';
import { XIcon } from 'react-native-heroicons/solid';
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { PhoneIcon } from 'react-native-heroicons/solid';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const shop = useSelector(selectShop);
    return (
        <View className="bg-[#ef8700] flex-1">
            <SafeAreaView className="z-50">
                <View className="flex-row justify-between items-center p-5 mt-5">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                    >
                        <XIcon color="white" size={30} />
                    </TouchableOpacity>
                    <Text className="font-light text-white text-lg">Order Help</Text>
                </View>
                <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-lg">
                    <View className="flex-row justify-between">
                        <View>

                            <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                            <Text className="text-2xl font-bold">30-45 Minutes</Text>
                        </View>
                        <Image
                            source={require("../assets/deliveryTruck.png")}
                            style={{
                                height: 64,
                                width: 64,
                                marginTop: 10,
                            }}
                        />
                    </View>
                    <Progress.Bar size={30} color="#ef8700" indeterminate={true} />
                    <Text className="mt-3 text gray-500">
                        Your order is on the way!
                    </Text>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={{
                    latitude: 23.891136859934274,
                    longitude: 90.41768627056939,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}

                className="flex-1 -m-10 z-0"
                mapType='mutedStandard'
            >

                <Marker
                    coordinate={{
                        latitude: 23.891136859934274,
                        longitude: 90.41768627056939,
                    }}
                    identifier="origin"
                    pinColor='#9e110bff'
                />

            </MapView>

            <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
                <Image
                    source={require("../assets/delivery-man.png")}

                    className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
                />
                <View className="flex-1">
                    <Text className="text-lg">Shamsul Alam</Text>
                    <Text className="text-gray-400">Your Rider</Text>
                </View>
                <View className="flex-row">
                    <TouchableOpacity>
                        <PhoneIcon size={22} color="#ef8700" />
                        <Text className="text-[#ef8700] text-lg mr-5 font-light">Call</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen
