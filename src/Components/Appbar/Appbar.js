import React, { useState, useEffect, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import { Toolbar, Paper, IconButton, Typography, InputBase, Badge, MenuItem, Menu, createMuiTheme, ThemeProvider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Hidden } from '@material-ui/core';
import axios from 'axios';
import { AppContext } from '../../Routes';
import ListIcon from '@material-ui/icons/List';
import MiniCart from '../Cart/MiniCart'
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import CategoryList from '../Sidebars/CategoryList';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchBox from './SearchBox';
import CategoryDrawer from './CategoryDrawer';
import { useHistory } from 'react-router-dom';
import NotiToast from '../Common/NotiToast';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // position:'relative'
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
  },
  title: {
    display: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleLink: {
    color: 'white',
    '&:hover': {
      color: 'white',
      textDecoration: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      flex:1
    },
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    height: '35px',
    color: 'inherit',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `1em`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  select: {

  },
  sectionDesktop: {
    // display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  toolbar: {
    padding:'0 60px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 16px',
    },
  },
  tab: {
    background: 'darkslateblue',
    display: 'flex',
    display: 'inline-block',
    padding: '10px 22px',
    marginLeft: '58px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  listContainer: {
    position: 'absolute',
    left: '60px',
    top: '60px',
    minHeight: '250px',
    transition: '.2s ease-in',

  },
  show: {
    top: 46,
    opacity: 1
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  },
  iconBtn:{
    [theme.breakpoints.down('sm')]: {
      padding:'4px'
    },

  }

}));

export default function PrimarySearchAppBar() {
  const history = useHistory();
  const toast = NotiToast();
  const { user, setUser, cartItems, wishListItems, setCartItems, setWishListItems, authOpen, setAuthOpen, dispatchLoadingBarProgress, setLoggedOut } = useContext(AppContext);
  const [showCart, setShowCart] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const handleLogin = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setAuthOpen({ comp: 1, state: true,title:'Login' });
  }

  const handleRegister = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setAuthOpen({ comp: 2, state: true,title:'Register' });
  }
  const handleLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/customer/logout?token=true`,
      {
        withCredentials: true
      }
    )
      .then(response => {
        setUser({})
        setCartItems({})
        setWishListItems([])
        setLoggedOut(true)
        toast(response.data.message, 'success')
      })
      .catch(error => {
      })
  }

  const handleAccount = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push('/account')

  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        Object.entries(user).length > 0 ?
          <>
            <MenuItem onClick={handleAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>

          :
          <>
            <MenuItem onClick={handleLogin}>Login</MenuItem>
            <MenuItem onClick={handleRegister}>Register</MenuItem>
          </>
      }

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => history.push('/account/wishlist')}>
          <Badge badgeContent={wishListItems.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>

      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit" onClick={() => history.push('/cart')}>
          <Badge badgeContent={cartItems.items_count} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>

      </MenuItem>
    </Menu>
  );



  return (
    <div className={classes.grow}>
      <MiniCart showCart={showCart} setShowCart={setShowCart} />
      <MuiAppBar position="fixed">
        <Toolbar className={classes.toolbar}>


          <Hidden mdUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => setCatOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Link to='/' className={classes.titleLink}>
            <div className="d-flex">
              <ShoppingCartOutlinedIcon style={{marginRight:'7px',marginTop:'7px',fontSize:'30px'}}/>
              <p style={{ fontFamily: `Sriracha, cursive`,fontSize:'30px',margin:0 }}>

                {
                  process.env.REACT_APP_NAME.toUpperCase()
                }
              </p>
            </div>
          </Link>


            <Hidden smDown>
              <SearchBox />
            </Hidden>


            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="margin-right: 7px; margin-top: 7px; font-size: 30px;"><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>



          <div className={classes.sectionDesktop}>

            <IconButton className={classes.iconBtn} aria-label="show 4 new mails" color="inherit" onClick={() => history.push('/account/wishlist')}>
              <Badge badgeContent={wishListItems.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton  className={classes.iconBtn} color="inherit" onMouseEnter={() => window.innerWidth > 480 && setShowCart(true)} onMouseLeave={() => setShowCart(false)} onClick={() => history.push('/cart')}>
              <Badge badgeContent={cartItems.items_count} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              className={classes.iconBtn}
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

          </div>

          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}



        </Toolbar>

        <div className="" style={{ position: 'relative' }} >

          <div
            className={classes.tab}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >

            <ListIcon />

            <h5 style={{ fontSize: '16px', fontWeight: 700, marginLeft: '5px', display: 'inline' }}>
              ALL CATEGORIES
            </h5>

          </div>

          <Paper elevation={3} className={`${classes.listContainer} ${showCategories ? classes.show : classes.hide}`} onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)} >
            <CategoryList />
          </Paper>

        </div>

      </MuiAppBar>

      <CategoryDrawer open={catOpen} setOpen={setCatOpen} />

      {/* <Auth open={open} setOpen={setOpen} /> */}

      {renderMobileMenu}
      {renderMenu}


    </div>
  );
}
