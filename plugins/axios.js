export default function ({ $axios }) {
  $axios.onRequest((config) => {
    const userId = localStorage.getItem('userId')
    config.headers.common['X-User-Id'] = userId
  })
}
