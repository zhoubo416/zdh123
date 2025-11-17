// 供应商相关方法
const openSupplierModal = (supplier = null) => {
  editingSupplier.value = supplier
  if (supplier) {
    supplierForm.value = { ...supplier }
  } else {
    supplierForm.value = {
      name: '',
      contact_person: '',
      phone: '',
      email: '',
      address: '',
      website_url: '',
      description: ''
    }
  }
  supplierModalOpen.value = true
}

const saveSupplier = async () => {
  try {
    saving.value = true
    const method = editingSupplier.value ? 'PUT' : 'POST'
    const data = editingSupplier.value 
      ? { ...supplierForm.value, id: editingSupplier.value.id }
      : supplierForm.value
    
    await $fetch('/api/admin/suppliers', {
      method,
      body: data
    })
    
    supplierModalOpen.value = false
    await loadData()
  } catch (error) {
    console.error('Failed to save supplier:', error)
    alert('保存失败：' + error.message)
  } finally {
    saving.value = false
  }
}

const deleteSupplier = async (id) => {
  if (confirm('确定要删除这个供应商吗？')) {
    try {
      await $fetch('/api/admin/suppliers', {
        method: 'DELETE',
        body: { id }
      })
      await loadData()
    } catch (error) {
      console.error('Failed to delete supplier:', error)
      alert('删除失败：' + error.message)
    }
  }
}