<template>
  <div class="min-h-screen">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo和标题 -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-white" />
              </div>
              <h1 class="text-xl font-bold text-gray-900">工控导航</h1>
            </NuxtLink>
          </div>

          <!-- 导航菜单 -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              行业分类
            </NuxtLink>
            <NuxtLink to="/companies" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              企业目录
            </NuxtLink>
            <NuxtLink to="/suppliers" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              供应商
            </NuxtLink>
            <NuxtLink to="/news" class="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              行业资讯
            </NuxtLink>
          </nav>

          <!-- 右侧按钮 -->
          <div class="flex items-center space-x-3">
            
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main>
      <slot />
    </main>

    <!-- 页脚 -->
    <Footer />
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