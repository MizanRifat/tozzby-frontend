import React, { useReducer } from 'react';
import loadingBarReducer from '../Reducers/loadingBarReducer';
import LoadingBar from 'react-top-loading-bar';

export default function useLoadingBar() {

    const [loadingBarProgress, dispatchLoadingBarProgress] = useReducer(loadingBarReducer, {
        value: 0
    })


    const add = (value) => {
        dispatchLoadingBarProgress({
            type: 'ADD',
            payload: value
        })
    }

    const jsx = (
        <LoadingBar
            progress={loadingBarProgress.value}
            height={3}
            color='cyan'
        />
    )




    return [add,jsx];
}
