-- 创建公司分类关联表
CREATE TABLE IF NOT EXISTS company_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE(company_id, category_id)
);

-- 将现有的公司分类数据迁移到关联表
INSERT INTO company_categories (company_id, category_id)
SELECT id, category_id 
FROM companies 
WHERE category_id IS NOT NULL;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_company_categories_company_id ON company_categories(company_id);
CREATE INDEX IF NOT EXISTS idx_company_categories_category_id ON company_categories(category_id);