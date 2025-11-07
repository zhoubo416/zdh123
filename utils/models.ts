import type { Company, Category, NavigationLink, NewsFeed } from '~/types';

export class CompanyModel {
  static async findAll(): Promise<Company[]> {
    const result = await query(`
      SELECT c.*, cat.name as category_name, cat.icon as category_icon
      FROM companies c
      LEFT JOIN categories cat ON c.category_id = cat.id
      ORDER BY c.name
    `);
    return result.rows;
  }

  static async findById(id: number): Promise<Company | null> {
    const result = await query(`
      SELECT c.*, cat.name as category_name, cat.icon as category_icon
      FROM companies c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.id = $1
    `, [id]);
    return result.rows[0] || null;
  }

  static async findByCategory(categoryId: number): Promise<Company[]> {
    const result = await query(`
      SELECT c.*, cat.name as category_name, cat.icon as category_icon
      FROM companies c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.category_id = $1
      ORDER BY c.name
    `, [categoryId]);
    return result.rows;
  }

  static async create(company: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company> {
    const result = await query(`
      INSERT INTO companies (name, name_en, logo_url, website_url, description, category_id, founded_year, headquarters)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [company.name, company.name_en, company.logo_url, company.website_url, company.description, company.category_id, company.founded_year, company.headquarters]);
    return result.rows[0];
  }
}

export class CategoryModel {
  static async findAll(): Promise<Category[]> {
    const result = await query(`
      SELECT * FROM categories
      ORDER BY sort_order, name
    `);
    return result.rows;
  }

  static async findById(id: number): Promise<Category | null> {
    const result = await query(`
      SELECT * FROM categories WHERE id = $1
    `, [id]);
    return result.rows[0] || null;
  }
}

export class NavigationLinkModel {
  static async findByCompanyId(companyId: number): Promise<NavigationLink[]> {
    const result = await query(`
      SELECT * FROM navigation_links
      WHERE company_id = $1
      ORDER BY sort_order, title
    `, [companyId]);
    return result.rows;
  }

  static async create(link: Omit<NavigationLink, 'id' | 'created_at'>): Promise<NavigationLink> {
    const result = await query(`
      INSERT INTO navigation_links (company_id, title, url, description, is_primary, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [link.company_id, link.title, link.url, link.description, link.is_primary, link.sort_order]);
    return result.rows[0];
  }
}

export class NewsFeedModel {
  static async findAll(limit: number = 20): Promise<NewsFeed[]> {
    const result = await query(`
      SELECT nf.*, c.name as company_name
      FROM news_feeds nf
      LEFT JOIN companies c ON nf.company_id = c.id
      ORDER BY nf.published_at DESC, nf.created_at DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  }

  static async findByCompanyId(companyId: number, limit: number = 10): Promise<NewsFeed[]> {
    const result = await query(`
      SELECT * FROM news_feeds
      WHERE company_id = $1
      ORDER BY published_at DESC, created_at DESC
      LIMIT $2
    `, [companyId, limit]);
    return result.rows;
  }

  static async create(feed: Omit<NewsFeed, 'id' | 'created_at'>): Promise<NewsFeed> {
    const result = await query(`
      INSERT INTO news_feeds (company_id, title, content, summary, source_url, published_at, image_url, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [feed.company_id, feed.title, feed.content, feed.summary, feed.source_url, feed.published_at, feed.image_url, feed.tags]);
    return result.rows[0];
  }
}