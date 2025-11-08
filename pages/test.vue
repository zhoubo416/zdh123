<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">公司新闻页面测试</h1>
      <p class="text-gray-600 mb-4">正在测试公司新闻页面功能...</p>
      
      <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 class="text-lg font-semibold mb-3">测试结果：</h2>
        <div v-if="loading" class="text-yellow-600">
          <Icon name="heroicons:arrow-path" class="w-6 h-6 animate-spin mx-auto mb-2" />
          正在加载...
        </div>
        
        <div v-else-if="company" class="text-left">
          <h3 class="font-medium text-gray-900 mb-2">公司信息：</h3>
          <p><strong>名称：</strong>{{ company.name }}</p>
          <p><strong>分类：</strong>{{ company.category_name }}</p>
          
          <div v-if="newsList.length > 0" class="mt-4">
            <h4 class="font-medium text-gray-900 mb-2">相关新闻：</h4>
            <ul class="space-y-2">
              <li v-for="news in newsList" :key="news.id" class="border-b pb-2">
                <p class="font-medium">{{ news.title }}</p>
                <p class="text-sm text-gray-600">{{ news.summary }}</p>
              </li>
            </ul>
          </div>
          
          <div v-else class="text-gray-500">
            暂无相关新闻
          </div>
        </div>
        
        <div v-else class="text-red-600">
          公司不存在
        </div>
      </div>
      
      <div class="mt-6">
        <UButton @click="testAPI">
          <Icon name="heroicons:play" class="w-4 h-4 mr-2" />
          测试API
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const company = ref(null)
const newsList = ref([])

const testAPI = async () => {
  try {
    loading.value = true
    
    // 测试获取公司信息
    const companiesResponse = await fetch('/api/companies')
    const companiesData = await companiesResponse.json()
    const foundCompany = companiesData.data.find(c => c.id === 1)
    
    if (foundCompany) {
      company.value = foundCompany
      
      // 测试获取公司新闻
      const newsResponse = await fetch('/api/news?company=1')
      const newsData = await newsResponse.json()
      newsList.value = newsData.data || []
    } else {
      company.value = null
    }
  } catch (error) {
    console.error('API测试失败:', error)
    company.value = null
  } finally {
    loading.value = false
  }
}
</script>