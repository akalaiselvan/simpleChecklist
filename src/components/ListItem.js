import React, { useContext } from 'react';
import { StyleSheet ,View ,Text,TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Context as CheckListContext} from '../context/CheckListContext'; 
import  SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../UI/Color'

const ListItem=({item,func,font,bgColor})=>{
    let boxColor=bgColor==='#121212'?Colors.darkboxColor:Colors.lightboxColor;
    return<View >
            <View style={[styles.item,{backgroundColor:boxColor}]} >
                <Text style={[styles.text,{fontFamily:font}]}>{item.title}</Text> 
                <TouchableOpacity style={styles.options}
                                    onPress={()=>func()}>
                        <SimpleLineIcons name="options-vertical" size={20} color="black" />
                </TouchableOpacity>
            </View>   
            </View>
}

const ListBox=({pid,item})=>{

    const {switchCheck,state:{font,bgColor}}=useContext(CheckListContext);
    let check=item.isSelected==='true'?true:false;
    let boxColor=bgColor==='#121212'?Colors.darkboxColor:Colors.lightboxColor
    return <View style={[styles.boxItem,{backgroundColor:boxColor}]}>
        {pid?
              <CheckBox 
              tintColors={{true:'#333',false:'#333'}}
              value={check}
              onValueChange={(v)=>switchCheck(pid,item.id,v)}/>:null}
              <Text style={[styles.boxtext,
                        {fontFamily:font}]}>
                                {item.value}</Text> 
</View>
}

const styles=StyleSheet.create({
    item:{
        height:60,
        marginTop:10,
        //backgroundColor:'#f0ffff',
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
        marginLeft:10,
        marginRight:10,
        borderRadius:15,
        borderColor:'#000000',

    },
    text:{
        flex:1,
        marginTop:12,
        marginLeft:20
    },
    boxItem:{
        marginTop:10,
        backgroundColor:'#f0ffff',
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5,
        borderRadius:10,
        marginLeft:10,
        marginRight:10
    },
    boxtext:{
        flex:1,
        marginTop:5,
        marginLeft:10
    },
    options:{
        marginTop:12,
        marginRight:10
    },
    more:{
        display:'none',
        position:'absolute',
        bottom:0,
        right:20,
    }
});

export {ListBox};

export default ListItem;
