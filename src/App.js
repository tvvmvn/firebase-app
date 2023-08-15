import { useState, useEffect, createContext, useContext } from "react";
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import db from "./firebase.js"
import admin from "./config.js";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("authUser") || null);
  const auth = getAuth();

  console.log(auth)

  function signIn(user) {
    localStorage.setItem("authUser", JSON.stringify(user));
    setUser(user)
  }

  function handleClick() {
    signOut(auth).then(() => {
      localStorage.removeItem("authUser");
      setUser(null)
    }).catch((error) => {
      console.error(error)
    });
  }

  return (
    <>
      <h3>firebase app</h3>

      <p>-</p>

      {user ? (
        <>
          <p>
            hello user! {" "}
            <button onClick={handleClick}>
              Sign Out
            </button>
          </p>

          <Cities />
        </>
      ) : (
        <SignIn signIn={signIn} signOut={signOut} />
      )}
    </>
  )
}

function Cities() {
  const [cities, setCities] = useState([]);

  console.log(cities)

  useEffect(() => {
    fetchData();
  }, [])
  
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "cities"));

    const _cities = [];

    querySnapshot.forEach((doc) => {
      const city = { id: doc.id, ...doc.data() };
      _cities.push(city);
    });

    setCities(_cities)
  }

  const cityList = cities.map(city => (
    <li key={city.name}>
      {city.name}
    </li>
  ))

  return (
    <>
      <h3>Cities</h3>
      <ul>
        {cityList}
      </ul>
    </>
  )
}

function SignIn({ signIn }) {

  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const auth = getAuth();

  console.log(auth)

  function handleSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, admin, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
  
        console.log(user)
        
        signIn(user)

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setError(error)

        console.log(error)
      });
  }


  return (
    <form onSubmit={handleSubmit}>
      <p>Sign In</p>
      <label htmlFor="password">
        <input 
          type="password" 
          value={password}
          placeholder="password" 
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button>Go</button>
      {error && <p>{error.message}</p>}
    </form>
  )
}