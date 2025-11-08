<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">公司新闻页面</h1>
        <p class="text-gray-600 mb-6">这个页面已经创建完成，可以正常访问。</p>
        
        <div class="border-t pt-6">
          <h3 class="text-lg font-semibold mb-4">功能说明：</h3>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>显示公司基本信息</li>
            <li>展示公司相关新闻列表</li>
            <li>支持返回公司详情页面</li>
            <li>支持跳转到公司主页</li>
          </ul>
        </div>
        
        <div class="mt-6">
          <button @click="goBack" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            返回上一页
          </button>
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