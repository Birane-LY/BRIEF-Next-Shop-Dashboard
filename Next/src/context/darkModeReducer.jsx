
const DarkModeReducer=(state,action)=>{
    switch(action.type){
        case "LIGHT":{
            return {darkMode: false,}
        };
    
        case "DARK":{
            return {darkMode: true,}
        };
    

         case "TOGGLE":{
            return {darkMode: !satisfies.darkMode,

            };
        } 
        default:
            return state;

  
}}
export default DarkModeReducer;