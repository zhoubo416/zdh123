import { sql } from '@vercel/postgres';
import { defineEventHandler, getQuery } from 'h3';
export default defineEventHandler(async (event) => {
  try {
    const queryParams = getQuery(event)
    const limit = queryParams.limit ? parseInt(queryParams.limit as string) : 20
    const companyId = queryParams.company ? parseInt(queryParams.company as string) : null
    
    let result
    if (companyId) {
      result = await sql`
        SELECT * FROM news_feeds
        WHERE company_id = ${companyId}
        ORDER BY published_at DESC, created_at DESC
        LIMIT ${limit}
      `;
    } else {
      result = await sql`
        SELECT nf.*, c.name as company_name
        FROM news_feeds nf
        LEFT JOIN companies c ON nf.company_id = c.id
        ORDER BY nf.published_at DESC, nf.created_at DESC
        LIMIT ${limit}
      `;
    }
    
    return {
      success: true,
      data: result.rows
    }
  } catch (error) {
    console.error('Error fetching news feeds:', error)
    return {
      success: false,
      error: error.message,
      data: []
    }
  }
})