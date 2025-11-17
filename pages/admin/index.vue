<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">数据管理后台</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">欢迎，管理员</span>
            <UButton variant="outline" size="sm" @click="logout">
              <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4 mr-2" />
              退出登录
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 标签页导航 -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <Icon :name="tab.icon" class="w-4 h-4 mr-2 inline" />
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- 分类管理 -->
      <div v-if="activeTab === 'categories'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900">分类管理</h2>
          <UButton @click="openCategoryModal()">
            <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
            添加分类
          </UButton>
        </div>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="category in categories" :key="category.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Icon :name="`heroicons:${category.icon || 'cube'}`" class="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ category.name }}</p>
                    <p class="text-sm text-gray-500">{{ category.name_en }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <UButton variant="ghost" size="sm" @click="openCategoryModal(category)">
                    <Icon name="heroicons:pencil" class="w-4 h-4" />
                  </UButton>
                  <UButton 
                    variant="ghost" 
                    size="sm" 
                    @click="deleteCategory(category.id)"
                    :loading="deleting"
                    :disabled="deleting"
                  >
                    <Icon name="heroicons:trash" class="w-4 h-4 text-red-500" />
                  </UButton>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 公司管理 -->
      <div v-if="activeTab === 'companies'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900">公司管理</h2>
          <UButton @click="openCompanyModal()">
            <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
            添加公司
          </UButton>
        </div>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="company in companies" :key="company.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mr-3">
                    <img
                      v-if="company.logo_url"
                      :src="company.logo_url"
                      :alt="company.name"
                      class="w-full h-full object-contain"
                    />
                    <Icon v-else name="heroicons:building-office" class="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ company.name }}</p>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span 
                        v-for="categoryName in company.category_names" 
                        :key="categoryName"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {{ categoryName }}
                      </span>
                      <span v-if="!company.category_names || company.category_names.length === 0" class="text-sm text-gray-500">
                        未分类
                      </span>
                    </div>
                    <div v-if="company.supplier_names && company.supplier_names.length > 0" class="flex flex-wrap gap-1 mt-1">
                      <span 
                        v-for="supplierName in company.supplier_names" 
                        :key="supplierName"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                      >
                        {{ supplierName }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <UButton variant="ghost" size="sm" @click="openCompanyModal(company)">
                    <Icon name="heroicons:pencil" class="w-4 h-4" />
                  </UButton>
                  <UButton 
                    variant="ghost" 
                    size="sm" 
                    @click="deleteCompany(company.id)"
                    :loading="deleting"
                    :disabled="deleting"
                  >
                    <Icon name="heroicons:trash" class="w-4 h-4 text-red-500" />
                  </UButton>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 供应商管理 -->
      <div v-if="activeTab === 'suppliers'" class="space-y-6">
        <!-- 供应商列表 -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">供应商列表</h3>
              <UButton @click="openSupplierModal()" icon="heroicons:plus">
                添加供应商
              </UButton>
            </div>
            
            <div class="space-y-3">
              <div
                v-for="supplier in suppliers"
                :key="supplier.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="heroicons:truck" class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ supplier.name }}</p>
                    <div class="text-sm text-gray-500">
                      <span v-if="supplier.contact_person">联系人：{{ supplier.contact_person }}</span>
                      <span v-if="supplier.phone" class="ml-4">电话：{{ supplier.phone }}</span>
                    </div>
                    <div v-if="supplier.company_names && supplier.company_names.length > 0" class="flex flex-wrap gap-1 mt-1">
                      <span 
                        v-for="companyName in supplier.company_names" 
                        :key="companyName"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {{ companyName }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <UButton
                    @click="openSupplierModal(supplier)"
                    variant="ghost"
                    size="sm"
                    icon="heroicons:pencil"
                  >
                    编辑
                  </UButton>
                  <UButton
                    @click="deleteSupplier(supplier.id)"
                    variant="ghost"
                    size="sm"
                    color="red"
                    icon="heroicons:trash"
                  >
                    删除
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新闻管理 -->
      <div v-if="activeTab === 'news'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900">新闻管理</h2>
          <UButton @click="openNewsModal()">
            <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
            添加新闻
          </UButton>
        </div>
        
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="news in newsList" :key="news.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ news.title }}</p>
                  <p class="text-sm text-gray-500">{{ news.company_name }} • {{ formatDate(news.published_at) }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <UButton variant="ghost" size="sm" @click="openNewsModal(news)">
                    <Icon name="heroicons:pencil" class="w-4 h-4" />
                  </UButton>
                  <UButton 
                    variant="ghost" 
                    size="sm" 
                    @click="deleteNews(news.id)"
                    :loading="deleting"
                    :disabled="deleting"
                  >
                    <Icon name="heroicons:trash" class="w-4 h-4 text-red-500" />
                  </UButton>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 分类编辑模态框 -->
    <UModal v-model="categoryModalOpen">
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingCategory?.id ? '编辑分类' : '添加分类' }}
        </h3>
        <form @submit.prevent="saveCategory" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">分类名称</label>
            <UInput v-model="categoryForm.name" placeholder="请输入分类名称" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">英文名称</label>
            <UInput v-model="categoryForm.name_en" placeholder="请输入英文名称" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <UTextarea v-model="categoryForm.description" placeholder="请输入描述" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">图标</label>
            <UInput v-model="categoryForm.icon" placeholder="heroicons图标名称，如：cpu-chip" />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <UButton variant="outline" @click="categoryModalOpen = false">取消</UButton>
            <UButton type="submit" :loading="saving">保存</UButton>
          </div>
        </form>
      </div>
    </UModal>

    <!-- 公司编辑模态框 -->
    <UModal v-model="companyModalOpen">
      <div class="p-6 max-h-[80vh] overflow-y-auto">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingCompany?.id ? '编辑公司' : '添加公司' }}
        </h3>
        <form @submit.prevent="saveCompany" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
              <UInput v-model="companyForm.name" placeholder="请输入公司名称" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">英文名称</label>
              <UInput v-model="companyForm.name_en" placeholder="请输入英文名称" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <USelectMenu
              v-model="companyForm.category_ids"
              :options="categoryOptions"
              placeholder="请选择分类"
              multiple
              searchable
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">官网地址</label>
            <UInput v-model="companyForm.website_url" placeholder="https://example.com" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
            <UInput v-model="companyForm.logo_url" placeholder="https://example.com/logo.png" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">成立年份</label>
              <UInput v-model="companyForm.founded_year" type="number" placeholder="2000" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">总部地址</label>
              <UInput v-model="companyForm.headquarters" placeholder="请输入总部地址" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">关联供应商</label>
            <USelectMenu
              v-model="companyForm.supplier_ids"
              :options="supplierOptions"
              placeholder="请选择关联供应商"
              multiple
              searchable
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">公司描述</label>
            <UTextarea v-model="companyForm.description" placeholder="请输入公司描述" />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <UButton variant="outline" @click="companyModalOpen = false">取消</UButton>
            <UButton type="submit" :loading="saving">保存</UButton>
          </div>
        </form>
      </div>
    </UModal>

    <!-- 供应商编辑模态框 -->
    <UModal v-model="supplierModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            {{ editingSupplier ? '编辑供应商' : '添加供应商' }}
          </h3>
        </template>

        <form @submit.prevent="saveSupplier" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">供应商名称</label>
            <UInput
              v-model="supplierForm.name"
              placeholder="请输入供应商名称"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">联系人</label>
            <UInput
              v-model="supplierForm.contact_person"
              placeholder="请输入联系人姓名"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
            <UInput
              v-model="supplierForm.phone"
              placeholder="请输入联系电话"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <UInput
              v-model="supplierForm.email"
              type="email"
              placeholder="请输入邮箱地址"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">地址</label>
            <UTextarea
              v-model="supplierForm.address"
              placeholder="请输入地址"
              rows="2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">网站</label>
            <UInput
              v-model="supplierForm.website_url"
              placeholder="请输入网站地址"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">关联公司</label>
            <USelectMenu
              v-model="supplierForm.company_ids"
              :options="companyOptions"
              placeholder="请选择关联公司"
              multiple
              searchable
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <UTextarea
              v-model="supplierForm.description"
              placeholder="请输入供应商描述"
              rows="3"
            />
          </div>
        </form>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="ghost" @click="supplierModalOpen = false">
              取消
            </UButton>
            <UButton @click="saveSupplier" :loading="saving">
              {{ editingSupplier ? '更新' : '创建' }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- 新闻编辑模态框 -->
    <UModal v-model="newsModalOpen">
      <div class="p-6 max-h-[80vh] overflow-y-auto">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingNews?.id ? '编辑新闻' : '添加新闻' }}
        </h3>
        <form @submit.prevent="saveNews" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">新闻标题</label>
            <UInput v-model="newsForm.title" placeholder="请输入新闻标题" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">关联公司</label>
            <USelect
              v-model="newsForm.company_id"
              :options="companyOptions"
              placeholder="请选择公司"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">新闻摘要</label>
            <UTextarea v-model="newsForm.summary" placeholder="请输入新闻摘要" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">新闻内容</label>
            <UTextarea v-model="newsForm.content" placeholder="请输入新闻内容" rows="4" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">原文链接</label>
            <UInput v-model="newsForm.source_url" placeholder="https://example.com/news" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">发布时间</label>
            <UInput v-model="newsForm.published_at" type="datetime-local" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">标签（用逗号分隔）</label>
            <UInput v-model="newsForm.tags" placeholder="标签1,标签2,标签3" />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <UButton variant="outline" @click="newsModalOpen = false">取消</UButton>
            <UButton type="submit" :loading="saving">保存</UButton>
          </div>
        </form>
      </div>
    </UModal>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '数据管理 - 工控导航',
  meta: [
    { name: 'description', content: '数据管理后台' }
  ]
})

