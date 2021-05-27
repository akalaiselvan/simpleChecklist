import createContext from './createContext';
import {database} from '../DB/database';


const reducer=(state,actions)=>{
    switch(actions.type){
        case 'add':
            const pid=Math.round(new Date().getTime()/1000);
            //const cid=Math.round(new Date().getTime()/10000+1);
            addItem(pid,actions.payload.title,actions.payload.clist);
            return {...state,list:[...state.list,{title:actions.payload.title,
                              lists:actions.payload.clist,
                              id:pid,
                              isSelected:false}]}
        case 'check':

                    const value=actions.payload.value;
                    const parid=actions.payload.pid;
                    const chid=actions.payload.id;
                    database.updateCheck([value,parid,chid]);        

                 let temp=[...state.list];
                 let p=temp.findIndex(p=>p.id===parid);
                 let c=temp[p].lists.findIndex(c=>c.id===chid)
                 temp[p].lists[c].isSelected=value;
                 return {...state,list:temp};
        case 'deleteSelected':
            deleteItem(state.list,actions.payload)
            return {...state,list:state.list.filter(m=>m.id!==actions.payload)}

        case 'del_key':
             if(state.list.find(m=>m.isSelected)){
                 return {...state,showDelete:true}
                }else{
                    return {...state,showDelete:false}
                };
        case 'dragged':
            return {...state,list:actions.payload} 
        case 'cont_drag':
            updateAfterDrag(actions.payload.id,actions.payload.data);    
            return {...state,list:state.list.map(item=>{
                if(item.id===actions.payload.id){
                    return{...item,lists:actions.payload.data}
                }else{
                    return item;
                }
            })};     
        case 'update':
            //console.log('Update Payload : '+JSON.stringify(actions.payload));
            const title=actions.payload.title;
            const id=actions.payload.id;
            const lists=actions.payload.lists;

            // updating database

            database.updateHdr([title,id]);
            database.deleteDtl([id]);
            lists.forEach(ele=>{
                console.log('update loop'+JSON.stringify(ele))
                database.insertDtl([id,ele.id,ele.value,ele.isSelected])
            })

            //updating state

            const lis=state.list;
            const item=lis.find(f=>f.id===id)
            item.title=title;
            const index=lis.findIndex(f=>f.id===id)
            lis[index].lists=lists;
            return {...state,list:lis}
        case 'theme':
            if(state.bgColor==='#FFFFFF'){
                database.updateTheme(['#121212']);
                return {...state,bgColor:'#121212'}
            }
            else{
                database.updateTheme(['#FFFFFF']);
                return {...state,bgColor:'#FFFFFF'}
            }
        case 'font':
            database.updateFont([actions.payload]);
            return {...state,font:actions.payload}    
        case 'removeAll':
            database.ExecuteInsert('delete from list_hdr');
            database.ExecuteInsert('delete from list_dtl');
            return {...state,list:[]}       
        case 'setMisc':
            const bColor=actions.payload.misc[0].bgColor;
            const fnt=actions.payload.misc[0].font;
            return {...state,bgColor:bColor,font:fnt}                 
        case 'setInitial':
                //console.log('Setting initial hdr'+JSON.stringify(actions.payload.hdr));
                //console.log('Setting initial dtl'+JSON.stringify(actions.payload.list));
                //console.log('Setting initial misc'+JSON.stringify(actions.payload.misc));
                const header=actions.payload.hdr;
                const detail=actions.payload.list;
                const bgColor=actions.payload.misc[0].bgColor;
                const font=actions.payload.misc[0].font;
    
                const hdrList=header.map(hitem=>{
                let hdrListObj={};
                hdrListObj.title=hitem.title,
                hdrListObj.id=hitem.id,
                hdrListObj.lists=detail.filter(item=>{
                    if(item.pid===hitem.id){
                    let listObj={}
                    listObj.id=item.id;
                    listObj.value=item.value;
                    listObj.isSelected=item.isSelected;
                    return listObj
                    }
                });
                return hdrListObj
                });
    
                const stateObj={
                    list:hdrList,
                    bgColor:bgColor,
                    font:font
                }
    
                //console.log('LAST CHANCE : '+JSON.stringify(stateObj));
                return stateObj;      
            case 'setLoad':
                return {...state,reqLoad:false}                        
        default:
            return state;
    }
}

