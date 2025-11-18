import { sql } from '@vercel/postgres'
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  try {
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
  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      error: error.message,
      data: []
    }
  }
})