// 中间件：检查登录状态
definePageMeta({
  middleware: 'auth'
})

// 响应式数据
const activeTab = ref('categories')
const saving = ref(false)
const deleting = ref(false)

// 模态框状态
const categoryModalOpen = ref(false)
const companyModalOpen = ref(false)
const supplierModalOpen = ref(false)
const newsModalOpen = ref(false)

// 数据
const categories = ref([])
const companies = ref([])
const suppliers = ref([])
const newsList = ref([])

// 编辑状态
const editingCategory = ref(null)
const editingCompany = ref(null)
const editingSupplier = ref(null)
const editingNews = ref(null)

// 表单数据
const categoryForm = ref({
  name: '',
  name_en: '',
  description: '',
  icon: ''
})

const companyForm = ref({
  name: '',
  name_en: '',
  category_ids: [],
  website_url: '',
  logo_url: '',
  founded_year: null,
  headquarters: '',
  description: '',
  supplier_ids: []
})

const supplierForm = ref({
  name: '',
  contact_person: '',
  phone: '',
  email: '',
  address: '',
  website_url: '',
  description: '',
  company_ids: []
})

const newsForm = ref({
  title: '',
  company_id: null,
  summary: '',
  content: '',
  source_url: '',
  published_at: '',
  tags: ''
})

