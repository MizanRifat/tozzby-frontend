import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InfoTab from './InfoTab';
import InvoicesTab from './InvoicesTab';
import ShipmentTab from './ShipmentTab';
import { OrderContext } from './OrderView';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    fontWeight: 700,
    fontSize: '16px',
  },
  tabPanel:{
    '& .MuiBox-root':{
      padding:0,
      paddingLeft:'8px',
      marginTop:'8px'
    }
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { order } = useContext(OrderContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >

      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">

        <Tab
          className={classes.tabRoot}
          label="Information"
          {...a11yProps(0)}
        />
        {
          order.status == 'processing' || order.status == 'completed' ?

          <Tab
            label="Invoices"
            className={classes.tabRoot}
            {...a11yProps(1)}
          />
          : ''
        }
        {
          order.status == 'completed' &&

          <Tab
            label="Shipments"
            className={classes.tabRoot}
            {...a11yProps(2)}
          />
        }
      </Tabs>

      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <InfoTab order={order} />
      </TabPanel>

      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <InvoicesTab order={order} />
      </TabPanel>

      <TabPanel value={value} index={2} className={classes.tabPanel}>
        <ShipmentTab order={order} />
      </TabPanel>

    </div>
  );
}