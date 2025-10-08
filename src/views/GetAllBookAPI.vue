<template>
  <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
    }
  },
  mounted() {
    this.getAllBookAPI();
  },
  methods: {
    async getAllBookAPI() {
      try {
        const response = await axios.get('https://getallbooks-oqbldd4hga-uc.a.run.app')
        this.jsondata = response.data;
      } catch (error) {
        console.error('Error:', error)
        this.jsondata = { error: 'Failed to fetch books' }
      }
    },
  },
}
</script>