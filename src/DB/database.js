import SQLite from "react-native-sqlite-storage"
// import * as FileSystem from 'expo-file-system'
// import * as Permissions from 'expo-permissions'
// import * as MediaLibrary from 'expo-media-library'
const db = SQLite.openDatabase({name:'CList.db',location:'default'})


const executeSelect=(sql,params)=>new Promise((resolve,reject)=>{
  db.transaction((tx)=>{
    tx.executeSql(sql,params,(trans,results)=>{
      resolve(results);
    },
    (error)=>{
      console.log("ERR"+JSON.stringify(error))
      reject(JSON.stringify(error));
    });      
  });
});


const getList= async (qry,func)=>{
  let select=await executeSelect(qry,[],func);
  let rows=select.rows;
  let tmp=[];
  for(let i=0;i<rows.length;i++){
    let item=rows.item(i);
    tmp.push(item);
  }
  func(tmp);
}


const getLists = async (query,setList) => {
  return new Promise((resolve,reject)=>{
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          [],
          (_, { rows: { _array } }) => {
            console.log('Setting : '+JSON.stringify(_array.length))
            setList(_array)
          }
        );
      },
      (t, error)     => console.log("db error load users"),
      (_t, _success) => console.log("loaded users")  
    );
  })
}

const setProp = async (query) => {
  console.log("db: "+JSON.stringify(db))
  return new Promise((resolve,reject)=>{
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          [],
          (_, res) => {
            if(res.rows.length<1){
              console.log('Default props not found setting default props');
              ExecuteInsert("insert into app_prop values ('#eaf3f1','normal')");
            }
          }
        );
      },
      (t, error)     => console.log("db error load users"),
      (_t, _success) => console.log("succ"+_success)  
    );
  })
}

const setProps= async (qry)=>{
  let select=await executeSelect(qry,[]);
  let rows=select.rows;
  console.log("Length is : "+rows.length);
  if(rows.length<1){
      console.log('Default props not found setting default props');
      ExecuteInsert("insert into app_prop values ('#eaf3f1','normal')");
  }
}





const insertUser = (userName, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into users (name) values (?)', [userName] );
    },
    (t, error) => { console.log("db error insertUser"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const insertQry = (qry,func) => {
  db.transaction( tx => {
      tx.executeSql( qry );
    },
    (t, error) => { func()},
    (t, success) => { console.log(success) }
  )
}


const ExecuteInsert=(sql,params=[])=>new Promise((resolve,reject)=>{
  db.transaction((tx)=>{
    tx.executeSql(sql,params,(trans,results)=>{
      resolve(results);
    },
    (error)=>{
      reject(error);
    }),      
    (_, success) => { 
      resolve(success)
    };
  });
});

const CreateTable=(sql,params=[])=>new Promise((resolve,reject)=>{
  db.transaction((tx)=>{
    tx.executeSql(sql,params,(trans,results)=>{
      //console.log('table created results : '+JSON.stringify(results.rows._array));
      const res=JSON.stringify(results.rows._array[0]);
      console.log('Result is '+res);
      resolve(results);
    },
    (error)=>{
      console.log('ERROR : '+JSON.stringify(error));
      reject(error);
    }),      
    (_, success) => { 
      console.log('SUCC '+JSON.stringify(success));
      resolve(success)
    };
  });
});

const insertHdr=async(params)=>{
  let insert= await ExecuteInsert("INSERT INTO list_hdr(id,title) VALUES (?,?)",params);
	console.log(JSON.stringify(insert));
}


const insertDtl=async(params)=>{
  let insert= await ExecuteInsert("INSERT INTO list_dtl(pid,id,value,isSelected) VALUES (?,?,?,?)",params);
	console.log(JSON.stringify(insert));
}

const deleteHdr=async(params)=>{
  let insert= await ExecuteInsert("delete from list_hdr where id=?",params);
	console.log(JSON.stringify(insert));
}

const deleteDtl=async(params)=>{
  let insert= await ExecuteInsert("delete from list_dtl where pid=?",params);
	console.log(JSON.stringify(insert));
}

const updateHdr=async(params)=>{
  let qry=await ExecuteInsert("update list_hdr set title = ? where id = ?",params)
	console.log(JSON.stringify(qry));
}

const updateCheck=async(params)=>{
  let qry = await ExecuteInsert("update list_dtl set isSelected = ? where pid = ? and id = ? ",params)
	console.log(JSON.stringify(qry));
}

const updateTheme=async(params)=>{
  let qry=await ExecuteInsert("update app_prop set bgColor = ?",params);
}

const updateFont=async(params)=>{
  let qry=await ExecuteInsert("update app_prop set font = ?",params)
}


// const setupDatabaseAsync = async (create) => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//         tx.executeSql(create);
//       },
//       (_, error) => { console.log("db error creating table "+create); console.log(error); reject(error) },
//       (_, success) => { resolve(success)}
//     )
//   })
// }

// const setupUsersAsync = async () => {
//   return new Promise((resolve, _reject) => {
//     db.transaction( tx => {
//         tx.executeSql( 'insert into users (id, name) values (?,?)', [1, "john"] );
//       },
//       (t, error) => { console.log("db error insertUser"); console.log(error); resolve() },
//       (t, success) => { resolve(success)}
//     )
//   })
// }

// const backupDatabase=async()=>{
//   const databaseFileUri = `${FileSystem.documentDirectory}/SQLite/CList.db`;
//   const backupFileUri = `${FileSystem.documentDirectory}SQLite/Newb/CList.db`;

//   const perm= await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
//   if(perm.status!='granted'){
//     console.log('You should give permission to take backup')
//     return;
//   }

//     await FileSystem.copyAsync({
//       from: databaseFileUri,
//         to: backupFileUri,
//  });
// }

// const closeDB=(db)=>{
//   if(db){
//     console.log('Closing database');
//     db.close()
//       .then(status=>{
//         console.log('database closed');
//       })
//       .catch(error=>{
//         console.log('Close database failed '+error)
//       })
//   }else{
//     console.log('DB not in open mode')
//   }
// }


// const restoreDb=()=>{
//   closeDB(db);
//   const databaseFileUri = `${FileSystem.documentDirectory}/SQLite/CList.db`;

//   // Delete database file url
//   // move backup to this path 
//   // initialize state

//   SQLite.openDatabase()
// }

export const database = {
  getLists,
  insertUser,
  insertQry,insertHdr,insertDtl,
  deleteHdr,deleteDtl,updateHdr,ExecuteInsert,getList,
  updateCheck,updateTheme,updateFont,CreateTable,setProps
}
