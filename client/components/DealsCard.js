import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'

const DealsCard = ({ imgUrl, title }) => {


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
    return (
        <TouchableOpacity className='relative mr-2 ml-1 pt-2' style={styles.viewClass}>

            <Image source={{
                uri: imgUrl
            }}
                className='h-28 w-40 rounded-lg'
                style={{ resizeMode: 'contain' }}
            />
        </TouchableOpacity>
    )
}

export default DealsCard;