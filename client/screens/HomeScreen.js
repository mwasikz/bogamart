import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    UserIcon,
    SearchIcon,
    AdjustmentsIcon,
    ShoppingCartIcon
} from "react-native-heroicons/solid";
import { ChevronDownIcon } from "react-native-heroicons/outline"
import Deals from '../components/Deals';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';



const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])
    const [featuredDeals, setFeaturedDeals] = useState([]);

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
                    elevation: 5,


                },
            }),
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "categories"] {
            ...,
            shops[]->{
                ...,
                products[]->
            }
        }`).then(data => {
            setFeaturedCategories(data)
        })
    }, [])


    return (

        <SafeAreaView className="bg-[#fef2e5] pt-10">

            {/* Header Section */}

            <View className="flex-row pb-3 items-center mx-4 space-x-4">
                <Image
                    source={require("../assets/logo.png")}
                    className="rounded-lg"
                    style={{
                        width: 42,
                        height: 42,
                        resizeMode: "contain"

                    }}

                />

                <View className="flex-1">
                    <Text className="font-bold text-[#361c00] text-xs">
                        Deliver Now!
                    </Text>

                    <Text className="text-lg text-[#361c00]">
                        Current Location
                        <ChevronDownIcon size={20} color="#ef8700" />
                    </Text>
                </View>
                <TouchableOpacity

                    onPress={() => navigation.navigate("Basket")}
                >
                    <ShoppingCartIcon size={30} color="#ef8700" />
                </TouchableOpacity>

                <UserIcon size={30} color="#ef8700" />

            </View>
            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-4 mx-4' >
                <View className='flex-row flex-1 space-x-2 bg-slate-100 p-2 rounded-lg' style={styles.viewClass} >
                    <SearchIcon color='gray' size={20} />
                    <TextInput
                        placeholder='Search'
                        keyboardType='default'
                    />
                </View>
                <AdjustmentsIcon color="#ef8700" />
            </View>


            {/* Scrollable Body  */}
            <ScrollView
                className="bg-white mb-10"
                contentContainerStyle={{
                    paddingBottom: 100,

                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Deals  */}

                <Deals />



                {/* Featured */}

                {featuredCategories?.map(shop => (
                    <FeaturedRow
                        key={shop._id}
                        id={shop._id}
                        title={shop.name}
                        short_description={shop.short_description}
                    />
                ))}


            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen