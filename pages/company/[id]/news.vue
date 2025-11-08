<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 公司新闻内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面头部 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="https://www.invt.com.cn/favicon.ico"
                alt="英威腾"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">英威腾</h1>
              <p class="text-lg text-gray-600">Invt</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Icon name="heroicons:cpu-chip" class="w-4 h-4 mr-1" />
                  变频器
                </span>
                <a
                  href="https://www.invt.com.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Icon name="heroicons:globe-alt" class="w-4 h-4 mr-1" />
                  官方网站
                  <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <UButton @click="goBack" variant="outline">
              <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
              返回公司详情
            </UButton>
            <UButton @click="goToCompany" variant="outline">
              <Icon name="heroicons:building-office" class="w-4 h-4 mr-2" />
              公司主页
            </UButton>
          </div>
        </div>
      </div>

      <!-- 新闻列表 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">相关新闻</h2>
          <div class="text-sm text-gray-500">
            共 1 条新闻
          </div>
        </div>

        <!-- 新闻列表 -->
        <div class="space-y-6">
          <div class="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  英威腾发布新一代高性能变频器GD350系列
                </h3>
                
                <div class="text-gray-600 mb-4 leading-relaxed">
                  英威腾推出GD350系列变频器，具备更高的控制精度和更强的环境适应性
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>2024年3月1日</span>
                    <div class="flex items-center space-x-1">
                      <span class="px-2 py-1 bg-gray-100 rounded text-xs">变频器</span>
                      <span class="px-2 py-1 bg-gray-100 rounded text-xs">新产品</span>
                      <span class="px-2 py-1 bg-gray-100 rounded text-xs">技术创新</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <UButton
                      href="https://www.invt.com.cn/news/company/2024/0301.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      size="sm"
                    >
                      <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
                      原文链接
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 新闻内容 -->
            <div class="mt-4 pt-4 border-t border-gray-200">
              <p class="text-gray-700 text-sm leading-relaxed line-clamp-3">
                英威腾正式发布GD350系列高性能变频器，该系列产品采用先进的矢量控制技术...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// 页面元数据
useHead({
  title: '公司新闻 - 工控导航',
  meta: [
    { name: 'description', content: '查看工控企业相关新闻动态' }
  ]
})

// 方法
const goBack = () => {
  router.back()
}

const goToCompany = () => {
  navigateTo(`/company/${route.params.id}`)
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>