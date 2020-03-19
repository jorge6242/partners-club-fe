import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import BuildIcon from "@material-ui/icons/Build";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockIcon from '@material-ui/icons/Lock';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PeopleIcon from '@material-ui/icons/People';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import Collapse from '@material-ui/core/Collapse'

import { logout } from "../../actions/loginActions";
import AccessControlForm from "../../components/AccessControlForm";
import { updateModal } from "../../actions/modalActions";
import { getAll as getStatusPersonAll } from "../../actions/statusPersonActions";
import { getAll as getMaritalStatusAll } from "../../actions/maritalStatusActions";
import { getAll as getGenderAll } from "../../actions/genderActions";
import { getAll as getCountries } from "../../actions/countryActions";
import { getAll as getRelationTypes } from "../../actions/relationTypeActions";
import { getAll as getPaymentMethods } from "../../actions/paymentMethodActions";
import { getList as getTransactionTypes } from "../../actions/transactionTypeActions";
import { getList as getCurrencies } from "../../actions/currencyActions";
import { getAll as getSports } from "../../actions/sportActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    menuContainer: {
      fontSize: '10px',
    }
  })
);

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children?: any;
  container?: Element;
}

export default function Dashboard(props: ResponsiveDrawerProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { container, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false)

  function handleClick() {
    setOpen(!open)
  }

  useEffect(() => {
    dispatch(getStatusPersonAll());
    dispatch(getMaritalStatusAll());
    dispatch(getGenderAll());
    dispatch(getCountries());
    dispatch(getRelationTypes());
    dispatch(getPaymentMethods());
    dispatch(getTransactionTypes());
    dispatch(getCurrencies());
    dispatch(getSports());
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      history.push('/dashboard/main');
    }
  }, [history, location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handeClick = (path: string) => {
    history.push(path);
    setAnchorEl(null);
  };

  const handleLogout = () => dispatch(logout());

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccessControl = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <AccessControlForm />,
          customSize: 'medium'
        }
      })
    );
  }
  const renderMenu = (Icon: React.ReactType, title: string, route: string) => (
    <ListItem button>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </ListItem>
  )

  const renderSubMenu = (Icon: React.ReactType, title: string, route: string) => (
    <MenuItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </MenuItem>
  )

  const renderSecondMenu = (Icon: React.ReactType, title: string, route: string) => (
    <ListItem button onClick={() => handeClick(route)}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Menu
        id="report-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderSubMenu(ListAltIcon, "Reporte General", "/dashboard/general-report")}
      </Menu>
      <Menu
        id="maintenance-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderSubMenu(PeopleIcon, "Roles", "/dashboard/role")}
        {renderSubMenu(LockIcon, "Permisos", "/dashboard/permission")}
        {renderSubMenu(AccountBalanceIcon, "Banco", "/dashboard/banco")}
        {renderSubMenu(DoubleArrowIcon, "Pais", "/dashboard/pais")}
        {renderSubMenu(SportsBaseballIcon, "Deporte", "/dashboard/deporte")}
        {renderSubMenu(DoubleArrowIcon, "Profesion", "/dashboard/profesion")}
        {renderSubMenu(DoubleArrowIcon, "Estado Civil", "/dashboard/estado-civil")}
        {renderSubMenu(DoubleArrowIcon, "Estatus", "/dashboard/status-persona")}
        {renderSubMenu(DoubleArrowIcon, "Sexo", "/dashboard/sexo")}
        {renderSubMenu(DoubleArrowIcon, "Tipo Relacion", "/dashboard/relation-type")}
        {renderSubMenu(DoubleArrowIcon, "Metodo de Pago", "/dashboard/payment-method")}
        {renderSubMenu(DoubleArrowIcon, "Tipo de Tarjeta", "/dashboard/card-type")}
        {renderSubMenu(DoubleArrowIcon, "Tipo de Accion", "/dashboard/share-type")}
        {renderSubMenu(DoubleArrowIcon, "Ubicacion", "/dashboard/location")}>
      </Menu>
      <List dense >
        {renderSubMenu(DashboardIcon, "Dashboard", "/dashboard/main")}
        <ListItem
          button
          onClick={handleMenu}
          id="maintenance-menu">
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary={"Mantenimiento"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Socios"}
            onClick={() => handeClick("/dashboard/socio")}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Tipos de transacion"}
            onClick={() => handeClick("/dashboard/transaction-type")}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Acciones"}
            onClick={() => handeClick("/dashboard/share")}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Movimientos de Acciones"}
            onClick={() => handeClick("/dashboard/share-movement")}
          />
        </ListItem>

        <ListItem button onClick={handleClick}>
          <ListItemIcon >
            <IconLibraryBooks />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
          {open ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>


        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense>
            {renderSecondMenu(IconLibraryBooks, "General", "/dashboard/report-general")}
            {renderSecondMenu(IconLibraryBooks, "Acciones", "/dashboard/report-general")}
            {renderSecondMenu(IconLibraryBooks, "Control de Accesso", "/dashboard/share-report")}
          </List>
        </Collapse>


        <ListItem button>
          <ListItemIcon>
            <CenterFocusWeakIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Control de Acceso"}
            onClick={() => handleAccessControl()}
          />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            <Typography variant="h6" noWrap>
              Main Dashboard
            </Typography>
            <Typography variant="h6" noWrap>
              <Button variant="contained" onClick={() => handleLogout()}>
                Logout
              </Button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children && children}
      </main>
    </div>
  );
}
