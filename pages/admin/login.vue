<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
          <Icon name="heroicons:shield-check" class="h-6 w-6 text-blue-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          管理员登录
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          请输入管理员凭据以访问管理面板
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">用户名</label>
            <UInput
              id="username"
              v-model="form.username"
              type="text"
              placeholder="用户名"
              required
              class="relative block w-full rounded-t-md"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <UInput
              id="password"
              v-model="form.password"
              type="password"
              placeholder="密码"
              required
              class="relative block w-full rounded-b-md"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <UButton
            type="submit"
            :loading="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Icon v-if="!loading" name="heroicons:lock-closed" class="h-5 w-5 mr-2" />
            {{ loading ? '登录中...' : '登录' }}
          </UButton>
        </div>

        <div class="text-center">
          <p class="text-xs text-gray-500">
            默认账号: admin / 密码: admin123
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '管理员登录 - 工控导航',
  meta: [
    { name: 'description', content: '管理员登录页面' }
  ]
})

// 响应式数据
const form = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

// 方法
const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // 简单的硬编码验证（实际项目中应该调用API）
    if (form.value.username === 'admin' && form.value.password === 'admin123') {
      // 设置登录状态
      const token = btoa(JSON.stringify({ username: form.value.username, timestamp: Date.now() }))
      localStorage.setItem('admin_token', token)
      
      // 跳转到管理页面
      await navigateTo('/admin')
    } else {
      error.value = '用户名或密码错误'
    }
  } catch (err) {
    error.value = '登录失败，请重试'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

// 检查是否已登录
onMounted(() => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    navigateTo('/admin')
  }
})
</script>