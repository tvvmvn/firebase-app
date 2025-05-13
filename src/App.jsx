import { useState } from 'react'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function App() {

  const email = "johndoe@example.com"
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const userCrendential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCrendential.user;

      alert(user.uid)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>Firebase App</h1>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
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
    </>
  )
}

