<template>
  <div class="space-y-6">
    <!-- 信息流标题和筛选 -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">最新资讯</h3>
      <div class="flex items-center space-x-2">
        <USelectMenu
          v-model="selectedCompany"
          :options="companyOptions"
          placeholder="筛选公司"
          size="sm"
        />
        <UButton variant="ghost" size="sm" @click="refreshFeeds">
          <Icon name="heroicons:arrow-path" class="w-4 h-4" />
        </UButton>
      </div>
    </div>

    <!-- 信息流列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="feed in displayedFeeds"
        :key="feed.id"
        class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
      >
        <!-- 文章图片 -->
        <div v-if="feed.image_url" class="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            :src="feed.image_url"
            :alt="feed.title"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>

        <!-- 文章内容 -->
        <div class="p-4">
          <!-- 标题 -->
          <h4 class="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
            <a
              v-if="feed.source_url"
              :href="feed.source_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ feed.title }}
            </a>
            <span v-else>{{ feed.title }}</span>
          </h4>

          <!-- 摘要 -->
          <p v-if="feed.summary" class="text-sm text-gray-600 mb-3 line-clamp-3">
            {{ feed.summary }}
          </p>

          <!-- 标签 -->
          <div v-if="feed.tags && feed.tags.length > 0" class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="tag in feed.tags.slice(0, 3)"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 底部信息 -->
          <div class="flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-2">
              <span v-if="feed.company_name" class="font-medium">{{ feed.company_name }}</span>
              <span v-if="feed.published_at">{{ formatDate(feed.published_at) }}</span>
            </div>
            
            <div class="flex items-center space-x-1">
              <UButton
                v-if="feed.source_url"
                variant="ghost"
                size="xs"
                :to="feed.source_url"
                target="_blank"
              >
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
              </UButton>
              <UButton variant="ghost" size="xs" @click="shareArticle(feed)">
                <Icon name="heroicons:share" class="w-4 h-4" />
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="displayedFeeds.length === 0" class="text-center py-12">
      <Icon name="heroicons:newspaper" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">暂无资讯</h3>
      <p class="text-gray-500">还没有相关的资讯信息</p>
    </div>

    <!-- 加载更多 -->
    <div v-if="hasMore && displayedFeeds.length > 0" class="text-center">
      <UButton
        variant="outline"
        :loading="loading"
        @click="loadMore"
      >
        加载更多
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  feeds: {
    type: Array,
    default: () => []
  },
  limit: {
    type: Number,
    default: 10
  },
  companyId: {
    type: Number,
    default: null
  }
})

// 响应式数据
const selectedCompany = ref(null)
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(props.limit)

// 计算属性
const displayedFeeds = computed(() => {
  let filtered = props.feeds
  
  if (selectedCompany.value) {
    filtered = filtered.filter(feed => feed.company_id === selectedCompany.value)
  }
  
  return filtered.slice(0, currentPage.value * pageSize.value)
})

const hasMore = computed(() => {
  const totalFiltered = selectedCompany.value 
    ? props.feeds.filter(feed => feed.company_id === selectedCompany.value).length
    : props.feeds.length
  return displayedFeeds.value.length < totalFiltered
})

const companyOptions = computed(() => {
  const companies = [...new Set(props.feeds.map(feed => ({
    id: feed.company_id,
    name: feed.company_name
  })).filter(c => c.name))]
  
  return [
    { label: '全部公司', value: null },
    ...companies.map(company => ({
      label: company.name,
      value: company.id
    }))
  ]
})

// 方法
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return '1天前'
  if (diffDays < 7) return `${diffDays}天前`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)}周前`
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)}个月前`
  return `${Math.ceil(diffDays / 365)}年前`
}

const shareArticle = (feed) => {
  if (navigator.share && feed.source_url) {
    navigator.share({
      title: feed.title,
      text: feed.summary,
      url: feed.source_url
    })
  } else if (feed.source_url) {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(feed.source_url)
    // TODO: 显示提示消息
  }
}

const loadMore = () => {
  currentPage.value++
}

const refreshFeeds = () => {
  // 触发父组件刷新数据
  emit('refresh')
}

// 重置分页当筛选条件改变时
watch(selectedCompany, () => {
  currentPage.value = 1
})

const emit = defineEmits(['refresh'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>