<template>
  <div class="company-card group">
    <!-- 公司头部信息 -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            v-if="company.logo_url"
            :src="company.logo_url"
            :alt="company.name"
            class="w-full h-full object-contain"
          />
          <Icon v-else name="heroicons:building-office" class="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
            {{ company.name }}
          </h3>
          <p v-if="company.name_en" class="text-sm text-gray-500">{{ company.name_en }}</p>
        </div>
      </div>

      <!-- 快速导航链接 -->
    <div class="mb-4 flex">

      <!-- 主要链接（始终显示） -->
      <a
          :href="company.website_url"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link flex items-center text-sm"
        >
          <Icon name="heroicons:home" class="w-4 h-4 ml-2" />
          官方网站
        </a>
      <a
        v-for="link in navigationLinks"
        :key="link.id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link flex items-center text-sm"
        :title="link.description"
      >
        <Icon name="heroicons:link" class="w-4 h-4 ml-2" />
        {{ link.title }}
      </a>
    </div>
      
      
    </div>
    <!-- 分类标签 -->
    <div v-if="company.category_names && company.category_names.length > 0" class="flex flex-wrap gap-1 mb-2">
      <span 
        v-for="categoryName in company.category_names" 
        :key="categoryName"
        class="category-badge"
      >
        {{ categoryName }}
      </span>
    </div>

    <!-- 供应商信息 -->
    <div v-if="company.supplier_names && company.supplier_names.length > 0" class="mb-3">
      <div class="flex items-center mb-2">
        <Icon name="heroicons:truck" class="w-4 h-4 text-orange-500 mr-2" />
        <span class="text-sm font-medium text-gray-700">合作供应商</span>
      </div>
      <div class="flex flex-wrap gap-1">
        <span 
          v-for="supplierName in company.supplier_names" 
          :key="supplierName"
          class="supplier-badge"
          :title="`供应商: ${supplierName}`"
        >
          {{ supplierName }}
        </span>
      </div>
    </div>
    <!-- 公司描述 -->
    <p v-if="company.description" class="text-sm text-gray-600 mb-4 line-clamp-2">
      {{ company.description }}
    </p>

    <!-- 公司基本信息 -->
    <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
      <div v-if="company.headquarters" class="flex items-center">
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
        {{ company.headquarters }}
      </div>
      <div v-if="company.founded_year" class="flex items-center">
        <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
        {{ company.founded_year }}
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
      <div class="flex items-center space-x-2">
        <UButton variant="ghost" size="xs" @click="toggleFavorite" class="hover:text-orange-500">
          <Icon 
            :name="isFavorited ? 'heroicons:heart-solid' : 'heroicons:heart'" 
            :class="isFavorited ? 'text-orange-500' : 'text-gray-400'"
            class="w-4 h-4" 
          />
        </UButton>
      </div>
      
      <UButton
        size="xs"
        color="orange"
        variant="outline"
        @click="viewDetails"
      >
        查看详情
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  company: {
    type: Object,
    required: true
  }
})

// 响应式数据
const showLinks = ref(false)
const isFavorited = ref(false)
const navigationLinks = ref([])

// 方法
const toggleLinks = () => {
  showLinks.value = !showLinks.value
  if (showLinks.value && navigationLinks.value.length === 0) {
    loadNavigationLinks()
  }
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  // TODO: 实现收藏功能
}

const viewNews = () => {
  navigateTo(`/company/${props.company.id}/news`)
}

const viewDetails = () => {
  navigateTo(`/company/${props.company.id}`)
}

const loadNavigationLinks = async () => {
  const { fetchNavigationLinks } = await import('~/utils/api')
  navigationLinks.value = await fetchNavigationLinks(props.company.id)
}

// 检查是否已收藏
onMounted(() => {
  // TODO: 从本地存储或用户设置中检查收藏状态
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  isFavorited.value = favorites.includes(props.company.id)
})

// 监听收藏状态变化
watch(isFavorited, (newValue) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  if (newValue) {
    if (!favorites.includes(props.company.id)) {
      favorites.push(props.company.id)
    }
  } else {
    const index = favorites.indexOf(props.company.id)
    if (index > -1) {
      favorites.splice(index, 1)
    }
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>