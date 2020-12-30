export default(state,action)=>{

    // allReviews:[],
    //     fethLoading:true,
    //     comment:'',
    //     rating:1,
    //     createLoading:false

    switch (action.type) {
        case 'REVIEWS_FETCHED':
            
            return{
                ...state,
                allReviews:payload,
                fethLoading:false
            }
        case "REVIEW_SEND":
            return {
                ...state,
                user:{},
                loading:false
            }
        case "REVIEW_ADDED":
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