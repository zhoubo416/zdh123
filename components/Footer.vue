<template>
  <footer class="bg-black text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 左侧品牌区 -->
        <div class="col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-lg font-bold">工业导航</h3>
          </div>
          <p class="text-gray-400 text-sm mb-4">
            专业的工业自动化行业导航平台，连接企业、供应商与技术资源
          </p>
          <!-- 社交媒体图标 -->
          <div class="flex items-center space-x-3">
            <a href="#" class="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded flex items-center justify-center transition-colors">
              <Icon name="heroicons:chat-bubble-left-right" class="w-4 h-4" />
            </a>
            <a href="#" class="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded flex items-center justify-center transition-colors">
              <Icon name="heroicons:device-phone-mobile" class="w-4 h-4" />
            </a>
            <a href="#" class="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded flex items-center justify-center transition-colors">
              <Icon name="heroicons:envelope" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- 快速导航 -->
        <div class="col-span-1">
          <h4 class="font-semibold text-white mb-4">快速导航</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-orange-500 transition-colors">
                行业分类
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/companies" class="text-gray-400 hover:text-orange-500 transition-colors">
                企业目录
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/suppliers" class="text-gray-400 hover:text-orange-500 transition-colors">
                供应商平台
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/news" class="text-gray-400 hover:text-orange-500 transition-colors">
                行业资讯
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tech" class="text-gray-400 hover:text-orange-500 transition-colors">
                技术文档
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 服务支持 -->
        <div class="col-span-1">
          <h4 class="font-semibold text-white mb-4">服务支持</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/register" class="text-gray-400 hover:text-orange-500 transition-colors">
                企业入驻
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/advertise" class="text-gray-400 hover:text-orange-500 transition-colors">
                广告合作
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/research" class="text-gray-400 hover:text-orange-500 transition-colors">
                研讨中心
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/help" class="text-gray-400 hover:text-orange-500 transition-colors">
                用户协议
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-gray-400 hover:text-orange-500 transition-colors">
                隐私政策
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 联系我们 -->
        <div class="col-span-1">
          <h4 class="font-semibold text-white mb-4">联系我们</h4>
          <ul class="space-y-3 text-sm">
            <li class="flex items-center space-x-2 text-gray-400">
              <Icon name="heroicons:envelope" class="w-4 h-4 text-orange-500" />
              <a href="mailto:contact@industrial-nav.com" class="hover:text-orange-500 transition-colors">
                contact@industrial-nav.com
              </a>
            </li>
            <li class="flex items-center space-x-2 text-gray-400">
              <Icon name="heroicons:phone" class="w-4 h-4 text-orange-500" />
              <a href="tel:400-888-9999" class="hover:text-orange-500 transition-colors">
                400-888-9999
              </a>
            </li>
            <li class="flex items-center space-x-2 text-gray-400">
              <Icon name="heroicons:map-pin" class="w-4 h-4 text-orange-500" />
              <span>上海市浦东新区江镇1号科技园区</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <p class="text-center text-gray-400 text-sm">
          © 2025 工业自动化导航平台. 保留所有权利
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer 组件无需额外逻辑
</script>
