import blue from '@material-ui/core/colors/blue'
import lightblue from '@material-ui/core/colors/lightBlue'

const theme = {
  palette: {
    primary: {
      light: blue['700'],
      main: blue['800'],
      dark: blue['900'],
      contrastText: '#fff',
    },
    secondary: {
      light: lightblue['100'],
      main: lightblue['200'],
      dark: lightblue['300'],
      contrastText: '#000',
    },
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    image: {
      margin: '20px auto 20px auto',
      height: '40px',
      width: '40px',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      height: 46,
      width: 'auto',
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: '10',
    },
    progress: {
      position: 'absolute',
      color: 'white',
    },
    paper: {
      padding: '10px 10px 0px 10px',
    },

    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
  },
}

export default theme
