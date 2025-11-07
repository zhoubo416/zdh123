import { sql } from '@vercel/postgres';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  
  try {
    switch (method) {
      case 'GET':
        return await getNews();
      case 'POST':
        const body = await readBody(event);
        return await createNews(body);
      case 'PUT':
        const updateBody = await readBody(event);
        return await updateNews(updateBody);
      case 'DELETE':
        const deleteBody = await readBody(event);
        return await deleteNews(deleteBody.id);
      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method Not Allowed'
        });
    }
  } catch (error) {
    console.error('News API error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

async function getNews() {
  const result = await sql`
    SELECT n.*, c.name as company_name
    FROM news_feeds n
    LEFT JOIN companies c ON n.company_id = c.id
    ORDER BY n.published_at DESC
  `;
  
  return {
    success: true,
    data: result.rows
  };
}

async function createNews(data) {
  const { 
    company_id, title, content, summary, source_url, 
    published_at, image_url, tags 
  } = data;
  
  // 处理标签
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
  
  const result = await sql`
    INSERT INTO news_feeds (
      company_id, title, content, summary, source_url, 
      published_at, image_url, tags
    )
    VALUES (
      ${company_id}, ${title}, ${content}, ${summary}, ${source_url},
      ${published_at || null}, ${image_url}, ${tagsArray}
    )
    RETURNING *
  `;
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function updateNews(data) {
  const { 
    id, company_id, title, content, summary, source_url, 
    published_at, image_url, tags 
  } = data;
  
  // 处理标签
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
  
  const result = await sql`
    UPDATE news_feeds 
    SET company_id = ${company_id}, title = ${title}, content = ${content},
        summary = ${summary}, source_url = ${source_url},
        published_at = ${published_at || null}, image_url = ${image_url},
        tags = ${tagsArray}
    WHERE id = ${id}
    RETURNING *
  `;
  
  return {
    success: true,
    data: result.rows[0]
  };
}

async function deleteNews(id) {
  await sql`DELETE FROM news_feeds WHERE id = ${id}`;
  
  return {
    success: true,
    message: 'News deleted successfully'
  };
}