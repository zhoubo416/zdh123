import { sql } from '@vercel/postgres';
import { defineEventHandler, getQuery } from 'h3';
export default defineEventHandler(async (event) => {
  try {
    const queryParams = getQuery(event)
    const categoryId = queryParams.category ? parseInt(queryParams.category as string) : null
    
    let result
    if (categoryId) {
      result = await sql`
        SELECT c.*, cat.name as category_name, cat.icon as category_icon
        FROM companies c
        LEFT JOIN categories cat ON c.category_id = cat.id
        WHERE c.category_id = ${categoryId}
        ORDER BY c.name
      `;
    } else {
      result = await sql`
        SELECT c.*, cat.name as category_name, cat.icon as category_icon
        FROM companies c
        LEFT JOIN categories cat ON c.category_id = cat.id
        ORDER BY c.name
      `;
    }
    
    return {
      success: true,
      data: result.rows
    }
  } catch (error) {
    console.error('Error fetching companies:', error)
    return {
      success: false,
      error: error.message,
      data: []
    }
  }
})