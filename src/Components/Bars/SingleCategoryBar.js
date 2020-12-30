import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  root: {
    width: '120px',
    margin:'20px',
    flex: '0 0 auto',
    '&:hover':{
        transform:'scale(1.1)',
        transition:'.3s ease-in'
    }
  },
  media: {
    height: 100,
  },
  name:{
      padding:'0 !important',
      margin:'0 !important',
      fontSize:'16px',
      fontWeight:700
  }
});

export default function SingleCategoryBar({category}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={require(`../images/${category.image}`)}
          title="Contemplative Reptile"
        />
        <CardContent className='text-center p-0 mt-2'>
          <h5 className={classes.name}>{category.name}</h5>
          <small style={{fontSize:'12px'}}>Shop Now</small>
         
        </CardContent>
      </CardActionArea>

      
    </Card>
  );
}
