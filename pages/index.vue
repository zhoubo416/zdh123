<template>
  <div class="">
    <!-- Hero Section - 黑色背景 -->
    <section class="relative bg-black text-white py-24 h-[90vh]">
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>
      <div class="relative left-24 top-5 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- 小标签 -->
        <ClientOnly>
          <Transition name="hero-badge-fade" appear>
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm mb-6">
              <Icon name="heroicons:rocket-launch" class="w-4 h-4 mr-2" />
              连接智能制造生态系统
            </div>
          </Transition>
          <template #fallback>
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm mb-6">
              <Icon name="heroicons:rocket-launch" class="w-4 h-4 mr-2" />
              连接智能制造生态系统
            </div>
          </template>
        </ClientOnly>
        
        <!-- 主标题 -->
        <ClientOnly>
          <Transition name="hero-title1-fade" appear>
            <h2 class="text-5xl text-white md:text-6xl font-bold mb-8 mt=4">
              工业自动化
            </h2>
          </Transition>
          <template #fallback>
            <h2 class="text-5xl text-white md:text-6xl font-bold mb-8 mt=4">
              工业自动化
            </h2>
          </template>
        </ClientOnly>

        <ClientOnly>
          <Transition name="hero-title2-fade" appear>
            <h1 class="text-4xl text-orange-500 md:text-5xl font-bold mb-8 mt=4 mb-8 mt-4">智能导航平台</h1>
          </Transition>
          <template #fallback>
            <h1 class="text-4xl text-orange-500 md:text-5xl font-bold mb-8 mt=4 mb-8 mt-4">智能导航平台</h1>
          </template>
        </ClientOnly>
        
        <!-- 副标题 -->
        <ClientOnly>
          <Transition name="hero-desc-fade" appear>
            <p class="text-xl text-gray-400 max-w-2xl mb-12 mt-12">
              汇聚全球领先的工业自动化企业，供应商和技术解决方案，助力企业实现数字化转型与智能制造升级
            </p>
          </Transition>
          <template #fallback>
            <p class="text-xl text-gray-400 max-w-2xl mb-12 mt-12">
              汇聚全球领先的工业自动化企业，供应商和技术解决方案，助力企业实现数字化转型与智能制造升级
            </p>
          </template>
        </ClientOnly>
        
        <!-- 搜索框 -->
        <div class="flex items-center max-w-2xl">
          <div class="relative flex-1">
            <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索企业、产品或技术..."
              class="w-full pl-12 pr-4 py-4 rounded-l-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button class="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-r-lg transition-colors">
            开始搜索
          </button>
        </div>
      </div>
    </section>

    <!-- 行业分类 Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">行业分类</h2>
          <p class="text-gray-600">涵盖工业自动化全产业链，为您精准匹配所需领域</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-card group"
            :class="{ 'border-orange-500 shadow-lg': selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <Icon :name="`heroicons:${category.icon || 'cube'}`" class="w-6 h-6 text-orange-500" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">{{ category.name }}</h3>
                <p class="text-sm text-gray-600">{{ getCompanyCount(category.id) }} 家企业</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 企业目录 Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">企业目录</h2>
            <p class="text-gray-600">优质企业信息一站查询，快速找到合作伙伴</p>
          </div>
          <NuxtLink 
            to="/companies" 
            class="flex items-center px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors group"
          >
            查看更多
            <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CompanyCard
            v-for="company in filteredCompanies.slice(0, 6)"
            :key="company.id"
            :company="company"
          />
        </div>
        
        <div v-if="filteredCompanies.length === 0" class="text-center py-12">
          <Icon name="heroicons:building-office" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">暂无企业数据</p>
        </div>
      </div>
    </section>

    <!-- 优质供应商 Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-3">优质供应商</h2>
            <p class="text-gray-600">严格筛选，信誉保证，为您的采购保驾护航</p>
          </div>
          <NuxtLink 
            to="/suppliers" 
            class="flex items-center px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors group"
          >
            查看更多
            <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SupplierCard
            v-for="supplier in suppliersWithCount.slice(0, 3)"
            :key="supplier.id"
            :supplier="supplier"
          />
        </div>
        
        <div v-if="suppliersWithCount.length === 0" class="text-center py-8">
          <Icon name="heroicons:truck" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">暂无供应商</p>
        </div>
      </div>
    </section>

    <!-- 行业资讯 Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">行业资讯</h2>
            <p class="text-gray-600">实时追踪行业动态，把握市场趋势与技术前沿</p>
          </div>
          <NuxtLink 
            to="/news" 
            class="flex items-center px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors group"
          >
            查看更多
            <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
        
        <div class="w-full">
          <NewsFeed class="w-full" :feeds="newsFeeds" :limit="6" />
        </div>
        
        <div v-if="newsFeeds.length === 0" class="text-center py-12">
          <Icon name="heroicons:newspaper" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">暂无资讯</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '工控导航 - 工业自动化智能导航平台',
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
  selectedSupplier.value = null
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
  await nextTick()
  await refreshData()
})
</script>

<style scoped>
/* 通用的 enter-from 状态 - 初始状态 */
.hero-badge-fade-enter-from,
.hero-title1-fade-enter-from,
.hero-title2-fade-enter-from,
.hero-desc-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* 通用的 enter-to 状态 - 最终状态 */
.hero-badge-fade-enter-to,
.hero-title1-fade-enter-to,
.hero-title2-fade-enter-to,
.hero-desc-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* 为每个元素设置不同的延迟和过渡效果 */
.hero-badge-fade-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.1s;
}

.hero-title1-fade-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.3s;
}

.hero-title2-fade-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.5s;
}

.hero-desc-fade-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.7s;
}
</style>