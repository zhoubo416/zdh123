<template>
  <div>
    <!-- 分类导航 -->
    <section class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">行业分类</h2>
          <UButton variant="outline" size="sm" @click="refreshData">
            <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
            刷新
          </UButton>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="category in categories"
            :key="category.id"
            class="flex flex-col items-center p-4 rounded-lg border hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
            :class="{ 'border-blue-500 bg-blue-50': selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <Icon :name="`heroicons:${category.icon || 'cube'}`" class="w-8 h-8 text-blue-600 mb-2" />
            <span class="text-sm font-medium text-gray-900">{{ category.name }}</span>
            <span class="text-xs text-gray-500 mt-1">{{ getCompanyCount(category.id) }}家</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 公司列表 -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ selectedCategory ? getCategoryName(selectedCategory) : '全部公司' }}
          <span class="text-gray-500 text-base ml-2">({{ filteredCompanies.length }})</span>
        </h2>
        <div class="flex items-center space-x-2">
          <UButton
            v-if="selectedCategory"
            variant="outline"
            size="sm"
            @click="clearCategory"
          >
            查看全部
          </UButton>
        </div>
      </div>

      <!-- 公司卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CompanyCard
          v-for="company in filteredCompanies"
          :key="company.id"
          :company="company"
        />
      </div>

      <!-- 空状态 -->
      <div v-if="filteredCompanies.length === 0" class="text-center py-12">
        <Icon name="heroicons:building-office" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无公司数据</h3>
        <p class="text-gray-500">该分类下还没有添加公司信息</p>
      </div>
    </section>

    <!-- 信息流区域 -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-900">行业资讯</h2>
          <NuxtLink to="/news" class="text-blue-600 hover:text-blue-800 font-medium">
            查看更多 →
          </NuxtLink>
        </div>
        
        <NewsFeed :feeds="newsFeeds" :limit="6" />
      </div>
    </section>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '工控导航 - 工业自动化行业导航门户',
  meta: [
    { name: 'description', content: '专业的工业自动化行业导航网站，提供英威腾、汇川等知名工控企业官网导航和行业资讯' }
  ]
})

// 响应式数据
const selectedCategory = ref(null)
const categories = ref([])
const companies = ref([])
const newsFeeds = ref([])

// 计算属性
const filteredCompanies = computed(() => {
  if (!selectedCategory.value) return companies.value
  return companies.value.filter(company => company.category_id === selectedCategory.value)
})

// 方法
const selectCategory = (categoryId) => {
  selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
}

const clearCategory = () => {
  selectedCategory.value = null
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : ''
}

const getCompanyCount = (categoryId) => {
  return companies.value.filter(company => company.category_id === categoryId).length
}

const refreshData = async () => {
  await Promise.all([
    loadCategories(),
    loadCompanies(),
    loadNewsFeeds()
  ])
}

// 数据加载方法
const loadCategories = async () => {
  const { fetchCategories } = await import('~/utils/api')
  categories.value = await fetchCategories()
}

const loadCompanies = async () => {
  const { fetchCompanies } = await import('~/utils/api')
  companies.value = await fetchCompanies()
}

const loadNewsFeeds = async () => {
  const { fetchNews } = await import('~/utils/api')
  newsFeeds.value = await fetchNews()
}

// 页面初始化
onMounted(async () => {
  // 延迟加载数据，确保客户端环境准备就绪
  await nextTick()
  await refreshData()
})
</script>