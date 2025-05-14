import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from 'react'
import { 
  signIn, 
  logOut, 
  getCurrentUser, 
  addData, 
  authStateListener
} from './service/appService'

const AuthContext = createContext()

function useAuth() {
  return useContext(AuthContext)
}

export default function App() {
  return (
    <AuthProvider>
      <Protected>
        <Main />
      </Protected>
    </AuthProvider>
  )
}

function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)

  console.log(user)

  useEffect(() => {
    authStateListener(setUser, setLoaded)
  }, [])

  if (!loaded) {
    return <p>Loading..</p>
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

function Protected({ children }) {
  
  const { user } = useAuth()

  if (!user) {
    return <Form />
  }

  return children;
}

function Form() {

  const email = "johndoe@example.com"
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await signIn(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login for Firebase App</h1>
      <p>{email}</p>
      <input
        type="password"
        name=""
        id=""
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={!password}>
        Login
      </button>
    </form>
  )
}

function Main() {

  const { user } = useAuth()

  async function handleClick() {

    const value = await addData()

    alert("Added: " + value);
  }

  return (
    <>
      <h1>Firebase App</h1>
      <p>
        id: {user.uid} {" "}
        <button onClick={() => logOut()}>Logout</button>
      </p>
      <h3>Add data</h3>
      <button onClick={handleClick}>
        Add
      </button>
    </>
  )
}

