import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const DealsCard = ({ imgUrl, title }) => {
    return (
        <TouchableOpacity className='relative mr-2'>
            <Image source={{
                uri: imgUrl
            }}
                className='h-28 w-40 rounded'
                style={{ resizeMode: 'contain' }}
            />
        </TouchableOpacity>
    )
}

export default DealsCard;