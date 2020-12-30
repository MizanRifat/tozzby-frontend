import React, { useState, useEffect, createContext, useReducer } from 'react';
import Appbar from './Components/Appbar/Appbar'
import Index from './Components/Index/Index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test from './Components/Test/Test';
import Product from './Components/ProductPage/Product';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Auth from './Components/Auth/Auth';
import User from './Components/User/User';
import Category from './Components/Category/Category';
import Body from './Components/Index/Body';
import Footer from './Components/Common/Footer';
import userReducer from './Components/Reducers/UserReducer'
import loadingBarReducer from './Components/Reducers/loadingBarReducer';
import LoadingBar from 'react-top-loading-bar';
import NotiToast from './Components/Common/NotiToast';
import {useDispatch} from 'react-redux';
import { fetchSessionUser } from './Components/Redux/Ducks/SessionUserDuck';

const useStyles = makeStyles((theme) => ({
  topClass: {
    top: '60px',
    ['@media (max-width:480px)']: { 
      top:0
  },
  },
}));


export const AppContext = createContext();


function App() {

  const styleClasses = useStyles();

  const [loadingBarProgress, dispatchLoadingBarProgress] = useReducer(loadingBarReducer, {
    value: 0
  })

  const dispatch = useDispatch();



  const [cartItems, setCartItems] = useState({})
  const [cartItemsLoading, setCartItemsLoading] = useState(true)
  const [wishListItems, setWishListItems] = useState([])
  const [wishListItemsLoading, setWishListItemsLoading] = useState(true)


  const [authOpen, setAuthOpen] = useState({
    state: false,
    comp: 1,
    title:''
  })
  const [user, setUser] = useState({})
  const [loggedOut, setLoggedOut] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [categories, setCategories] = useState({
    state: [],
    loading: true
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/categoriestree`)
      .then(response => {
        setCategories({
          state: response.data,
          loading: false
        })
      }).catch(error => {
        setCategories({
          ...categories,
          loading: false
        })
      })
  }, [])

  useEffect(() => {
    dispatch(fetchSessionUser());
    
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/customer/get?token=true`,
      { withCredentials: true }
    )
      .then(response => {
        setUserLoading(false)
        setUser(response.data.data)
        

      }).catch(error => {
        setUser({})
        // console.log(error.response.status)
        setUserLoading(false)
      })

  }, [])

  useEffect(() => {

    if (Object.entries(user).length > 0) {

      axios.get(`${process.env.REACT_APP_DOMAIN}/api/wishlist?customer_id=${user.id}&token=true`,
        {
          withCredentials: true
        }
      )
        .then(response => {
          if (response.data.data != null) {
            setWishListItems(response.data.data)

          }
          setWishListItemsLoading(false)
        }).catch(error => {
          console.log(error)
          setWishListItemsLoading(false)
        })

    }

    axios.get(`${process.env.REACT_APP_DOMAIN}/api/checkout/cart?token=true`, { withCredentials: true })
      .then(response => {
        if (response.data.data != null) {
          // console.log('cart', response)
          setCartItems(response.data.data)

        }
        setCartItemsLoading(false)
      }).catch(error => {
        console.log(error)
        setCartItemsLoading(false)
      })

  }, [user])

  useEffect(() => {
    if (loggedOut) {
      // toast('sadfsda','success')
    }
  }, [loggedOut])



  return (
    <BrowserRouter>

      {
        // !userLoading ?
          true ?

          <AppContext.Provider value={{ 
             user,
             setUser,
             userLoading, 
             cartItems, 
             setCartItems, 
             cartItemsLoading, 
             authOpen, 
             setAuthOpen, 
             categories, 
             wishListItems, 
             setWishListItems, 
             loadingBarProgress, 
             dispatchLoadingBarProgress, 
             loggedOut, 
             setLoggedOut,
             wishListItemsLoading
            
            }}
          >


            <SnackbarProvider
              autoHideDuration={2000}
              classes={{
                anchorOriginTopRight: styleClasses.topClass
              }}

            >

              <Appbar />

              <div className="topMargin">
                <Switch>
                  <Route path='/' exact component={Body} />
                  <Route path='/product/:id' component={Product} />
                  <Route path='/category/:slug' component={Category} />
                  <Route path='/test' component={Test} />
                  <Route path='/cart' component={Cart} />
                  <Route path='/checkout' component={Checkout} />
                  <Route path='/account' component={User} />
                </Switch>
              </div>
            </SnackbarProvider>
            <Auth />
            <Footer />
          </AppContext.Provider>
          : ''
      }
    </BrowserRouter>
  );
}

export default App;
