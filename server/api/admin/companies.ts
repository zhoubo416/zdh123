import { sql } from '@vercel/postgres';
import { defineEventHandler, readBody } from 'h3';

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
    SELECT c.*, cat.name as category_name, cat.icon as category_icon
    FROM companies c
    LEFT JOIN categories cat ON c.category_id = cat.id
    ORDER BY c.name
  `;
  
  return {
    success: true,
    data: result.rows
  };
}

async function createCompany(data) {
  const { 
    name, name_en, category_id, website_url, logo_url, 
    founded_year, headquarters, description 
  } = data;
  
  const result = await sql`
    INSERT INTO companies (
      name, name_en, category_id, website_url, logo_url, 
      founded_year, headquarters, description, updated_at
    )
    VALUES (
      ${name}, ${name_en}, ${category_id}, ${website_url}, ${logo_url},
      ${founded_year}, ${headquarters}, ${description}, CURRENT_TIMESTAMP
    )
    RETURNING *
  `;
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function updateCompany(data) {
  const { 
    id, name, name_en, category_id, website_url, logo_url, 
    founded_year, headquarters, description 
  } = data;
  
  const result = await sql`
    UPDATE companies 
    SET name = ${name}, name_en = ${name_en}, category_id = ${category_id},
        website_url = ${website_url}, logo_url = ${logo_url},
        founded_year = ${founded_year}, headquarters = ${headquarters},
        description = ${description}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function deleteCompany(id) {
  await sql`DELETE FROM companies WHERE id = ${id}`;
  
  return {
    success: true,
    message: 'Company deleted successfully'
  };
}