import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes.tsx'
import { SnackbarProvider } from 'notistack'

const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <AppRoutes />
      </SnackbarProvider>
    </BrowserRouter>
  )
}

export default App
