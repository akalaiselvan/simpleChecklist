import React,{useReducer,useEffect,useState} from 'react';
import {database} from '../DB/database';
export default (reducer,actions,initialValue)=>{

    const Context = React.createContext();

    const Provider=({children})=>{

        const [state,dispatch]=useReducer(reducer,initialValue);

        const methods={};


        const [hdr,setHdr]=useState([]);
        const [list,setList]=useState([]);
        const [misc,setMisc]=useState([]);
        const [isLoaded,setIsLoaded]=useState(false);

        useEffect(()=>{
             refreshState();
        },[]);

        const refreshState= ()=>{
               //database.ExecuteInsert('delete from list_hdr');
               //database.ExecuteInsert('delete from list_dtl');
               //database.ExecuteInsert('delete from app_prop');
            console.log('Refreshing state')
            database.CreateTable('create table IF NOT EXISTS list_hdr ( id integer, title varchar(100));');
            database.CreateTable('create table IF NOT EXISTS list_dtl ( pid integer, id integer, value varchar(100),isSelected varchar(10));');
            database.CreateTable('create table IF NOT EXISTS app_prop (bgColor varchar(20),font varchar(50));');
             database.setProps('Select * from app_prop');
             database.getList('Select * from list_hdr',setHdr);
             database.getList('Select * from list_dtl',setList);
             database.getList('Select * from app_prop',setMisc);
             console.log('Setting is load true')

            setIsLoaded(true);
        }

    

        for(let key in actions){
            methods[key]=actions[key](dispatch);
        }

        return<Context.Provider value={{state,...methods,hdr,list,misc,isLoaded}}>
            {children}
        </Context.Provider>
    }
    return {Context,Provider}
}
