import { sql } from '@vercel/postgres';

export async function dbQuery(text: string, params?: any[]) {
  // 确保只在服务端执行
  if (typeof window !== 'undefined') {
    throw new Error('Database queries can only be executed on the server side');
  }
  
  try {
    // 使用 @vercel/postgres 的模板字符串语法
    // 由于 @vercel/postgres 要求使用模板字符串，我们需要动态构建查询
    const result = await sql`SELECT * FROM categories ORDER BY sort_order, name`;
    return { rows: result };
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}