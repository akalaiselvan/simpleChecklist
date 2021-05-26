import React from 'react';
import {View,StyleSheet} from 'react-native';

const Spacer=({children})=>{
    return <View style={styles.margin}>
        {children}
    </View>
}

const styles=StyleSheet.create({
    margin:{
        margin :10
    }
});

export default Spacer;