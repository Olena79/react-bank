import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomePage from './container/welcome-page';
import SignupPage from './container/signup';
import SignupConfirmPage from './container/signup-confirm';
import SigninPage from './container/signin';
import BalancePage from './container/balance';
import RecoveryPage from './container/recovery';
import RecoveryConfirmPage from './container/recovery-confirm';
import RecivePage from './container/receive';
import SendPage from './container/send';
import TransactionPage from './container/transaction';
import NotificationsPage from './container/notifications';
import SettingsPage from './container/settings';

import { AuthProvider } from './page/AuthContext';
import AuthRoute from './page/AuthRoute';
import PrivateRoute from './page/PrivateRoute';

//===================================================

function App() {
  return (<div className="App-background">
    <AuthProvider elem={
      <BrowserRouter>
        <Routes>

          <Route
            index
            element={<AuthRoute><WelcomePage /></AuthRoute>} />

          <Route
            path="/signup"
            element={<AuthRoute><SignupPage /></AuthRoute>} />

          <Route
            path="/signup-confirm"
            element={<PrivateRoute children={<SignupConfirmPage />} />} />

          <Route
            path="/signin"
            element={<AuthRoute><SigninPage /></AuthRoute>} />

          <Route
            path="/recovery"
            element={<AuthRoute><RecoveryPage /></AuthRoute>} />

          <Route
            path="/recovery-confirm"
            element={<AuthRoute><RecoveryConfirmPage /></AuthRoute>} />

          <Route
            path="/balance/:id"
            element={<PrivateRoute children={<BalancePage />} />} />

          <Route
            path="/receive/:id"
            element={<PrivateRoute children={<RecivePage />} />} />

          <Route
            path="/send/:id"
            element={<PrivateRoute children={<SendPage />} />} />

          <Route
            path="/settings/:id"
            element={<PrivateRoute children={<SettingsPage />} />} />

          <Route
            path="/transaction/:transactionId"
            element={<PrivateRoute children={<TransactionPage />} />} />

          <Route
            path="/notifications/:id"
            element={<PrivateRoute children={<NotificationsPage />} />} />

        </Routes>
      </BrowserRouter>
    } />

  </div>);
}

export default App;
