import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App