import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chipRootBox: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chipRoot: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  cardContent:{
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "stretch"
  },
  appBar: {
    backgroundColor: '#ffffff',
    marginBottom: '20px',
  },
  tab: {
    color: '#4f4f4f',
    display: 'content'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridRoot: {
    flexGrow: 1,
    marginTop: theme.spacing(1)
  },
  cardRoot: {
    maxWidth: 445,
    alignItems: "stretch"
  },
  media: {
    height: 150,
  },
  line: {
    border: 'solid 1px #ffffff',
  }
}));