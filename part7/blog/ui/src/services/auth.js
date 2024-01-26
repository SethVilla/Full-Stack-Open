import axios from 'axios'

export const login = async ({ username, password }) => {

  try {
    const res = await axios.post('/api/auth/login', {
      username,
      password
    })
    res.data.success = true
    return res.data
  } catch (e) {
    return {
      success: false,
      error: e.response.data.error
    }
  }

}