-- 删除现有表（如果存在）
DROP TABLE IF EXISTS news_feeds CASCADE;
DROP TABLE IF EXISTS navigation_links CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 创建导航分类表
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    description TEXT,
    icon VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建公司信息表
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    logo_url TEXT,
    website_url TEXT NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    founded_year INTEGER,
    headquarters VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建导航链接表
CREATE TABLE navigation_links (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建信息流表
CREATE TABLE news_feeds (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    summary TEXT,
    source_url TEXT,
    published_at TIMESTAMP,
    image_url TEXT,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_companies_category ON companies(category_id);
CREATE INDEX idx_navigation_links_company ON navigation_links(company_id);
CREATE INDEX idx_news_feeds_company ON news_feeds(company_id);
CREATE INDEX idx_news_feeds_published ON news_feeds(published_at DESC);