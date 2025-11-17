import { sql } from '@vercel/postgres';
import { defineEventHandler, readBody, getMethod, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  
  try {
    switch (method) {
      case 'GET':
        return await getSuppliers();
      case 'POST':
        const body = await readBody(event);
        return await createSupplier(body);
      case 'PUT':
        const updateBody = await readBody(event);
        return await updateSupplier(updateBody);
      case 'DELETE':
        const deleteBody = await readBody(event);
        return await deleteSupplier(deleteBody.id);
      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method Not Allowed'
        });
    }
  } catch (error) {
    console.error('Suppliers API error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

async function getSuppliers() {
  const result = await sql`
    SELECT 
      s.*,
      ARRAY_AGG(c.name) FILTER (WHERE c.name IS NOT NULL) as company_names,
      ARRAY_AGG(c.id) FILTER (WHERE c.id IS NOT NULL) as company_ids
    FROM suppliers s
    LEFT JOIN company_suppliers cs ON s.id = cs.supplier_id
    LEFT JOIN companies c ON cs.company_id = c.id
    GROUP BY s.id
    ORDER BY s.name
  `;
  
  return {
    success: true,
    data: result.rows
  };
}

async function createSupplier(data) {
  const { 
    name, contact_person, phone, email, address, website_url, description, company_ids
  } = data;
  
  // 创建供应商记录
  const result = await sql`
    INSERT INTO suppliers (
      name, contact_person, phone, email, address, website_url, description, updated_at
    )
    VALUES (
      ${name}, ${contact_person}, ${phone}, ${email}, ${address}, ${website_url}, ${description}, CURRENT_TIMESTAMP
    )
    RETURNING *
  `;
  
  const supplier = result.rows[0];
  
  // 如果有公司ID，插入到关联表
  if (company_ids && company_ids.length > 0) {
    for (const companyId of company_ids) {
      await sql`
        INSERT INTO company_suppliers (company_id, supplier_id)
        VALUES (${companyId}, ${supplier.id})
      `;
    }
  }
  
  return {
    success: true,
    data: supplier
  };
}

async function updateSupplier(data) {
  const { 
    id, name, contact_person, phone, email, address, website_url, description, company_ids
  } = data;
  
  // 更新供应商基本信息
  const result = await sql`
    UPDATE suppliers 
    SET name = ${name}, contact_person = ${contact_person}, phone = ${phone},
        email = ${email}, address = ${address}, website_url = ${website_url},
        description = ${description}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  
  // 删除现有的公司关联
  await sql`DELETE FROM company_suppliers WHERE supplier_id = ${id}`;
  
  // 插入新的公司关联
  if (company_ids && company_ids.length > 0) {
    for (const companyId of company_ids) {
      await sql`
        INSERT INTO company_suppliers (company_id, supplier_id)
        VALUES (${companyId}, ${id})
      `;
    }
  }
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function deleteSupplier(id) {
  // 删除供应商公司关联（由于设置了CASCADE，会自动删除）
  await sql`DELETE FROM company_suppliers WHERE supplier_id = ${id}`;
  
  // 删除供应商记录
  await sql`DELETE FROM suppliers WHERE id = ${id}`;
  
  return {
    success: true,
    message: 'Supplier deleted successfully'
  };
}