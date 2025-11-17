import { sql } from '@vercel/postgres';
import { defineEventHandler, getQuery } from 'h3';
export default defineEventHandler(async (event) => {
  try {
    const queryParams = getQuery(event)
    const categoryId = queryParams.category ? parseInt(queryParams.category as string) : null
    
    let result
    if (categoryId) {
      result = await sql`
        SELECT 
          c.*,
          ARRAY_AGG(DISTINCT cat.name) FILTER (WHERE cat.name IS NOT NULL) as category_names,
          ARRAY_AGG(DISTINCT cat.id) FILTER (WHERE cat.id IS NOT NULL) as category_ids,
          ARRAY_AGG(cat.icon) FILTER (WHERE cat.icon IS NOT NULL) as category_icons,
          ARRAY_AGG(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as supplier_names,
          ARRAY_AGG(DISTINCT s.id) FILTER (WHERE s.id IS NOT NULL) as supplier_ids
        FROM companies c
        LEFT JOIN company_categories cc ON c.id = cc.company_id
        LEFT JOIN categories cat ON cc.category_id = cat.id
        LEFT JOIN company_suppliers cs ON c.id = cs.company_id
        LEFT JOIN suppliers s ON cs.supplier_id = s.id
        WHERE cc.category_id = ${categoryId}
        GROUP BY c.id
        ORDER BY c.name
      `;
    } else {
      result = await sql`
        SELECT 
          c.*,
          ARRAY_AGG(DISTINCT cat.name) FILTER (WHERE cat.name IS NOT NULL) as category_names,
          ARRAY_AGG(DISTINCT cat.id) FILTER (WHERE cat.id IS NOT NULL) as category_ids,
          ARRAY_AGG(cat.icon) FILTER (WHERE cat.icon IS NOT NULL) as category_icons,
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