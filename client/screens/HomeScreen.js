import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Deals from '../components/Deals';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';



const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

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
        <SafeAreaView className="bg-white pt-10" >

            {/* Header Section */}

            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">
                        Deliver Now!
                    </Text>

                    <Text className="font-bold text-lg">
                        Current Location
                        <ChevronDownIcon size={20} color="#9e110bff" />
                    </Text>
                </View>

                <UserIcon size={35} color="#9e110bff" />

            </View>
            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-slate-200 p-2 rounded-lg'>
                    <SearchIcon color='gray' size={20} />
                    <TextInput
                        placeholder='Search'
                        keyboardType='default'
                    />
                </View>
                <AdjustmentsIcon color="#9e110bff" />
            </View>

            {/* Scrollable Body  */}
            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories  */}
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