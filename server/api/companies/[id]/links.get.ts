import { sql } from '@vercel/postgres';
import { defineEventHandler, getRouterParam } from 'h3';
export default defineEventHandler(async (event) => {
  try {
    const companyId = parseInt(getRouterParam(event, 'id') as string)
    
    if (!companyId) {
      return {
        success: false,
        error: 'Invalid company ID',
        data: []
      }
    }
    
    const result = await sql`
      SELECT * FROM navigation_links
      WHERE company_id = ${companyId}
      ORDER BY sort_order, title
    `;
    
    return {
      success: true,
      data: result.rows
    }
  } catch (error) {
    console.error('Error fetching navigation links:', error)
    return {
      success: false,
      error: error.message,
      data: []
    }
  }
})