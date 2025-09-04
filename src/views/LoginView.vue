<template>
  <div class="container mt-5">
    <div v-if="isLoggedIn"  class="d-flex justify-content-center">
    <div class="user-form">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="submitLoginForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
              v-model="loginFormData.username"
            />
            <div v-if="loginErrors.username" class="text-danger">{{ loginErrors.username }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              v-model="loginFormData.password"
            />
            <div v-if="loginErrors.password" class="text-danger">{{ loginErrors.password }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearLoginForm">Clear</button>
          </div>
        </form>
      </div>
      </div>

    <div v-else  class="d-flex justify-content-center">
    <div class="user-form">
        <h1 class="text-center">Register</h1>
        <form @submit.prevent="submitRegisterForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
              v-model="registerFormData.username"
            />
            <div v-if="registerErrors.username" class="text-danger">{{ registerErrors.username }}</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              @blur="() => validateEmail(true)"
              @input="() => validateEmail(false)"
              v-model="registerFormData.email"
            />
            <div v-if="registerErrors.email" class="text-danger">{{ registerErrors.email }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              v-model="registerFormData.password"
            />
            <div v-if="registerErrors.password" class="text-danger">{{ registerErrors.password }}</div>
          </div>
          <div class="mb-3">
            <label for="confirm-password" class="form-label">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              v-model="registerFormData.confirmPassword"
              @blur="() => validateConfirmPassword(true)"
            />
            <div v-if="registerErrors.confirmPassword" class="text-danger">
              { registerErrors.confirmPassword }
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearRegisterForm">Clear</button>
        </div>
          </form>
      </div>
    </div>
    <div class="text-center mb-4 mt-3">
      <button @click="toggleForm" class="btn btn-primary mb-4">
        {{ isLoggedIn ? 'Register' : 'Login' }}
      </button>
    </div>
  </div>
</template>

<script setup>
// Our logic will go here
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login as loginAction } from '@/auth'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
const router = useRouter()
const isLoggedIn = ref(true)

const loginFormData = ref({
  username: '',
  password: ''
})

const registerFormData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const submittedCards = ref([])

const submitLoginForm = async() => {
  validateName(true)
  validatePassword(true)
  if (!loginErrors.value.username && !loginErrors.value.password) {
    const existingUsers = await loginAction(loginFormData.value.username, loginFormData.value.password)

    if (existingUsers) {
      const redirectTo = router.currentRoute.value.query.redirect || '/about'
      router.push(redirectTo)
      clearLoginForm()
    } else {
      loginErrors.value.username = 'Invalid username or password'
    }
  }
}

const getAllUsers = () => {
  return JSON.parse(localStorage.getItem('registeredUsers') || '[]')
}

const submitRegisterForm = () => {
  validateName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)
  const isLogin = isLoggedIn.value
  isLoggedIn.value = false
  isLoggedIn.value = isLogin

  const hasError = registerErrors.value.username || registerErrors.value.email || registerErrors.value.password || registerErrors.value.confirmPassword
  if (hasError) return

  const allUsers = getAllUsers()
  const userExists = allUsers.some(u => u.email === registerFormData.value.email)
  if (userExists) {
    registerErrors.value.email = 'Email is already exists'
    return
  }

  const newUser = {
    username: registerFormData.value.username,
    email: registerFormData.value.email,
    password: registerFormData.value.password
  }
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  existingUsers.push(newUser)
  localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
  loginAction(registerFormData.value.username, registerFormData.value.password)
  router.push('/about')
  clearRegisterForm()
}

const clearLoginForm = () => {
  loginFormData.value = {
    username: '',
    password: ''
  }
}

const clearRegisterForm = () => {
  registerFormData.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}

const loginErrors = ref({
  username: null,
  password: null
})

const registerErrors = ref({
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
})

const validateEmail = (blur) => {
  const email = registerFormData.value.email
  if (registerFormData.value.email.length < 5) {
    if (blur) registerErrors.value.email = 'Email must be at least 5 characters'
  } else if (!/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(email)) {
    if (blur) registerErrors.value.email = 'Email must be in the correct format (xxx@xx.xxx)'
    return
  } else {
    registerErrors.value.email = null
  }
}

const validatePassword = (blur) => {
  let errors = null
  const password = isLoggedIn.value ? loginFormData.value.password : registerFormData.value.password
  const minLength = 6
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors = 'Password must contain at least one special character.'
  } else {
    errors = null
  }
  if (isLoggedIn.value) {
    loginErrors.value.password = errors
  } else {
    registerErrors.value.password = errors
  }
}

const validateName = (blur) => {
  const username = isLoggedIn.value ? loginFormData.value.username?.trim() : registerFormData.value.username?.trim()
  let errors = null
  if (username.length < 3) {
    if (blur) errors = 'Name must be at least 3 characters'
  } else {
    errors = null
  }
  if (isLoggedIn.value) {
    loginErrors.value.username = errors
  } else {
    registerErrors.value.username = errors
  }
}

const validateConfirmPassword = (blur) => {
  if (registerFormData.value.password !== registerFormData.value.confirmPassword) {
    if (blur) registerErrors.value.confirmPassword = 'Passwords do not match.'
  } else {
    registerErrors.value.confirmPassword = null
  }
}

const toggleForm = () => {
  isLoggedIn.value = !isLoggedIn.value
  loginErrors.value = { username: null, password: null }
  registerErrors.value = { username: null, email: null, password: null, confirmPassword: null }
}
</script>

<style scoped>
.container {
  min-width: 600px;
  margin: auto;
}
:deep(.user-form) {
  width: 40%;
  min-width: 400px;
}

:deep(.card) {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.card-header) {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

:deep(.list-group-item) {
  padding: 10px;
}
</style>
