import { auth, db } from '../firebase'
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, 
} from 'firebase/auth'
import { 
  doc, 
  addDoc, 
  setDoc, 
  getDocs, 
  collection 
} from 'firebase/firestore'

export async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function logOut() {
  await signOut(auth)
}

export async function getCurrentUser() {
  return auth.currentUser;
}

export async function authStateListener(setUser, setLoaded) {
  onAuthStateChanged(auth, (user) => {
    setUser(user)
    // when first rendering
    setLoaded(true)
  })
}

export async function addData() {

    const querySnap = await getDocs(collection(db, "papers"))

    let size = querySnap.size

    const value = "paper-" + (++size);

    await setDoc(doc(db, "papers", size.toString()), {
      value
    })

    return value;
  }