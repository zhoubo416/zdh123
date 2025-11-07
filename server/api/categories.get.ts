import { sql } from '@vercel/postgres';
import { defineEventHandler } from 'h3';
export default defineEventHandler(async (event) => {
  try {
    const result = await sql`
      SELECT * FROM categories
      ORDER BY sort_order, name
    `;
    
    return {
      success: true,
      data: result.rows
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return {
      success: false,
      error: error.message,
      data: []
    }
  }
})