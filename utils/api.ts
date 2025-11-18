// 服务端数据库工具函数
export async function fetchCategories() {
  try {
    const response = await $fetch('/api/categories')
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function fetchCompanies(categoryId?: number) {
  try {
    const url = categoryId ? `/api/companies?category=${categoryId}` : '/api/companies'
    const response = await $fetch(url)
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch companies:', error)
    return []
  }
}

export async function fetchNews(limit: number = 20, companyId?: number) {
  try {
    let url = `/api/news?limit=${limit}`
    if (companyId) {
      url += `&company=${companyId}`
    }
    const response = await $fetch(url)
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return []
  }
}

export async function fetchSuppliers() {
  try {
    const response = await $fetch('/api/suppliers')
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch suppliers:', error)
    return []
  }
}

export async function fetchNavigationLinks(companyId: number) {
  try {
    const response = await $fetch(`/api/companies/${companyId}/links`)
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch navigation links:', error)
    return []
  }
}