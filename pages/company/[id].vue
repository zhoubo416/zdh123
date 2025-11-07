<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p class="text-gray-600">加载中...</p>
      </div>
    </div>

    <!-- 公司详情内容 -->
    <div v-else-if="company" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 公司头部信息 -->
      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-center space-x-6">
            <div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                v-if="company.logo_url"
                :src="company.logo_url"
                :alt="company.name"
                class="w-full h-full object-cover"
              />
              <Icon v-else name="heroicons:building-office" class="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ company.name }}</h1>
              <p v-if="company.name_en" class="text-lg text-gray-600 mb-2">{{ company.name_en }}</p>
              <div class="flex items-center space-x-4">
                <span v-if="company.category_name" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Icon :name="`heroicons:${company.category_icon || 'cube'}`" class="w-4 h-4 mr-1" />
                  {{ company.category_name }}
                </span>
                <a
                  :href="company.website_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Icon name="heroicons:globe-alt" class="w-4 h-4 mr-1" />
                  官方网站
                  <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <UButton @click="goBack" variant="outline">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
            返回
          </UButton>
        </div>

        <!-- 公司基本信息 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div v-if="company.founded_year" class="flex items-center">
            <Icon name="heroicons:calendar" class="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p class="text-sm text-gray-500">成立时间</p>
              <p class="font-medium">{{ company.founded_year }}年</p>
            </div>
          </div>
          <div v-if="company.headquarters" class="flex items-center">
            <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p class="text-sm text-gray-500">总部地址</p>
              <p class="font-medium">{{ company.headquarters }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <Icon name="heroicons:tag" class="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p class="text-sm text-gray-500">主营业务</p>
              <p class="font-medium">{{ company.category_name || '工业自动化' }}</p>
            </div>
          </div>
        </div>

        <!-- 公司描述 -->
        <div v-if="company.description">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">公司简介</h3>
          <p class="text-gray-700 leading-relaxed">{{ company.description }}</p>
        </div>
      </div>

      <!-- 导航链接 -->
      <div v-if="navigationLinks.length > 0" class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">快速导航</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="link in navigationLinks"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <Icon name="heroicons:link" class="w-5 h-5 text-blue-600 mr-3" />
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ link.title }}</h4>
              <p v-if="link.description" class="text-sm text-gray-500 mt-1">{{ link.description }}</p>
            </div>
            <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>

      <!-- 相关新闻 -->
      <div v-if="companyNews.length > 0" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">相关新闻</h3>
          <UButton variant="ghost" size="sm" @click="loadMoreNews">
            查看更多
          </UButton>
        </div>
        <div class="space-y-4">
          <div
            v-for="news in companyNews"
            :key="news.id"
            class="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <h4 class="font-medium text-gray-900 mb-2">{{ news.title }}</h4>
            <p v-if="news.summary" class="text-sm text-gray-600 mb-2">{{ news.summary }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-xs text-gray-500">
                <span>{{ formatDate(news.published_at) }}</span>
                <div v-if="news.tags && news.tags.length > 0" class="flex items-center space-x-1">
                  <span v-for="tag in news.tags.slice(0, 3)" :key="tag" class="px-2 py-1 bg-gray-100 rounded">
                    {{ tag }}
                  </span>
                </div>
              </div>
              <a
                v-if="news.source_url"
                :href="news.source_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 text-sm"
              >
                查看原文
                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 ml-1 inline" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 404 错误 -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">公司不存在</h2>
        <p class="text-gray-600 mb-6">抱歉，找不到您要查看的公司信息</p>
        <UButton @click="goBack">
          <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
          返回首页
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// 页面元数据
useHead({
  title: '公司详情 - 工控导航',
  meta: [
    { name: 'description', content: '查看工控企业详细信息' }
  ]
})

// 响应式数据
const loading = ref(true)
const company = ref(null)
const navigationLinks = ref([])
const companyNews = ref([])

// 方法
const goBack = () => {
  router.back()
}

const loadMoreNews = () => {
  // TODO: 实现加载更多新闻
  navigateTo(`/company/${route.params.id}/news`)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 加载公司详情
const loadCompanyDetail = async () => {
  try {
    loading.value = true
    const companyId = parseInt(route.params.id)
    
    // 获取公司信息
    const { fetchCompanies } = await import('~/utils/api')
    const companies = await fetchCompanies()
    company.value = companies.find(c => c.id === companyId)
    
    if (company.value) {
      // 并行加载导航链接和新闻
      const [links, news] = await Promise.all([
        loadNavigationLinks(companyId),
        loadCompanyNews(companyId)
      ])
      navigationLinks.value = links
      companyNews.value = news
    }
  } catch (error) {
    console.error('Failed to load company detail:', error)
  } finally {
    loading.value = false
  }
}

const loadNavigationLinks = async (companyId) => {
  try {
    const { fetchNavigationLinks } = await import('~/utils/api')
    return await fetchNavigationLinks(companyId)
  } catch (error) {
    console.error('Failed to load navigation links:', error)
    return []
  }
}

const loadCompanyNews = async (companyId) => {
  try {
    const { fetchNews } = await import('~/utils/api')
    return await fetchNews(5, companyId)
  } catch (error) {
    console.error('Failed to load company news:', error)
    return []
  }
}

// 页面初始化
onMounted(() => {
  loadCompanyDetail()
})

// 监听路由变化
watch(() => route.params.id, () => {
  if (route.params.id) {
    loadCompanyDetail()
  }
})
</script>