const theme = {
  palette: {
    primary: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#cfd8dc',
      dark: '#9ea7aa',
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
      width: 78,
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
