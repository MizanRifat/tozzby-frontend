export default(state,action)=>{
    switch (action.type) {
        case 'ADD':
            
            return{
                ...state,
                value: state.value + action.payload
            }
        case 'MAKE_NULL':
            
            return{
                ...state,
                value: 0
            }
        case 'MAKE_FULL':
            
            return{
                ...state,
                value: 100
            }
       
        default:
            return state;
    }
}