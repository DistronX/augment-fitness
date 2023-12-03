import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Login from './scenes/global/Login';
import Register from './scenes/global/Register';
// import Invoices from './scenes/invoices';
import Team from './scenes/team';
import { useAuth } from './AuthContext';
import Form from './scenes/form';
// import Contacts from './scenes/contacts';
// import Bar from './scenes/bar';
// import Line from './scenes/line';
// import Pie from './scenes/pie';
// import FAQ from './scenes/faq';
// import Geography from './scenes/geography'
// import Calendar from './scenes/calendar'

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  const storedToken = localStorage.getItem('authToken');
  return storedToken && isLoggedIn ? element : <Navigate to="/login" />;
};
function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const { isLoggedIn } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {!isLoginPage && !isRegisterPage && <Sidebar />}
          <main className='content'>
            {!isLoginPage && !isRegisterPage && <Topbar />}
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
              />
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
              <Route path='/team' element={<PrivateRoute element={<Team />} />} />
              {/* <Route path='/invoices' element={<Invoices />} /> */}
              {/* <Route path='/contacts' element={<Contacts />} /> */}
              {/* <Route path='/bar' element={<Bar />} /> */}
              <Route path='/form' element={<PrivateRoute element={<Form />} />} />
              {/* <Route path='/line' element={<Line />} /> */}
              {/* <Route path='/pie' element={<Pie />} /> */}
              {/* <Route path='/faq' element={<FAQ />} /> */}
              {/* <Route path='/geography' element={<Geography />} /> */}
              {/* <Route path='/calendar' element={<Calendar />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
