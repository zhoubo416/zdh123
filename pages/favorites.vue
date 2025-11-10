<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-xl font-bold text-gray-900">我的收藏</h1>
          <UButton @click="clearFavorites" variant="outline" size="sm">
            <Icon name="heroicons:trash" class="w-4 h-4 mr-2" />
            清空收藏
          </UButton>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 空状态 -->
      <div v-if="favorites.length === 0" class="text-center py-12">
        <Icon name="heroicons:heart" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无收藏</h3>
        <p class="text-gray-500 mb-6">您还没有收藏任何公司</p>
        <UButton @click="goBack">
          <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
          返回首页
        </UButton>
      </div>

      <!-- 收藏列表 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="company in favorites"
          :key="company.id"
          class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    v-if="company.logo_url"
                    :src="company.logo_url"
                    :alt="company.name"
                    class="w-full h-full object-cover"
                  />
                  <Icon v-else name="heroicons:building-office" class="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ company.name }}</h3>
                  <p v-if="company.name_en" class="text-sm text-gray-500">{{ company.name_en }}</p>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ company.category_name }}
                  </span>
                </div>
              </div>
              
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ company.description }}</p>
              
              <div class="flex items-center justify-between">
                <a
                  :href="company.website_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-800 text-sm"
                >
                  访问官网
                  <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 inline ml-1" />
                </a>
                
                <UButton
                  variant="ghost"
                  size="sm"
                  @click="removeFromFavorites(company.id)"
                >
                  <Icon name="heroicons:heart-solid" class="w-4 h-4 text-red-500" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '我的收藏 - 工控导航',
  meta: [
    { name: 'description', content: '查看收藏的工控企业' }
  ]
})

// 响应式数据
const favorites = ref([])

// 方法
const loadFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites)
    }
  } catch (error) {
    console.error('Failed to load favorites:', error)
    favorites.value = []
  }
}

const removeFromFavorites = (companyId) => {
  favorites.value = favorites.value.filter(fav => fav.id !== companyId)
  saveFavorites()
}

const clearFavorites = () => {
  if (confirm('确定要清空所有收藏吗？')) {
    favorites.value = []
    saveFavorites()
  }
}

const saveFavorites = () => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  } catch (error) {
    console.error('Failed to save favorites:', error)
  }
}

const goBack = () => {
  navigateTo('/')
}

// 页面初始化
onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>