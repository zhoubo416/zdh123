<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo和标题 -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-white" />
              </div>
              <h1 class="text-xl font-bold text-gray-900">工控导航</h1>
            </NuxtLink>
          </div>

          <!-- 搜索框 -->
          <div class="flex-1 max-w-lg mx-8">
            <div class="relative">
              <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <UInput
                v-model="searchQuery"
                placeholder="搜索公司或产品..."
                class="pl-10"
                size="md"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>

          <!-- 右侧菜单 -->
          <div class="flex items-center space-x-4">
            <UButton variant="ghost" size="sm" to="/suppliers">
              <Icon name="heroicons:truck" class="w-5 h-5" />
              供应商
            </UButton>
            <UButton variant="ghost" size="sm" @click="viewFavorites">
              <Icon name="heroicons:heart" class="w-5 h-5" />
              收藏
            </UButton>
            <UButton variant="ghost" size="sm" @click="viewNews">
              <Icon name="heroicons:rss" class="w-5 h-5" />
              资讯
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main>
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-white border-t mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-500 text-sm">
          <p>&copy; 2024 工控导航. 专注工业自动化行业导航服务</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

const viewFavorites = () => {
  navigateTo('/favorites')
}

const viewNews = () => {
  navigateTo('/news')
}
</script>