<template>
  <!-- 🗄️ W3. Library Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">About Our Library</h1>
        <p class="text-center">
          Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.
        </p>
        <div class="text-center my-3" v-if="isFirebaseAuthenticated">
          <button class="btn btn-danger" @click="handleLogout">Logout</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
// No script needed for now
import { useRouter } from 'vue-router'
import { logout, isAuthenticated, firebaseLogout, isFirebaseAuthenticated } from '@/auth'

const router = useRouter()
const handleLogout = async() => {
  await firebaseLogout()
  router.push('/fireLogin')
}
</script>

<style>
</style>