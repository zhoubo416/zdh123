<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">公司新闻 - 简化版</h1>
        
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-gray-400">🏢</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold">英威腾</h2>
              <p class="text-gray-600">变频器</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <button @click="goBack" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              返回
            </button>
          </div>
        </div>
        
        <div class="border-t pt-6">
          <h3 class="text-lg font-semibold mb-4">相关新闻</h3>
          
          <div class="space-y-4">
            <div class="border rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">英威腾发布新一代高性能变频器GD350系列</h4>
              <p class="text-gray-600 text-sm mb-2">英威腾推出GD350系列变频器，具备更高的控制精度和更强的环境适应性</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>2024年3月1日</span>
                <span class="px-2 py-1 bg-gray-100 rounded text-xs">变频器</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  window.history.back()
}
</script>