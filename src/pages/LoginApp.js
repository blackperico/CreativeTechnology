import Login from '../components/Login.js';
import CreateAccount from '../components/CreateAccount.js';
import ResetPassword from '../components/ResetPassword.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function LoginApp() {

  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="ResetPassword" element={<ResetPassword />} />
        <Route path="CreateAccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  )
}

export default LoginApp;