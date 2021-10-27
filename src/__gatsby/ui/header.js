//! must check the url with the to={`/dashboard/${slides[selectedSlide].url}`}
//* Potential Problem: Utilizing typeof window !== 'undefined' below...

import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Badge from '@mui/material/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'next/link';

import { CartContext } from '../../contexts';
import { useIsClient } from '../../hooks';

import search from '../../images/search.svg';
import cartIcon from '../../images/cart.svg';
import account from '../../images/account-header.svg';
import menu from '../../images/menu.svg';

const useStyles = makeStyles((theme) => ({
  coloredIndicator: {
    backgroundColor: theme.palette.common.offBlack,
  },
  logo: {
    marginLeft: theme.spacing(2),
    fontSize: '3.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
    },
  },
  logoText: {
    color: theme.palette.common.offBlack,
    fontWeight: 'normal',
    textDecoration: 'none',
    fontStyle: 'normal',
  },
  logoContainer: {
    [theme.breakpoints.down('md')]: {
      marginRight: 'auto',
    },
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  tabs: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  appBar: {
    // backgroundColor: '#f0f0f0',
  },
  icon: {
    height: '3rem',
    width: '3rem',
    [theme.breakpoints.down('xs')]: {
      height: '2rem',
      width: '2rem',
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    color: '#fff',
  },
  badge: {
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
      height: '1.1rem',
      width: '1.1rem',
      minWidth: 0,
    },
  },
}));
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
export default function Header({ categories }) {
  const classes = useStyles();
  const { cart } = useContext(CartContext);
  const { isClient, key } = useIsClient();
  const matchesMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const iOS =
    typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const activeIndex = () => {
    const pathname =
      typeof window !== 'undefined'
        ? window.location.pathname.split('/')[1]
        : null;

    const found = routes.indexOf(
      routes.filter(
        ({ node: { name, link } }) =>
          (link || `/dashboard/${name.toLowerCase()}`) === `/${pathname}`
      )[0]
    );

    return found === -1 ? false : found;
  };

  const routes = [
    ...categories,
    {
      node: {
        name: 'Search Cars',
        strapiId: 'search',
        link: '/dashboard/search',
      },
    },
    {
      node: {
        name: 'Sell/Trade',
        strapiId: 'sellCar',
        link: '/dashboard/sell-my-car',
      },
    },
    {
      node: {
        name: 'Financing',
        strapiId: 'financing',
        link: '/dashboard/financing',
      },
    },
    {
      node: {
        name: 'Contact Us',
        strapiId: 'contact',
        link: '/dashboard/contact',
      },
    },
  ];

  const tabs = (
    <Tabs
      value={!isClient ? 0 : activeIndex()}
      classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}
    >
      {routes.map((route) => (
        <Tab
          component={Link}
          href={
            route.node.link || `/dashboard/${route.node.name.toLowerCase()}`
          }
          classes={{ root: classes.tab }}
          label={route.node.name}
          key={route.node.strapiId}
        />
      ))}
    </Tabs>
  );

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {[
          ...routes,
          {
            node: {
              name: 'Account',
              strapiId: 'account',
              link: '/dashboard/account',
            },
          },
        ].map((route, i) => (
          <ListItem
            selected={!isClient ? false : activeIndex() === i}
            component={Link}
            href={
              route.node.link || `/dashboard/${route.node.name.toLowerCase()}`
            }
            divider
            button
            key={route.node.strapiId}
          >
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={route.node.name}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );

  const actions = [
    // {
    //   icon: search,
    //   alt: 'search',
    //   visible: true,
    //   onClick: () => console.log('search'),
    // },
    { icon: cartIcon, alt: 'cart', visible: true, link: '/dashboard/cart' },
    {
      icon: account,
      alt: 'account',
      visible: !matchesMD,
      link: '/dashboard/account',
    },
  ];

  const newactions = [
    // {
    //   icon: search,
    //   alt: 'search',
    //   visible: true,
    //   onClick: () => console.log('search'),
    // },
    // { icon: cartIcon, alt: 'cart', visible: true, link: '/cart' },
    // { icon: account, alt: 'account', visible: !matchesMD, link: '/account' },
    {
      icon: menu,
      alt: 'menu',
      visible: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ];

  return (
    // <HideOnScroll>
    <AppBar className={classes.appBar} color="transparent" elevation={0}>
      <Toolbar disableGutters>
        <Button
          component={Link}
          to="/"
          classes={{ root: classes.logoContainer }}
        >
          <Typography variant="h1" classes={{ root: classes.logo }}>
            <span className={classes.logoText}>CAR</span> X
          </Typography>
        </Button>
        {matchesMD ? drawer : tabs}
        {drawer}
        {!matchesMD &&
          actions.map((action) => {
            const image = (
              <img
                className={classes.icon}
                src={action.icon}
                alt={action.alt}
              />
            );

            return (
              <IconButton
                onClick={action.onClick}
                key={action.alt}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
              >
                {action.alt === 'cart' ? (
                  <Badge
                    key={key}
                    overlap="circular"
                    badgeContent={cart.length}
                    classes={{ badge: classes.badge }}
                  >
                    {image}
                  </Badge>
                ) : (
                  image
                )}
              </IconButton>
            );
          })}
        {matchesMD &&
          newactions.map((action) => {
            const image = (
              <img
                className={classes.icon}
                src={action.icon}
                alt={action.alt}
              />
            );

            return (
              <IconButton
                onClick={action.onClick}
                key={action.alt}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
              >
                {action.alt === 'cart' ? (
                  <Badge
                    key={key}
                    overlap="circular"
                    badgeContent={cart.length}
                    classes={{ badge: classes.badge }}
                  >
                    {image}
                  </Badge>
                ) : (
                  image
                )}
              </IconButton>
            );
          })}
      </Toolbar>
    </AppBar>
    // </HideOnScroll>
  );
}
