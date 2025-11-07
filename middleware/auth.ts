export default defineNuxtRouteMiddleware((to, from) => {
  // 只在客户端运行
  if (process.client) {
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
      return navigateTo('/admin/login')
    }
    
    try {
      // 验证token是否有效
      const decoded = JSON.parse(atob(token))
      const now = Date.now()
      const tokenAge = now - decoded.timestamp
      
      // Token有效期24小时
      if (tokenAge > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('admin_token')
        return navigateTo('/admin/login')
      }
    } catch (error) {
      localStorage.removeItem('admin_token')
      return navigateTo('/admin/login')
    }
  }
})