const updateAfterDrag=(id,list)=>{
    database.deleteDtl([id]);
    list.forEach(ele=>{
        database.insertDtl([id,ele.id,ele.value,ele.isSelected]);
    });
}


const deleteItem=(list,id)=>{
    database.deleteHdr([id]);
    list.forEach(ele=>{
        if(ele.id===id){
            database.deleteDtl([id]);
        }
    })
}

const addItem=(pid,title,clist)=>{
    database.insertHdr([pid,title]);
    //let n=1;
    clist.forEach(ele=>{
        database.insertDtl([pid,ele.id,ele.value,'false']);
        //n++;
    })
}


const addChecklist=dispatch=>({title,clist})=>{
    dispatch({type:'add',payload:{title,clist}});
}

const switchCheck=dispatch=>(pid,id,value)=>{
    let check=value===true?'true':'false';
    console.log(`Received payoad id : ${pid}, id : ${id}, value :${value}`);
    dispatch({type:'check',payload:{pid:pid,id:id,value:check}});
}

const deleteSelected=dispatch=>(id)=>{
    dispatch({type:'deleteSelected',payload:id});
}

const dragged=dispatch=>(data)=>{
    dispatch({type:'dragged',payload:data.data})
}

const contDrag=dispatch=>(id,data)=>{
    dispatch({type:'cont_drag',payload:{data:data.data,id:id}});
}

const updateList=dispatch=>(id,clist,title)=>{
    dispatch({type:'update',payload:{id:id,lists:clist,title:title}});
}

const switchTheme=dispatch=>()=>{
    dispatch({type:'theme'})
}

const switchFonts=dispatch=>(value)=>{
    dispatch({type:'font',payload:value})
}

const removeAll=dispatch=>()=>{
    dispatch({type:'removeAll'});
}


const setReqLoad=dispatch=>()=>{
    dispatch({type:'setLoad'});
}

const setStates=dispatch=>(hdr,list,misc)=>{
    // console.log('Setting temp state hdr '+JSON.stringify(hdr));
    // console.log('Setting temp state dtl '+JSON.stringify(list));
    // console.log('Setting temp state misc'+JSON.stringify(misc));
    dispatch({type:'setInitial',payload:{hdr:hdr,list:list,misc:misc}})
}

const setMisc=dispatch=>(misc)=>{
    dispatch({type:'setMisc',payload:{misc:misc}})
}

export const {Context,Provider}=createContext(reducer,{ addChecklist,
                                                        switchCheck,
                                                        deleteSelected,
                                                        dragged,
                                                        contDrag,
                                                        updateList,
                                                        switchTheme,
                                                        switchFonts,
                                                        removeAll,
                                                        setStates,
                                                        setReqLoad,
                                                        setMisc
                                        
                                                    },
                                                             {list:[
                                                    // {
                                                    // title:'Title',
                                                    // lists:[{id:1,value:'item',isSelected:false},{id:2,value:'itemw',isSelected:false}],
                                                    // id:123212,
                                                    // },
                                                    // {
                                                    // title:'Second',
                                                    // lists:[{id:3,value:'item3',isSelected:false},{id:4,value:'item4',isSelected:false}],
                                                    // id:123202,
                                                    // },
                                               ],
                                               bgColor:'#121212',
                                               font:'normal',
                                               reqLoad:true
                                            }                                                   
                                                   );



                                            //        {list:[
                                            //         {
                                            //         title:'Title',
                                            //         lists:[{id:1,value:'item',isSelected:false},{id:2,value:'itemw',isSelected:false}],
                                            //         id:123212,
                                            //         },
                                            //         {
                                            //         title:'Second',
                                            //         lists:[{id:3,value:'item3',isSelected:false},{id:4,value:'item4',isSelected:false}],
                                            //         id:123202,
                                            //         },
                                            //    ],
                                            //    bgColor:'#071815',
                                            //    font:'normal'
                                            // }
