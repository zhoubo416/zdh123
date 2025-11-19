<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <section class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">企业目录</h1>
        <p class="text-lg text-gray-600">汇聚全球领先的工业自动化企业，快速找到合作伙伴</p>
      </div>
    </section>

    <!-- 筛选和搜索区域 -->
    <section class="bg-white border-b sticky top-16 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <!-- 搜索框 -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索企业名称、产品或技术..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <!-- 筛选按钮 -->
          <div class="flex items-center space-x-2">
            <button
              @click="selectedFilter = null"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                selectedFilter === null 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              ]"
            >
              全部 ({{ companies.length }})
            </button>
            <button
              @click="selectedFilter = 'certified'"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                selectedFilter === 'certified' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              ]"
            >
              认证企业
            </button>
            <button
              @click="selectedFilter = 'recommended'"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                selectedFilter === 'recommended' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              ]"
            >
              推荐企业
            </button>
          </div>
        </div>

        <!-- 分类标签 -->
        <div v-if="categories.length > 0" class="mt-4 flex items-center space-x-2 overflow-x-auto pb-2">
          <span class="text-sm text-gray-600 whitespace-nowrap">分类筛选：</span>
          <button
            v-for="category in categories"
            :key="category.id"
            @click="toggleCategory(category.id)"
            :class="[
              'px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors',
              selectedCategories.includes(category.id)
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ category.name }} ({{ getCompanyCount(category.id) }})
          </button>
        </div>
      </div>
    </section>

    <!-- 企业列表 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 排序和结果统计 -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm text-gray-600">
            找到 <span class="font-semibold text-gray-900">{{ filteredCompanies.length }}</span> 家企业
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">排序：</span>
            <select
              v-model="sortBy"
              class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="default">默认</option>
              <option value="name">名称</option>
              <option value="year">成立年份</option>
            </select>
          </div>
        </div>

        <!-- 企业卡片网格 -->
        <div v-if="filteredCompanies.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CompanyCard
            v-for="company in paginatedCompanies"
            :key="company.id"
            :company="company"
          />
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-16">
          <Icon name="heroicons:building-office" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500 text-lg mb-2">未找到相关企业</p>
          <p class="text-gray-400 text-sm">请尝试修改搜索关键词或筛选条件</p>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center space-x-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          
          <div class="flex items-center space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg',
                currentPage === page
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '企业目录 - 工控导航',
  meta: [
    { name: 'description', content: '浏览工业自动化行业企业目录，查找优质供应商和合作伙伴' }
  ]
})

// 响应式数据
const searchQuery = ref('')
const selectedFilter = ref(null)
const selectedCategories = ref([])
const sortBy = ref('default')
const currentPage = ref(1)
const pageSize = 12

const companies = ref([])
const categories = ref([])

// 计算属性
const filteredCompanies = computed(() => {
  let filtered = companies.value

  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(company =>
      company.name.toLowerCase().includes(query) ||
      (company.name_en && company.name_en.toLowerCase().includes(query)) ||
      (company.description && company.description.toLowerCase().includes(query))
    )
  }

  // 分类过滤
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(company =>
      selectedCategories.value.includes(company.category_id)
    )
  }

  // 筛选类型过滤
  if (selectedFilter.value === 'certified') {
    filtered = filtered.filter(company => company.is_certified)
  } else if (selectedFilter.value === 'recommended') {
    filtered = filtered.filter(company => company.is_recommended)
  }

  // 排序
  if (sortBy.value === 'name') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
  } else if (sortBy.value === 'year') {
    filtered = [...filtered].sort((a, b) => (b.founded_year || 0) - (a.founded_year || 0))
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredCompanies.value.length / pageSize)
})

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredCompanies.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages
})

// 方法
const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
  currentPage.value = 1 // 重置到第一页
}

const getCompanyCount = (categoryId) => {
  return companies.value.filter(company => company.category_id === categoryId).length
}

// 数据加载
const loadCompanies = async () => {
  const { fetchCompanies } = await import('~/utils/api')
  companies.value = await fetchCompanies()
}

const loadCategories = async () => {
  const { fetchCategories } = await import('~/utils/api')
  categories.value = await fetchCategories()
}

// 监听搜索和筛选变化，重置页码
watch([searchQuery, selectedFilter, selectedCategories], () => {
  currentPage.value = 1
})

// 页面初始化
onMounted(async () => {
  await Promise.all([
    loadCompanies(),
    loadCategories()
  ])
})
</script>

<style scoped>
/* 隐藏滚动条但保持功能 */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
