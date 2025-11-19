<template>
  <div class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all p-6">
    <!-- 供应商名称和分类 -->
    <div class="mb-4">
      <h3 class="font-semibold text-lg text-gray-900 mb-2">{{ supplier.name }}</h3>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        综合供应商
      </span>
    </div>

    <!-- 评分 -->
    <div class="flex items-center mb-4">
      <div class="flex items-center space-x-1">
        <Icon v-for="i in 5" :key="i" 
          :name="i <= Math.floor(supplier.rating || 4.5) ? 'heroicons:star-solid' : 'heroicons:star'" 
          class="w-4 h-4"
          :class="i <= Math.floor(supplier.rating || 4.5) ? 'text-orange-500' : 'text-gray-300'"
        />
      </div>
      <span class="ml-2 text-sm text-gray-600">{{ supplier.rating || '4.5' }}</span>
      <span class="ml-1 text-sm text-gray-500">({{ supplier.review_count || '250' }} 评价)</span>
    </div>

    <!-- 服务特点 -->
    <div class="space-y-2 mb-6">
      <div class="flex items-center text-sm text-gray-700">
        <Icon name="heroicons:check-circle" class="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
        <span>质量保证</span>
      </div>
      <div class="flex items-center text-sm text-gray-700">
        <Icon name="heroicons:check-circle" class="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
        <span>技术支持</span>
      </div>
      <div class="flex items-center text-sm text-gray-700">
        <Icon name="heroicons:check-circle" class="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
        <span>24小时服务</span>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
      <div class="flex items-center text-sm text-gray-600">
        <Icon name="heroicons:clock" class="w-4 h-4 mr-1" />
        <span>24小时</span>
      </div>
      <UButton size="xs" color="orange">
        查看详情
        <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  supplier: {
    type: Object,
    required: true
  }
})
</script>