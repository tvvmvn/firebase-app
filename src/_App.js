import { useState, useEffect } from "react";
import { 
  HashRouter as Router, 
  Routes, Route, 
  Link, 
  useParams, 
  useNavigate 
} from "react-router-dom";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs 
} from "firebase/firestore";
import db from "./firebase.js"
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Cities />} />
        <Route path="/:id" element={<City />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function Header() {

  const auth = getAuth();

  console.log(auth)

  function handleSubmit(auth, email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function signOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <form onSubmit={handleSubmit}>
    </form>
  )
}

function Cities() {
  const [cities, setCities] = useState([]);

  console.log(cities)

  // useEffect(() => {
  //   fetchData();
  // }, [])
  
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
      <Link to={city.id}>
        {city.name}
      </Link>
    </li>
  ))

  return (
    <>
      <h1>Cities</h1>
      <ul>
        {cityList}
      </ul>
    </>
  )
}

function City() {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const navigate = useNavigate();

  console.log(city);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const docRef = doc(db, "cities", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setCity(docSnap.data());
    } else {
      navigate("/not-found", { replace: true });
    }
  }
  
  if (!city) {
    return <p>fetching data...</p>
  }

  return (
    <>
      <h1>{city.name}</h1>
      <ul>
        <li>Country: {city.country}</li>
        <li>Population: {city.population}</li>
      </ul>
    </>  
  )
}

function NotFound() {
  return <h1>Unavailable</h1>
}


