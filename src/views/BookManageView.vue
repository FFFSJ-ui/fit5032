<template>
  <div class="container mt-4">
    <h1>Book Management</h1>
    <div class="row g-2">
      <div class="col-md-4">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Search by name"
          @keyup.enter="find"
        />
      </div>
      <div class="col-md-3">
        <select v-model="dir" class="form-select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div class="col-md-2">
        <input v-model="max" type="number" class="form-control" placeholder="Limit" />
      </div>
      <div class="col-md-3">
        <button @click="find" class="btn btn-primary me-1">Search</button>
        <button @click="clear" class="btn btn-secondary">Clear</button>
      </div>
    </div>
    <div class="mt-4"></div>
    <BookTable
      :books="books"
      :columns="cols"
      @book-updated="bookUpdated"
      @book-deleted="bookDeleted"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import BookTable from '../components/BookTable.vue'

export default {
  setup() {
    const books = ref([])
    const cols = ref(['isbn', 'name'])
    const search = ref('')
    const dir = ref('asc')
    const max = ref(null)

    async function clear() {
      search.value = ''
      max.value = null
      let q = query(collection(db, 'books'), orderBy('name', dir.value))
      books.value = (await getDocs(q)).docs.map(d => ({ id: d.id, ...d.data() }))
    }

    async function find() {
      let q = !search.value ? 
        query(collection(db, 'books'), orderBy('name', dir.value)) :
        query(collection(db, 'books'), where('name', '==', search.value))
      
      if (max.value > 0) q = query(q, limit(+max.value))
      books.value = (await getDocs(q)).docs.map(d => ({ id: d.id, ...d.data() }))
    }

    function bookUpdated(book) {
      const i = books.value.findIndex(b => b.id === book.id)
      if (i >= 0) books.value[i] = { ...books.value[i], ...book }
    }

    function bookDeleted(id) {
      books.value = books.value.filter(b => b.id !== id)
    }

    onMounted(clear)

    return { books, cols, search, dir, max, find, clear, bookUpdated, bookDeleted }
  },
  components: { BookTable },
}
</script>
