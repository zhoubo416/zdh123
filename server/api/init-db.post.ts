import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { defineEventHandler } from 'h3';
export default defineEventHandler(async (event) => {
  try {
    // 读取并执行数据库架构
    const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
    const sampleDataPath = path.join(process.cwd(), 'database', 'sample-data.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
      // 分割SQL语句并逐个执行
      const statements = schemaSQL.split(';').filter(stmt => stmt.trim());
      for (const statement of statements) {
        if (statement.trim()) {
          await sql.query(statement);
        }
      }
    }
    
    if (fs.existsSync(sampleDataPath)) {
      const sampleDataSQL = fs.readFileSync(sampleDataPath, 'utf8');
      // 分割SQL语句并逐个执行
      const statements = sampleDataSQL.split(';').filter(stmt => stmt.trim());
      for (const statement of statements) {
        if (statement.trim()) {
          await sql.query(statement);
        }
      }
    }
    
    return {
      success: true,
      message: 'Database initialized successfully'
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    return {
      success: false,
      error: error.message,
      message: 'Failed to initialize database'
    }
  }
})