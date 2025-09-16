import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export const isAuthenticated = ref(false)
export const currentUser = ref(null)
export const isFirebaseAuthenticated = ref(false)
export const firebaseUser = ref(null)

const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'Student1@',
}

function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]')
  } catch (e) {
    console.warn('Failed to read registered users from localStorage:', e)
    return []
  }
}

export function login(username, password) {
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    isAuthenticated.value = true
    currentUser.value = { username: VALID_CREDENTIALS.username }
    return true
  }
  const all = getRegisteredUsers()
  const found = all.find(
    (u) => u.username === username && u.password === password,
  )
  if (found) {
    isAuthenticated.value = true
    currentUser.value = { username: found.username }
    return true
  }

  return false
}

export function logout() {
  isAuthenticated.value = false
  currentUser.value = null
}

setTimeout(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
  if (user) {
    isFirebaseAuthenticated.value = true
    firebaseUser.value = user
  } else {
    isFirebaseAuthenticated.value = false
    firebaseUser.value = null
  }
})
}, 100)


export function firebaseLogout() {
  const auth = getAuth()
  return signOut(auth)
}