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

        <div class="flex items-center space-x-4 overflow-x-auto pb-2 w-full">
          <div v-for="category in categories" :key="category.id"
            class="flex flex-col items-center w-30 p-2 mt-4 rounded-lg border hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
            :class="{ 'border-blue-500 bg-blue-50': selectedCategory === category.id }"
            @click="selectCategory(category.id)">
            <Icon :name="`heroicons:${category.icon || 'cube'}`" class="w-6 h-6 text-blue-600 mb-2" />
            <span class="text-xs font-medium text-gray-900">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="flex flex-row gap-4 w-full p-4">
      <!-- 供应商侧边栏 -->
      <section class="w-[20vw] bg-white rounded-lg shadow-sm border p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">供应商</h3>
          <UButton v-if="selectedSupplier" variant="ghost" size="xs" @click="clearSupplier">
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </UButton>
        </div>
        
        <div class="space-y-2">
          <div
            v-for="supplier in suppliersWithCount"
            :key="supplier.id"
            class="flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
            :class="{ 'bg-orange-50 border border-orange-200': selectedSupplier === supplier.id }"
            @click="selectSupplier(supplier.id)"
          >
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:truck" class="w-4 h-4 text-orange-600" />
              <span class="text-sm font-medium text-gray-900 truncate" :title="supplier.name">
                {{ supplier.name }}
              </span>
            </div>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {{ supplier.company_count }}
            </span>
          </div>
          
          <div v-if="suppliersWithCount.length === 0" class="text-center py-4">
            <Icon name="heroicons:truck" class="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p class="text-sm text-gray-500">暂无供应商</p>
          </div>
        </div>
      </section>
      
      <!-- 公司列表 -->
      <section class="flex-1 bg-gray-50">

        <!-- 公司卡片网格 -->
        <div class="w-full">
          <CompanyCard class="mb-2" v-for="company in filteredCompanies" :key="company.id" :company="company" />
        </div>

        <!-- 空状态 -->
        <div v-if="filteredCompanies.length === 0" class="text-center py-12">
          <Icon name="heroicons:building-office" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">暂无公司数据</h3>
          <p class="text-gray-500">该分类下还没有添加公司信息</p>
        </div>
      </section>

      <!-- 信息流区域 -->
      <section class="w-[20vw] bg-gray-50">
        <div class="w-full">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold text-gray-900"></h2>
            <NuxtLink to="/news" class="text-blue-600 hover:text-blue-800 font-medium">
              行业资讯 →
            </NuxtLink>
          </div>

          <NewsFeed :feeds="newsFeeds" :limit="6" />
        </div>
      </section>
    </div>

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
const selectedSupplier = ref(null)
const categories = ref([])
const companies = ref([])
const suppliers = ref([])
const newsFeeds = ref([])

// 计算属性
const filteredCompanies = computed(() => {
  let filtered = companies.value

  // 按分类筛选
  if (selectedCategory.value) {
    filtered = filtered.filter(company => company.category_id === selectedCategory.value)
  }

  // 按供应商筛选
  if (selectedSupplier.value) {
    filtered = filtered.filter(company => 
      company.supplier_ids && company.supplier_ids.includes(selectedSupplier.value)
    )
  }

  return filtered
})

const suppliersWithCount = computed(() => {
  return suppliers.value.map(supplier => ({
    ...supplier,
    company_count: companies.value.filter(company => 
      company.supplier_ids && company.supplier_ids.includes(supplier.id)
    ).length
  })).filter(supplier => supplier.company_count > 0)
})

// 方法
const selectCategory = (categoryId) => {
  selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
  selectedSupplier.value = null // 清除供应商筛选
}

const selectSupplier = (supplierId) => {
  selectedSupplier.value = selectedSupplier.value === supplierId ? null : supplierId
  selectedCategory.value = null // 清除分类筛选
}

const clearCategory = () => {
  selectedCategory.value = null
}

const clearSupplier = () => {
  selectedSupplier.value = null
}

const clearAllFilters = () => {
  selectedCategory.value = null
  selectedSupplier.value = null
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : ''
}

const getSupplierName = (supplierId) => {
  const supplier = suppliers.value.find(sup => sup.id === supplierId)
  return supplier ? supplier.name : ''
}

const getFilterTitle = () => {
  if (selectedCategory.value && selectedSupplier.value) {
    return `${getCategoryName(selectedCategory.value)} - ${getSupplierName(selectedSupplier.value)}`
  } else if (selectedCategory.value) {
    return getCategoryName(selectedCategory.value)
  } else if (selectedSupplier.value) {
    return `${getSupplierName(selectedSupplier.value)}的合作公司`
  } else {
    return '全部公司'
  }
}

const getCompanyCount = (categoryId) => {
  return companies.value.filter(company => company.category_id === categoryId).length
}

const refreshData = async () => {
  await Promise.all([
    loadCategories(),
    loadCompanies(),
    loadSuppliers(),
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

const loadSuppliers = async () => {
  const { fetchSuppliers } = await import('~/utils/api')
  suppliers.value = await fetchSuppliers()
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