<template>
  <div>
    <table class="table table-striped">
      <thead class="table-success">
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td v-for="column in columns" :key="column">
            <input
              v-if="editing === book.id"
              v-model="form[column]"
              :type="inputType(column)"
              class="form-control"
            />
            <span v-else>{{ book[column] }}</span>
          </td>
          <td>
            <div v-if="editing === book.id">
              <button @click="save" class="btn btn-success btn-sm me-1">Save</button>
              <button @click="editing = null" class="btn btn-secondary btn-sm">Cancel</button>
            </div>
            <div v-else>
              <button @click="edit(book)" class="btn btn-primary btn-sm me-1">Edit</button>
              <button @click="remove(book)" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import db from '../firebase/init.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
  props: ['books', 'columns'],
  emits: ['book-updated', 'book-deleted'],
  setup(props, { emit }) {
    const editing = ref(null)
    const form = reactive({})

    function inputType(col) {
      return col === 'isbn' ? 'number' : 'text'
    }

    function edit(book) {
      editing.value = book.id
      form.isbn = book.isbn
      form.name = book.name
    }

    async function save() {
      const data = { isbn: +form.isbn, name: form.name }
      await updateDoc(doc(db, 'books', editing.value), data)
      emit('book-updated', { id: editing.value, ...data })
      editing.value = null
    }

    async function remove(book) {
      if (!confirm(`Delete "${book.name}"?`)) return
      await deleteDoc(doc(db, 'books', book.id))
      emit('book-deleted', book.id)
    }

    return { editing, form, inputType, edit, save, remove }
  },
}
</script>
