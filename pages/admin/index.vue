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
                  <UButton variant="ghost" size="sm" @click="deleteCategory(category.id)">
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
                      class="w-full h-full object-cover"
                    />
                    <Icon v-else name="heroicons:building-office" class="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ company.name }}</p>
                    <p class="text-sm text-gray-500">{{ company.category_name }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <UButton variant="ghost" size="sm" @click="openCompanyModal(company)">
                    <Icon name="heroicons:pencil" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" size="sm" @click="deleteCompany(company.id)">
                    <Icon name="heroicons:trash" class="w-4 h-4 text-red-500" />
                  </UButton>
                </div>
              </div>
            </li>
          </ul>
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
                  <UButton variant="ghost" size="sm" @click="deleteNews(news.id)">
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
            <USelect
              v-model="companyForm.category_id"
              :options="categoryOptions"
              placeholder="请选择分类"
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

// 模态框状态
const categoryModalOpen = ref(false)
const companyModalOpen = ref(false)
const newsModalOpen = ref(false)

// 数据
const categories = ref([])
const companies = ref([])
const newsList = ref([])

// 编辑状态
const editingCategory = ref(null)
const editingCompany = ref(null)
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
  category_id: null,
  website_url: '',
  logo_url: '',
  founded_year: null,
  headquarters: '',
  description: ''
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
  { key: 'news', name: '新闻管理', icon: 'heroicons:newspaper' }
]

// 计算属性
const categoryOptions = computed(() => 
  categories.value.map(cat => ({ label: cat.name, value: cat.id }))
)

const companyOptions = computed(() => 
  companies.value.map(comp => ({ label: comp.name, value: comp.id }))
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
    const [categoriesRes, companiesRes, newsRes] = await Promise.all([
      $fetch('/api/admin/categories'),
      $fetch('/api/admin/companies'),
      $fetch('/api/admin/news')
    ])
    categories.value = categoriesRes.data || []
    companies.value = companiesRes.data || []
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
    companyForm.value = { ...company }
  } else {
    companyForm.value = {
      name: '',
      name_en: '',
      category_id: null,
      website_url: '',
      logo_url: '',
      founded_year: null,
      headquarters: '',
      description: ''
    }
  }
  companyModalOpen.value = true
}

const saveCompany = async () => {
  try {
    saving.value = true
    const method = editingCompany.value ? 'PUT' : 'POST'
    const data = editingCompany.value 
      ? { ...companyForm.value, id: editingCompany.value.id }
      : companyForm.value
    
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

// 页面初始化
onMounted(() => {
  loadData()
})
</script>