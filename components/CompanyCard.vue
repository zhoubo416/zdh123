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
            class="w-full h-full object-cover"
          />
          <Icon v-else name="heroicons:building-office" class="w-6 h-6 text-gray-400" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {{ company.name }}
          </h3>
          <p v-if="company.name_en" class="text-sm text-gray-500">{{ company.name_en }}</p>
        </div>
      </div>
      
      <!-- 分类标签 -->
      <span v-if="company.category_name" class="category-badge">
        {{ company.category_name }}
      </span>
    </div>

    <!-- 公司描述 -->
    <p v-if="company.description" class="text-sm text-gray-600 mb-4 line-clamp-2">
      {{ company.description }}
    </p>

    <!-- 公司基本信息 -->
    <div class="space-y-2 mb-4">
      <div v-if="company.founded_year" class="flex items-center text-sm text-gray-500">
        <Icon name="heroicons:calendar" class="w-4 h-4 mr-2" />
        成立于 {{ company.founded_year }}年
      </div>
      <div v-if="company.headquarters" class="flex items-center text-sm text-gray-500">
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2" />
        {{ company.headquarters }}
      </div>
    </div>

    <!-- 快速导航链接 -->
    <div class="space-y-2 mb-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">快速导航</span>
        <UButton
          variant="ghost"
          size="xs"
          @click="toggleLinks"
        >
          <Icon 
            :name="showLinks ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
            class="w-4 h-4" 
          />
        </UButton>
      </div>
      
      <!-- 主要链接（始终显示） -->
      <div class="space-y-1">
        <a
          :href="company.website_url"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link flex items-center text-sm"
        >
          <Icon name="heroicons:home" class="w-4 h-4 mr-2" />
          官方网站
          <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 ml-1" />
        </a>
      </div>

      <!-- 扩展链接（可折叠） -->
      <div v-if="showLinks && navigationLinks.length > 0" class="space-y-1 pt-2 border-t">
        <a
          v-for="link in navigationLinks"
          :key="link.id"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link flex items-center text-sm"
          :title="link.description"
        >
          <Icon name="heroicons:link" class="w-4 h-4 mr-2" />
          {{ link.title }}
          <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="flex items-center justify-between pt-4 border-t">
      <div class="flex items-center space-x-2">
        <UButton variant="ghost" size="xs" @click="toggleFavorite">
          <Icon 
            :name="isFavorited ? 'heroicons:heart-solid' : 'heroicons:heart'" 
            :class="isFavorited ? 'text-red-500' : 'text-gray-400'"
            class="w-4 h-4" 
          />
        </UButton>
        <UButton variant="ghost" size="xs" @click="viewNews">
          <Icon name="heroicons:newspaper" class="w-4 h-4 text-gray-400" />
        </UButton>
      </div>
      
      <UButton
        variant="outline"
        size="xs"
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