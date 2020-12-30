import React, { useState, createContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile';
import Orders from './Orders';
import OrderView from './OrderView/OrderView';
import Wishlist from './Wishlist';
import Reviews from './Reviews';

export const ProfileContext = createContext();
export default function UserBody() {

    const [orders, setOrders] = useState({
        orders:[],
        loading:true
    })

    const [reviews, setReviews] = useState({
        reviews:[],
        loading:true
    })
    
    return (
        <div>

            <ProfileContext.Provider value={{ orders, setOrders,reviews, setReviews }}>

                <Switch>

                    <Route
                        path='/account/profile' component={Profile}
                    />
                    <Route
                        path='/account/orders' component={Orders}
                    />
                    <Route
                        path='/account/order/view/:id' component={OrderView}
                    />
                    <Route
                        path='/account/wishlist' component={Wishlist}
                    />
                    <Route
                        path='/account/reviews' component={Reviews}
                    />

                    <Redirect from='/account' to='/account/profile' />



                </Switch>
            </ProfileContext.Provider>
        </div>
    )
}
