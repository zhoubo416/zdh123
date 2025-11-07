import { sql } from '@vercel/postgres';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  
  try {
    switch (method) {
      case 'GET':
        return await getCategories();
      case 'POST':
        const body = await readBody(event);
        return await createCategory(body);
      case 'PUT':
        const updateBody = await readBody(event);
        return await updateCategory(updateBody);
      case 'DELETE':
        const deleteBody = await readBody(event);
        return await deleteCategory(deleteBody.id);
      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method Not Allowed'
        });
    }
  } catch (error) {
    console.error('Categories API error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

async function getCategories() {
  const result = await sql`
    SELECT * FROM categories 
    ORDER BY sort_order, id
  `;
  
  return {
    success: true,
    data: result.rows
  };
}

async function createCategory(data) {
  const { name, name_en, description, icon, sort_order = 0 } = data;
  
  const result = await sql`
    INSERT INTO categories (name, name_en, description, icon, sort_order)
    VALUES (${name}, ${name_en}, ${description}, ${icon}, ${sort_order})
    RETURNING *
  `;
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function updateCategory(data) {
  const { id, name, name_en, description, icon, sort_order } = data;
  
  const result = await sql`
    UPDATE categories 
    SET name = ${name}, name_en = ${name_en}, description = ${description}, 
        icon = ${icon}, sort_order = ${sort_order}
    WHERE id = ${id}
    RETURNING *
  `;
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function deleteCategory(id) {
  await sql`DELETE FROM categories WHERE id = ${id}`;
  
  return {
    success: true,
    message: 'Category deleted successfully'
  };
}