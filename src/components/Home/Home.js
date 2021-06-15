import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import Chip from '@material-ui/core/Chip';
import axios from 'axios'
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from '@material-ui/core/Box';
import { Grid, CircularProgress} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function Cards({ event }) {
  const classes = useStyles();
  var date = new Date(event.event_start_time * 1000);
  return(
    <Card className={classes.cardRoot}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={event.cover_picture}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {event.name}
          </Typography>
          <div className={classes.cardContent}>
            <div>
              <Typography variant="subtitle1" component="h2">Start On</Typography>
              <Typography variant="subtitle2" component="h2">{date.toUTCString()}</Typography>
            </div>
            <div>
              <Typography variant="subtitle1" component="h2">Entry Fee</Typography>
              <Typography variant="subtitle2" component="h2">{event.fees}</Typography>
            </div>
            <div>
              <Typography variant="subtitle1" component="h2">Venue</Typography>
              <Typography variant="subtitle2" component="h2">{event.venue}</Typography>
            </div>
          </div>
          <hr/>
          <Typography variant="body2" color="textSecondary" component="p">
            {event.short_desc}
          </Typography>
          <div className={classes.chipRoot}>
            {
              event.card_tags.map((chip, index) => {
                return(
                  <Chip
                    key={index}
                    label={chip}
                  />
                )
              })
            }
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

function CardRander(data) {
  const handleChipClick = (ele,str) => () => {
    if(str === 'add' && data.clickedTags.indexOf(ele) < 0){
      data.setClickedTags(old => [...old , ele])
    }
  }
  const handleChipDelete= (ele,str) => () => {
    if(data.clickedTags.indexOf(ele) > -1 && str === 'delete') {
      data.setClickedTags(old => old.filter(e => e !== ele))
    }
  }
  const classes = useStyles();
  return(
    !data.data?.events ? <CircularProgress /> : (
      <Grid className={classes.container} container spacing={1}>
        <Grid container item xs={12} sm={9} spacing={2}>
        {
          data.data.events.map((event) => (
            <Grid item key={event.id} xs={12} sm={6}>
              <Cards event={event}/>
            </Grid>
          ))
        }
        </Grid>
        <Grid container item xs={12} sm={3}>
        <div className={classes.chipRootBox}>
          {
            data.clickedTags.map((chip, index) => {
              return(
                <Chip
                  key={index*100}
                  label={chip}
                  onDelete={handleChipDelete(chip,"delete")}
                />
              )
            })
          }
          {
            data.tags.tags.map((chip, index) => {
              return(
                <Chip
                  key={index}
                  label={chip}
                  onClick={handleChipClick(chip,"add")}
                />
              )
            })
          }
          </div>
        </Grid>
      </Grid>
    )
  )
}

export default function Home() {
  const classes = useStyles();
  const [tags, setTags] = useState(null)
  const [clickedTags, setClickedTags] = useState([])
  const [data,setData] = useState(null)
  const [event, setEvent] = useState('CODING_EVENT')
  const [subEvent, setSubEvent] = useState('Upcoming')
  const [eventValue, setEventValue] = useState(0)
  const [subEventValue, setSubEventValue] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('https://api.codingninjas.com/api/v3/events', {
        params: {
          event_category: event,
          event_sub_category: subEvent,
          tag_list: '',
          offset: 1
        }
      })
      setData(result.data.data)
    }
    fetchData()
  },[event,subEvent,clickedTags])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('https://api.codingninjas.com/api/v3/event_tags')
      setTags(result.data.data)
    }
    fetchData()
  },[null])

  const handleEventChange = (events, newValue) => {
    setEventValue(newValue)
  };
  const handleSubEventChange = (events, newValue) => {
    setSubEventValue(newValue)
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs value={eventValue} onChange={handleEventChange} aria-label="simple tabs example">
          <Tab label="All Events" className={classes.tab} onClick={() => setEvent('ALL_EVENTS')} />
          <Tab label="Webinars" className={classes.tab} onClick={() => setEvent('WEBINAR')}/>
          <Tab label="Coding Events" className={classes.tab} onClick={() => setEvent('CODING_EVENT')} />
          <Tab label="BootCamps" className={classes.tab} onClick={() => setEvent('BOOTCAMP_EVENT')}/>
          <Tab label="Workshops" className={classes.tab} onClick={() => setEvent('WORKSHOP')}/>
        </Tabs>
        <Tabs value={subEventValue} onChange={handleSubEventChange} aria-label="simple tabs example">
          <Tab label="Upcoming" className={classes.tab} onClick={() => setSubEvent('Upcoming')} />
          <Tab label="Archives" className={classes.tab} onClick={() => setSubEvent('Archives')} />
          <Tab label="All Time Favorites" className={classes.tab} onClick={() => setSubEvent('All Time Favorites')} />
        </Tabs>
      </AppBar>
      <Box>
        <CardRander data={data} tags={tags} clickedTags={clickedTags} setClickedTags={setClickedTags}/>
      </Box>
    </div>
  )
}
