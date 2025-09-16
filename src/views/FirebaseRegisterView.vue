<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <label for="role">Role:</label>
    <select id="role" v-model="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
</template>
<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const role = ref('user')
const db = getFirestore()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async(data) => {
        const user = data.user
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: role.value,
            createdAt: new Date(),
        })
      console.log('Firebase Register Successful!')
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
    })
}
</script>
