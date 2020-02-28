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
import PersonIcon from '@material-ui/icons/Person';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PeopleIcon from '@material-ui/icons/People';
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

import { logout } from "../../actions/loginActions";

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

  useEffect(() => {
    console.log('location ', location.pathname);
    if(location.pathname === '/dashboard') {
      history.push('/dashboard/main');
    }
  }, []);

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

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Roles"}
            onClick={() => handeClick("/dashboard/role")}
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Permisos"}
            onClick={() => handeClick("/dashboard/permission")}
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Banco"}
            onClick={() => handeClick("/dashboard/banco")}
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Pais"}
            onClick={() => handeClick("/dashboard/pais")}
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SportsBaseballIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Deporte"}
            onClick={() => handeClick("/dashboard/deporte")}
          />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Profesion"}
            onClick={() => handeClick("/dashboard/profesion")}
          />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Estado Civil"}
            onClick={() => handeClick("/dashboard/estado-civil")}
          />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Estatus"}
            onClick={() => handeClick("/dashboard/status-persona")}
          />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Sexo"}
            onClick={() => handeClick("/dashboard/sexo")}
          />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Usuario"}
            onClick={() => handeClick("/dashboard/user")}
          />
        </MenuItem>
      </Menu>
      <List>
      <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Dashboard"}
            onClick={() => handeClick("/dashboard/main")}
          />
        </ListItem>
        <ListItem button onClick={handleMenu}>
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
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Reportes"}
            onClick={() => handeClick("/dashboard/reports")}
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
