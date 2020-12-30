export default(state,action)=>{
    switch (action.type) {
        case 'LOGIN':
            
            return{
                ...state,
                user:action.payload,
                loading:false
            }
        case "LOGOUT":
            return {
                ...state,
                user:{},
                loading:false
            }
        case "ERROR":
            return {
                ...state,
                loading:false,
                error:{
                    message:action.payload
                }
            }
    
        default:
            return state;
    }
}