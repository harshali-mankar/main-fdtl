import { Button } from '@mui/material'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const logout = () => {
    // localStorage.removeItem("Id");
    // localStorage.removeItem("name");
    // localStorage.removeItem("session_expiry");
    // localStorage.removeItem("tenantId");
    localStorage.clear()
    navigate("/login");
    enqueueSnackbar('Logged Out Succesfully.', { variant: 'success' });
  }

  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      onClick={logout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
