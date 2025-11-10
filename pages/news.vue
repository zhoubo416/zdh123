<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <h1 class="text-xl font-bold text-gray-900">行业资讯</h1>
          <div class="text-sm text-gray-500">
            共 {{ newsList.length }} 条新闻
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 空状态 -->
      <div v-if="loading" class="text-center py-12">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p class="text-gray-600">加载中...</p>
      </div>

      <div v-else-if="newsList.length === 0" class="text-center py-12">
        <Icon name="heroicons:newspaper" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无新闻</h3>
        <p class="text-gray-500">当前没有最新的行业资讯</p>
      </div>

      <!-- 新闻列表 -->
      <div v-else class="space-y-6">
        <div
          v-for="news in newsList"
          :key="news.id"
          class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <span 
                  v-if="news.company_name"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ news.company_name }}
                </span>
                <span class="text-sm text-gray-500">{{ formatDate(news.published_at) }}</span>
              </div>
              
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                {{ news.title }}
              </h3>
              
              <div v-if="news.summary" class="text-gray-600 mb-4 leading-relaxed">
                {{ news.summary }}
              </div>
              
              <div class="flex items-center justify-between">
                <div v-if="news.tags && news.tags.length > 0" class="flex items-center space-x-1">
                  <span 
                    v-for="tag in news.tags.slice(0, 3)" 
                    :key="tag"
                    class="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <div class="flex items-center space-x-2">
                  <UButton
                    v-if="news.source_url"
                    :href="news.source_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                  >
                    <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
                    原文链接
                  </UButton>
                  <UButton
                    v-if="news.company_id"
                    @click="viewCompanyNews(news.company_id)"
                    variant="ghost"
                    size="sm"
                  >
                    <Icon name="heroicons:building-office" class="w-4 h-4" />
                    公司动态
                  </UButton>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 新闻内容（可选显示） -->
          <div v-if="news.content" class="mt-4 pt-4 border-t border-gray-200">
            <p class="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {{ news.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '行业资讯 - 工控导航',
  meta: [
    { name: 'description', content: '查看工控行业最新资讯' }
  ]
})

// 响应式数据
const loading = ref(true)
const newsList = ref([])

// 方法
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadNews = async () => {
  try {
    loading.value = true
    
    // 在客户端直接调用API
    if (process.client) {
      try {
        const newsResponse = await fetch('/api/news')
        const newsData = await newsResponse.json()
        newsList.value = newsData.data || []
      } catch (apiError) {
        console.error('API调用失败:', apiError)
        newsList.value = []
      }
    }
  } catch (error) {
    console.error('Failed to load news:', error)
    newsList.value = []
  } finally {
    loading.value = false
  }
}

const viewCompanyNews = (companyId) => {
  navigateTo(`/company/${companyId}/news`)
}

// 页面初始化
onMounted(() => {
  loadNews()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>