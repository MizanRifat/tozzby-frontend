import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      //   borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',


    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: '#EEEEEE',
    // backgroundColor: 'rgba(0, 0, 0, .03)',
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
      borderBottom: 'none',
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);





export default function ProductExpansionPanel({ summary, details, rich }) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className='mt-3'>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography style={{ fontWeight: '700', fontSize: '14px' }}>{summary}</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails style={{ display: 'block' }}>
          {
            rich ?
              <div dangerouslySetInnerHTML={{ __html: details }} />
              : 
              details
            
          }

        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  );
}
