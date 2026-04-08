import { defineStore } from 'pinia'
import request from '@/utils/request'
import axios from 'axios'

interface User {
  id:    string
  email: string
  name:  string
  role:  'ADMIN' | 'EDITOR'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('panda_token') || null as string | null,
    user:  null as User | null,
  }),

  getters: {
    isLoggedIn: (s) => !!s.token,
    isAdmin:    (s) => s.user?.role === 'ADMIN',
  },

  actions: {
    async login(email: string, password: string) {
      const data = await axios.post('/api/auth/login', { email, password }).then(r => r.data)
      this.token = data.token
      this.user  = data.user
      localStorage.setItem('panda_token', data.token)
    },

    async fetchMe() {
      if (!this.token) return
      try {
        this.user = await request.get('/auth/me')
      } catch {
        this.logout()
      }
    },

    logout() {
      this.token = null
      this.user  = null
      localStorage.removeItem('panda_token')
    },
  },
})
