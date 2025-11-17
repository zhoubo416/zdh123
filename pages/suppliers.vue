<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">供应商目录</h1>
              <p class="mt-1 text-sm text-gray-500">
                浏览和搜索工业供应商信息
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <!-- 搜索框 -->
              <div class="relative">
                <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <UInput
                  v-model="searchQuery"
                  placeholder="搜索供应商..."
                  class="pl-10 w-64"
                />
              </div>
              <!-- 筛选按钮 -->
              <UButton variant="outline" @click="showFilters = !showFilters">
                <Icon name="heroicons:funnel" class="w-4 h-4 mr-2" />
                筛选
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选面板 -->
    <div v-if="showFilters" class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">按服务公司筛选</label>
            <USelectMenu
              v-model="selectedCompanies"
              :options="companyOptions"
              placeholder="选择公司"
              multiple
              searchable
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">按地区筛选</label>
            <USelectMenu
              v-model="selectedRegions"
              :options="regionOptions"
              placeholder="选择地区"
              multiple
            />
          </div>
          <div class="flex items-end">
            <UButton @click="clearFilters" variant="ghost">
              清除筛选
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 统计信息 -->
      <div class="mb-6">
        <p class="text-sm text-gray-600">
          共找到 <span class="font-medium text-gray-900">{{ filteredSuppliers.length }}</span> 个供应商
        </p>
      </div>

      <!-- 供应商网格 -->
      <div v-if="filteredSuppliers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SupplierCard
          v-for="supplier in paginatedSuppliers"
          :key="supplier.id"
          :supplier="supplier"
        />
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-12">
        <Icon name="heroicons:truck" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无供应商</h3>
        <p class="text-gray-500">
          {{ searchQuery ? '没有找到匹配的供应商' : '暂时没有供应商信息' }}
        </p>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="pageSize"
          :total="filteredSuppliers.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
definePageMeta({
  title: '供应商目录'
})

// 响应式数据
const searchQuery = ref('')
const showFilters = ref(false)
const selectedCompanies = ref([])
const selectedRegions = ref([])
const currentPage = ref(1)
const pageSize = 12

const suppliers = ref([])
const companies = ref([])

// 计算属性
const companyOptions = computed(() => 
  companies.value.map(company => ({ label: company.name, value: company.id }))
)

const regionOptions = computed(() => {
  const regions = [...new Set(suppliers.value.map(s => s.address).filter(Boolean))]
  return regions.map(region => ({ label: region, value: region }))
})

const filteredSuppliers = computed(() => {
  let filtered = suppliers.value

  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(supplier => 
      supplier.name.toLowerCase().includes(query) ||
      supplier.contact_person?.toLowerCase().includes(query) ||
      supplier.description?.toLowerCase().includes(query)
    )
  }

  // 公司筛选
  if (selectedCompanies.value.length > 0) {
    filtered = filtered.filter(supplier => 
      supplier.company_ids?.some(id => selectedCompanies.value.includes(id))
    )
  }

  // 地区筛选
  if (selectedRegions.value.length > 0) {
    filtered = filtered.filter(supplier => 
      selectedRegions.value.includes(supplier.address)
    )
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredSuppliers.value.length / pageSize))

const paginatedSuppliers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredSuppliers.value.slice(start, end)
})

// 方法
const clearFilters = () => {
  searchQuery.value = ''
  selectedCompanies.value = []
  selectedRegions.value = []
  currentPage.value = 1
}

const loadData = async () => {
  try {
    const [suppliersRes, companiesRes] = await Promise.all([
      $fetch('/api/suppliers'),
      $fetch('/api/companies')
    ])
    suppliers.value = suppliersRes.data || []
    companies.value = companiesRes.data || []
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

// 生命周期
onMounted(() => {
  loadData()
})

// 监听搜索变化，重置分页
watch([searchQuery, selectedCompanies, selectedRegions], () => {
  currentPage.value = 1
})
</script>