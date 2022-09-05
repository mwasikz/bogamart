import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 5000)
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../assets/processingOrder.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-72 w-72"
            />

            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-md my-10 text-gray-400 font-bold text-center"
            >
                Please wait while your order is being processed
            </Animatable.Text>
            <Progress.Circle
                size={60}
                indeterminate={true}
                color="#ef8700"
            />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen