-- 创建供应商表
CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    website_url TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建公司供应商关联表（多对多关系）
CREATE TABLE IF NOT EXISTS company_suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    supplier_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    UNIQUE(company_id, supplier_id)
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_company_suppliers_company_id ON company_suppliers(company_id);
CREATE INDEX IF NOT EXISTS idx_company_suppliers_supplier_id ON company_suppliers(supplier_id);

-- 插入一些示例供应商数据
INSERT OR IGNORE INTO suppliers (name, contact_person, phone, email, address, description) VALUES
('西门子自动化有限公司', '张经理', '021-12345678', 'zhang@siemens.com', '上海市浦东新区', '提供工业自动化解决方案'),
('施耐德电气', '李总监', '010-87654321', 'li@schneider.com', '北京市朝阳区', '电气设备和自动化解决方案供应商'),
('ABB中国', '王主管', '0755-11223344', 'wang@abb.com', '深圳市南山区', '机器人和自动化技术供应商'),
('三菱电机', '陈工程师', '025-99887766', 'chen@mitsubishi.com', '南京市江宁区', '工业自动化产品供应商'),
('欧姆龙自动化', '刘经理', '028-55443322', 'liu@omron.com', '成都市高新区', '传感器和控制设备供应商');