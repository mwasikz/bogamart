import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    UserIcon,
    SearchIcon,
    AdjustmentsIcon,
} from "react-native-heroicons/solid";
import { ChevronDownIcon } from "react-native-heroicons/outline"
import Deals from '../components/Deals';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';



const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])
    const [featuredDeals, setFeaturedDeals] = useState([])

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

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "deals"] {
            ...,
            products[]->{
              ...,
            }

        }`).then(data2 => {
            setFeaturedDeals(data2)
        })
    }, [])

    return (
        <SafeAreaView className="bg-white pt-10" >

            {/* Header Section */}

            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={require("../assets/logo.png")}
                    className="bg-[#fef2e5] rounded-lg"
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: "contain"

                    }}

                />

                <View className="flex-1">
                    <Text className="font-bold text-[#361c00] text-xs">
                        Deliver Now!
                    </Text>

                    <Text className="font-bold text-lg text-[#361c00]">
                        Current Location
                        <ChevronDownIcon size={20} color="#ef8700" />
                    </Text>
                </View>

                <UserIcon size={30} color="#ef8700" />

            </View>
            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-4 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-[#F1F1F1] p-2 rounded-lg'>
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