<template>
  <div class="supplier-card group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <!-- 供应商头部信息 -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Icon name="heroicons:truck" class="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {{ supplier.name }}
          </h3>
          <p v-if="supplier.contact_person" class="text-sm text-gray-500">
            联系人：{{ supplier.contact_person }}
          </p>
        </div>
      </div>
    </div>

    <!-- 联系信息 -->
    <div class="space-y-2 mb-4">
      <div v-if="supplier.phone" class="flex items-center text-sm text-gray-600">
        <Icon name="heroicons:phone" class="w-4 h-4 mr-2 text-gray-400" />
        {{ supplier.phone }}
      </div>
      <div v-if="supplier.email" class="flex items-center text-sm text-gray-600">
        <Icon name="heroicons:envelope" class="w-4 h-4 mr-2 text-gray-400" />
        {{ supplier.email }}
      </div>
      <div v-if="supplier.address" class="flex items-center text-sm text-gray-600">
        <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2 text-gray-400" />
        {{ supplier.address }}
      </div>
    </div>

    <!-- 关联公司 -->
    <div v-if="supplier.company_names && supplier.company_names.length > 0" class="mb-4">
      <div class="flex items-center mb-2">
        <Icon name="heroicons:building-office" class="w-4 h-4 text-blue-600 mr-2" />
        <span class="text-sm font-medium text-gray-700">服务公司</span>
      </div>
      <div class="flex flex-wrap gap-1">
        <span 
          v-for="companyName in supplier.company_names" 
          :key="companyName"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
          :title="`服务公司: ${companyName}`"
        >
          <Icon name="heroicons:building-office-2" class="w-3 h-3 mr-1" />
          {{ companyName }}
        </span>
      </div>
    </div>

    <!-- 供应商描述 -->
    <p v-if="supplier.description" class="text-sm text-gray-600 mb-4 line-clamp-2">
      {{ supplier.description }}
    </p>

    <!-- 底部操作 -->
    <div class="flex items-center justify-between pt-4 border-t">
      <div class="flex items-center space-x-2">
        <UButton 
          v-if="supplier.website_url" 
          variant="ghost" 
          size="xs" 
          :to="supplier.website_url"
          target="_blank"
        >
          <Icon name="heroicons:globe-alt" class="w-4 h-4 text-gray-400" />
        </UButton>
        <UButton variant="ghost" size="xs" @click="contactSupplier">
          <Icon name="heroicons:chat-bubble-left" class="w-4 h-4 text-gray-400" />
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
  supplier: {
    type: Object,
    required: true
  }
})

// 方法
const contactSupplier = () => {
  if (props.supplier.phone) {
    window.open(`tel:${props.supplier.phone}`)
  } else if (props.supplier.email) {
    window.open(`mailto:${props.supplier.email}`)
  }
}

const viewDetails = () => {
  navigateTo(`/supplier/${props.supplier.id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>