// 标签页配置
const tabs = [
  { key: 'categories', name: '分类管理', icon: 'heroicons:tag' },
  { key: 'companies', name: '公司管理', icon: 'heroicons:building-office' },
  { key: 'suppliers', name: '供应商管理', icon: 'heroicons:truck' },
  { key: 'news', name: '新闻管理', icon: 'heroicons:newspaper' }
]

// 计算属性
const categoryOptions = computed(() => 
  categories.value.map(cat => ({ label: cat.name, value: cat.id }))
)

const companyOptions = computed(() => 
  companies.value.map(company => ({ label: company.name, value: company.id }))
)

const supplierOptions = computed(() => 
  suppliers.value.map(supplier => ({ label: supplier.name, value: supplier.id }))
)

// 方法
const logout = () => {
  localStorage.removeItem('admin_token')
  navigateTo('/admin/login')
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

// 数据加载
const loadData = async () => {
  try {
    const [categoriesRes, companiesRes, suppliersRes, newsRes] = await Promise.all([
      $fetch('/api/admin/categories'),
      $fetch('/api/admin/companies'),
      $fetch('/api/admin/suppliers'),
      $fetch('/api/admin/news')
    ])
    categories.value = categoriesRes.data || []
    companies.value = companiesRes.data || []
    suppliers.value = suppliersRes.data || []
    newsList.value = newsRes.data || []
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

// 分类相关方法
const openCategoryModal = (category = null) => {
  editingCategory.value = category
  if (category) {
    categoryForm.value = { ...category }
  } else {
    categoryForm.value = { name: '', name_en: '', description: '', icon: '' }
  }
  categoryModalOpen.value = true
}

const saveCategory = async () => {
  try {
    saving.value = true
    const method = editingCategory.value ? 'PUT' : 'POST'
    const data = editingCategory.value 
      ? { ...categoryForm.value, id: editingCategory.value.id }
      : categoryForm.value
    
    await $fetch('/api/admin/categories', {
      method,
      body: data
    })
    
    categoryModalOpen.value = false
    await loadData()
  } catch (error) {
    console.error('Failed to save category:', error)
    alert('保存失败：' + error.message)
  } finally {
    saving.value = false
  }
}

const deleteCategory = async (id) => {
  if (confirm('确定要删除这个分类吗？')) {
    try {
      await $fetch('/api/admin/categories', {
        method: 'DELETE',
        body: { id }
      })
      await loadData()
    } catch (error) {
      console.error('Failed to delete category:', error)
      alert('删除失败：' + error.message)
    }
  }
}

// 公司相关方法
const openCompanyModal = (company = null) => {
  editingCompany.value = company
  if (company) {
    // 编辑模式：从公司数据中提取分类ID数组，转换为选择器需要的格式
    const categoryIds = company.category_ids || []
    const selectedCategories = categoryIds.map(id => {
      const category = categories.value.find(cat => cat.id === id)
      return category ? { label: category.name, value: category.id } : { label: `分类${id}`, value: id }
    })
    
    // 处理供应商ID数组
    const supplierIds = company.supplier_ids || []
    const selectedSuppliers = supplierIds.map(id => {
      const supplier = suppliers.value.find(sup => sup.id === id)
      return supplier ? { label: supplier.name, value: supplier.id } : { label: `供应商${id}`, value: id }
    })
    
    companyForm.value = { 
      ...company,
      category_ids: selectedCategories,
      supplier_ids: selectedSuppliers
    }
  } else {
    // 新增模式：重置表单
    companyForm.value = {
      name: '',
      name_en: '',
      category_ids: [],
      website_url: '',
      logo_url: '',
      founded_year: null,
      headquarters: '',
      description: '',
      supplier_ids: []
    }
  }
  companyModalOpen.value = true
}

const saveCompany = async () => {
  try {
    saving.value = true
    const method = editingCompany.value ? 'PUT' : 'POST'
    
    // 处理分类ID数据格式
    const categoryIds = Array.isArray(companyForm.value.category_ids) 
      ? companyForm.value.category_ids.map(item => 
          typeof item === 'object' ? item.value : item
        )
      : []
    
    // 处理供应商ID数据格式
    const supplierIds = Array.isArray(companyForm.value.supplier_ids) 
      ? companyForm.value.supplier_ids.map(item => 
          typeof item === 'object' ? item.value : item
        )
      : []
    
    const data = editingCompany.value 
      ? { ...companyForm.value, id: editingCompany.value.id, category_ids: categoryIds, supplier_ids: supplierIds }
      : { ...companyForm.value, category_ids: categoryIds, supplier_ids: supplierIds }
    
    await $fetch('/api/admin/companies', {
      method,
      body: data
    })
    
    companyModalOpen.value = false
    await loadData()
  } catch (error) {
    console.error('Failed to save company:', error)
    alert('保存失败：' + error.message)
  } finally {
    saving.value = false
  }
}

const deleteCompany = async (id) => {
  if (confirm('确定要删除这个公司吗？')) {
    try {
      await $fetch('/api/admin/companies', {
        method: 'DELETE',
        body: { id }
      })
      await loadData()
    } catch (error) {
      console.error('Failed to delete company:', error)
      alert('删除失败：' + error.message)
    }
  }
}

// 新闻相关方法
const openNewsModal = (news = null) => {
  editingNews.value = news
  if (news) {
    newsForm.value = {
      ...news,
      published_at: news.published_at ? new Date(news.published_at).toISOString().slice(0, 16) : '',
      tags: news.tags ? news.tags.join(',') : ''
    }
  } else {
    newsForm.value = {
      title: '',
      company_id: null,
      summary: '',
      content: '',
      source_url: '',
      published_at: '',
      tags: ''
    }
  }
  newsModalOpen.value = true
}

const saveNews = async () => {
  try {
    saving.value = true
    const method = editingNews.value ? 'PUT' : 'POST'
    const data = editingNews.value 
      ? { ...newsForm.value, id: editingNews.value.id }
      : newsForm.value
    
    await $fetch('/api/admin/news', {
      method,
      body: data
    })
    
    newsModalOpen.value = false
    await loadData()
  } catch (error) {
    console.error('Failed to save news:', error)
    alert('保存失败：' + error.message)
  } finally {
    saving.value = false
  }
}

const deleteNews = async (id) => {
  if (confirm('确定要删除这条新闻吗？')) {
    try {
      await $fetch('/api/admin/news', {
        method: 'DELETE',
        body: { id }
      })
      await loadData()
    } catch (error) {
      console.error('Failed to delete news:', error)
      alert('删除失败：' + error.message)
    }
  }
}

// 供应商相关方法
const openSupplierModal = (supplier = null) => {
  editingSupplier.value = supplier
  if (supplier) {
    // 编辑模式：从供应商数据中提取公司ID数组，转换为选择器需要的格式
    const companyIds = supplier.company_ids || []
    const selectedCompanies = companyIds.map(id => {
      const company = companies.value.find(comp => comp.id === id)
      return company ? { label: company.name, value: company.id } : { label: `公司${id}`, value: id }
    })
    
    supplierForm.value = { 
      ...supplier,
      company_ids: selectedCompanies
    }
  } else {
    // 新增模式：重置表单
    supplierForm.value = {
      name: '',
      contact_person: '',
      phone: '',
      email: '',
      address: '',
      website_url: '',
      description: '',
      company_ids: []
    }
  }
  supplierModalOpen.value = true
}

const saveSupplier = async () => {
  try {
    saving.value = true
    const method = editingSupplier.value ? 'PUT' : 'POST'
    
    // 处理公司ID数据格式
    const companyIds = Array.isArray(supplierForm.value.company_ids) 
      ? supplierForm.value.company_ids.map(item => 
          typeof item === 'object' ? item.value : item
        )
      : []
    
    const data = editingSupplier.value 
      ? { ...supplierForm.value, id: editingSupplier.value.id, company_ids: companyIds }
      : { ...supplierForm.value, company_ids: companyIds }
    
    await $fetch('/api/admin/suppliers', {
      method,
      body: data
    })
    
    supplierModalOpen.value = false
    await loadData()
  } catch (error) {
    console.error('Failed to save supplier:', error)
    alert('保存失败：' + error.message)
  } finally {
    saving.value = false
  }
}

const deleteSupplier = async (id) => {
  if (confirm('确定要删除这个供应商吗？')) {
    try {
      await $fetch('/api/admin/suppliers', {
        method: 'DELETE',
        body: { id }
      })
      await loadData()
    } catch (error) {
      console.error('Failed to delete supplier:', error)
      alert('删除失败：' + error.message)
    }
  }
}

// 页面初始化
onMounted(() => {
  loadData()
})
</script>