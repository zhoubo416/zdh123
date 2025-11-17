import { sql } from '@vercel/postgres';
import { defineEventHandler, readBody, getMethod, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  
  try {
    switch (method) {
      case 'GET':
        return await getCompanies();
      case 'POST':
        const body = await readBody(event);
        return await createCompany(body);
      case 'PUT':
        const updateBody = await readBody(event);
        return await updateCompany(updateBody);
      case 'DELETE':
        const deleteBody = await readBody(event);
        return await deleteCompany(deleteBody.id);
      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method Not Allowed'
        });
    }
  } catch (error) {
    console.error('Companies API error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

async function getCompanies() {
  const result = await sql`
    SELECT 
      c.*,
      ARRAY_AGG(DISTINCT cat.name) FILTER (WHERE cat.name IS NOT NULL) as category_names,
      ARRAY_AGG(DISTINCT cat.id) FILTER (WHERE cat.id IS NOT NULL) as category_ids,
      ARRAY_AGG(DISTINCT cat.icon) FILTER (WHERE cat.icon IS NOT NULL) as category_icons,
      ARRAY_AGG(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as supplier_names,
      ARRAY_AGG(DISTINCT s.id) FILTER (WHERE s.id IS NOT NULL) as supplier_ids
    FROM companies c
    LEFT JOIN company_categories cc ON c.id = cc.company_id
    LEFT JOIN categories cat ON cc.category_id = cat.id
    LEFT JOIN company_suppliers cs ON c.id = cs.company_id
    LEFT JOIN suppliers s ON cs.supplier_id = s.id
    GROUP BY c.id
    ORDER BY c.name
  `;
  console.log(result.rows, 'result.rows')
  return {
    success: true,
    data: result.rows
  };
}

async function createCompany(data) {
  const { 
    name, name_en, category_ids, website_url, logo_url, founded_year, headquarters, description, supplier_ids
  } = data;
  
  // 创建公司记录
  const result = await sql`
    INSERT INTO companies (
      name, name_en, website_url, logo_url, founded_year, headquarters, description, updated_at
    )
    VALUES (
      ${name}, ${name_en}, ${website_url}, ${logo_url}, ${founded_year}, ${headquarters}, ${description}, CURRENT_TIMESTAMP
    )
    RETURNING *
  `;
  
  const company = result.rows[0];
  
  // 如果有分类ID，插入到关联表
  if (category_ids && category_ids.length > 0) {
    for (const categoryId of category_ids) {
      await sql`
        INSERT INTO company_categories (company_id, category_id)
        VALUES (${company.id}, ${categoryId})
      `;
    }
  }
  
  // 如果有供应商ID，插入到关联表
  if (supplier_ids && supplier_ids.length > 0) {
    for (const supplierId of supplier_ids) {
      await sql`
        INSERT INTO company_suppliers (company_id, supplier_id)
        VALUES (${company.id}, ${supplierId})
      `;
    }
  }
  
  return {
    success: true,
    data: company
  };
}

async function updateCompany(data) {
  const { 
    id, name, name_en, category_ids, website_url, logo_url, founded_year, headquarters, description, supplier_ids
  } = data;
  
  // 更新公司基本信息
  const result = await sql`
    UPDATE companies 
    SET name = ${name}, name_en = ${name_en}, website_url = ${website_url},
        logo_url = ${logo_url}, founded_year = ${founded_year}, headquarters = ${headquarters},
        description = ${description}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  
  // 删除现有的分类关联
  await sql`DELETE FROM company_categories WHERE company_id = ${id}`;
  
  // 插入新的分类关联
  if (category_ids && category_ids.length > 0) {
    for (const categoryId of category_ids) {
      await sql`
        INSERT INTO company_categories (company_id, category_id)
        VALUES (${id}, ${categoryId})
      `;
    }
  }
  
  // 删除现有的供应商关联
  await sql`DELETE FROM company_suppliers WHERE company_id = ${id}`;
  
  // 插入新的供应商关联
  if (supplier_ids && supplier_ids.length > 0) {
    for (const supplierId of supplier_ids) {
      await sql`
        INSERT INTO company_suppliers (company_id, supplier_id)
        VALUES (${id}, ${supplierId})
      `;
    }
  }
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function deleteCompany(id) {
  // 删除公司分类关联（由于设置了CASCADE，会自动删除）
  await sql`DELETE FROM company_categories WHERE company_id = ${id}`;
  
  // 删除公司记录
  await sql`DELETE FROM companies WHERE id = ${id}`;
  
  return {
    success: true,
    message: 'Company deleted successfully'
  };
}