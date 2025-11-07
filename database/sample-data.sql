-- 插入工控行业公司数据

-- 首先确保分类数据存在
INSERT INTO categories (name, name_en, description, icon, sort_order) VALUES
('变频器', 'Inverters', '工业变频器制造商', 'cpu-chip', 1),
('伺服系统', 'Servo Systems', '伺服电机和驱动器制造商', 'cog-6-tooth', 2),
('PLC控制器', 'PLC Controllers', '可编程逻辑控制器制造商', 'computer-desktop', 3),
('工业机器人', 'Industrial Robots', '工业机器人制造商', 'wrench-screwdriver', 4),
('传感器', 'Sensors', '工业传感器制造商', 'signal', 5),
('工业软件', 'Industrial Software', '工业自动化软件开发商', 'code-bracket', 6)
ON CONFLICT (id) DO NOTHING;

-- 插入公司数据
INSERT INTO companies (name, name_en, logo_url, website_url, description, category_id, founded_year, headquarters) VALUES
-- 变频器厂商
('英威腾', 'Invt', 'https://www.invt.com.cn/favicon.ico', 'https://www.invt.com.cn', '专业的工业自动化与能效管理解决方案供应商，产品涵盖变频器、伺服、PLC等', 1, 2002, '深圳'),
('汇川技术', 'Inovance', 'https://www.inovance.com/favicon.ico', 'https://www.inovance.com', '工业自动化产品及解决方案供应商，专注于工业自动化控制产品的研发', 1, 2003, '苏州'),
('安川电机', 'Yaskawa', 'https://www.yaskawa.com.cn/favicon.ico', 'https://www.yaskawa.com.cn', '全球知名的工业自动化产品制造商，在变频器和伺服领域处于领先地位', 1, 1915, '日本'),
('ABB', 'ABB', 'https://new.abb.com/favicon.ico', 'https://new.abb.com/cn', '全球技术领导企业，致力于推动社会与行业转型，实现更高效、可持续的未来', 1, 1988, '瑞士'),

-- 伺服系统厂商
('台达', 'Delta', 'https://www.delta.com.cn/favicon.ico', 'https://www.delta.com.cn', '全球电源管理与散热解决方案的领导厂商，提供更安全、更清洁、更高效的能源解决方案', 2, 1971, '台湾'),
('松下', 'Panasonic', 'https://www.panasonic.cn/favicon.ico', 'https://www.panasonic.cn', '全球领先的电子产品制造商，在工业自动化领域提供高性能的伺服系统', 2, 1918, '日本'),
('三菱电机', 'Mitsubishi Electric', 'https://www.mitsubishielectric.com.cn/favicon.ico', 'https://www.mitsubishielectric.com.cn', '全球知名的综合性电机电子制造商，在工业自动化领域拥有丰富的产品线', 2, 1921, '日本'),

-- PLC控制器厂商
('西门子', 'Siemens', 'https://www.siemens.com.cn/favicon.ico', 'https://www.siemens.com.cn', '全球领先的技术企业，专注于工业、基础设施、交通和医疗等领域', 3, 1847, '德国'),
('欧姆龙', 'Omron', 'https://www.omron.com.cn/favicon.ico', 'https://www.omron.com.cn', '全球知名的自动化控制及电子设备制造厂商，致力于通过自动化技术贡献社会', 3, 1933, '日本'),
('施耐德电气', 'Schneider Electric', 'https://www.se.com/cn/favicon.ico', 'https://www.se.com/cn', '全球能效管理和自动化领域的专家，致力于为客户提供安全、可靠、高效的能源', 3, 1836, '法国'),

-- 工业机器人厂商
('库卡', 'KUKA', 'https://www.kuka.com/favicon.ico', 'https://www.kuka.com/zh-cn', '全球领先的智能自动化解决方案供应商，专注于工业机器人和自动化生产线', 4, 1898, '德国'),
('发那科', 'FANUC', 'https://www.fanuc.co.jp/favicon.ico', 'https://www.fanuc.co.jp/cn/zh', '全球工厂自动化、机器人和智能机械的领先制造商', 4, 1956, '日本'),
('埃斯顿', 'Estun', 'https://www.estun.com/favicon.ico', 'https://www.estun.com', '专业的工业机器人及智能制造系统解决方案供应商', 4, 1993, '南京'),

-- 传感器厂商
('基恩士', 'Keyence', 'https://www.keyence.com.cn/favicon.ico', 'https://www.keyence.com.cn', '全球领先的传感器、测量系统、激光标记机、显微镜及机器视觉系统的供应商', 5, 1974, '日本'),
('巴鲁夫', 'Balluff', 'https://www.balluff.com.cn/favicon.ico', 'https://www.balluff.com.cn', '全球领先的传感器技术专家，为工业自动化提供创新的传感器解决方案', 5, 1921, '德国'),

-- 工业软件厂商
('组态王', 'KingView', 'https://www.kingview.com/favicon.ico', 'https://www.kingview.com', '国内领先的工业自动化软件供应商，专注于工业软件和信息化解决方案', 6, 1995, '北京'),
('力控科技', 'ForceControl', 'https://www.forcecontrol.com.cn/favicon.ico', 'https://www.forcecontrol.com.cn', '专业的工业自动化软件产品供应商和解决方案提供商', 6, 1998, '北京')
ON CONFLICT DO NOTHING;

-- 插入导航链接数据
INSERT INTO navigation_links (company_id, title, url, description, is_primary, sort_order) VALUES
-- 英威腾导航链接
((SELECT id FROM companies WHERE name = '英威腾'), '产品中心', 'https://www.invt.com.cn/product', '查看英威腾全系列产品', false, 1),
((SELECT id FROM companies WHERE name = '英威腾'), '解决方案', 'https://www.invt.com.cn/solution', '行业解决方案', false, 2),
((SELECT id FROM companies WHERE name = '英威腾'), '技术支持', 'https://www.invt.com.cn/support', '技术文档和支持服务', false, 3),
((SELECT id FROM companies WHERE name = '英威腾'), '下载中心', 'https://www.invt.com.cn/download', '产品资料下载', false, 4),

-- 汇川技术导航链接
((SELECT id FROM companies WHERE name = '汇川技术'), '产品与服务', 'https://www.inovance.com/product', '汇川技术产品展示', false, 1),
((SELECT id FROM companies WHERE name = '汇川技术'), '行业应用', 'https://www.inovance.com/industry', '各行业应用案例', false, 2),
((SELECT id FROM companies WHERE name = '汇川技术'), '服务支持', 'https://www.inovance.com/service', '技术支持和服务', false, 3),
((SELECT id FROM companies WHERE name = '汇川技术'), '资料下载', 'https://www.inovance.com/download', '技术资料下载', false, 4),

-- 西门子导航链接
((SELECT id FROM companies WHERE name = '西门子'), '数字化工业', 'https://www.siemens.com.cn/digital-industries', '数字化工业解决方案', false, 1),
((SELECT id FROM companies WHERE name = '西门子'), '产品', 'https://www.siemens.com.cn/products', '西门子产品目录', false, 2),
((SELECT id FROM companies WHERE name = '西门子'), '行业', 'https://www.siemens.com.cn/industries', '行业解决方案', false, 3),
((SELECT id FROM companies WHERE name = '西门子'), '服务', 'https://www.siemens.com.cn/services', '服务与支持', false, 4),

-- ABB导航链接
((SELECT id FROM companies WHERE name = 'ABB'), '产品', 'https://new.abb.com/cn/products', 'ABB产品目录', false, 1),
((SELECT id FROM companies WHERE name = 'ABB'), '解决方案', 'https://new.abb.com/cn/solutions', '行业解决方案', false, 2),
((SELECT id FROM companies WHERE name = 'ABB'), '服务', 'https://new.abb.com/cn/service', '服务与支持', false, 3)
ON CONFLICT DO NOTHING;

-- 插入示例新闻数据
INSERT INTO news_feeds (company_id, title, content, summary, source_url, published_at, image_url, tags) VALUES
((SELECT id FROM companies WHERE name = '英威腾'), 
 '英威腾发布新一代高性能变频器GD350系列', 
 '英威腾正式发布GD350系列高性能变频器，该系列产品采用先进的矢量控制技术...', 
 '英威腾推出GD350系列变频器，具备更高的控制精度和更强的环境适应性', 
 'https://www.invt.com.cn/news/company/2024/0301.html', 
 '2024-03-01 10:00:00', 
 null, 
 ARRAY['变频器', '新产品', '技术创新']),

((SELECT id FROM companies WHERE name = '汇川技术'), 
 '汇川技术2024年度业绩说明会成功举办', 
 '汇川技术在深圳总部举办2024年度业绩说明会，公司管理层详细介绍了年度经营情况...', 
 '汇川技术举办年度业绩说明会，展示公司在工业自动化领域的发展成果', 
 'https://www.inovance.com/news/2024/0315.html', 
 '2024-03-15 14:30:00', 
 null, 
 ARRAY['业绩发布', '投资者关系', '企业动态']),

((SELECT id FROM companies WHERE name = '西门子'), 
 '西门子数字化工厂解决方案助力制造业转型升级', 
 '西门子推出全新的数字化工厂解决方案，通过数字化双胞胎技术帮助制造企业...', 
 '西门子发布数字化工厂解决方案，助力制造业实现数字化转型', 
 'https://www.siemens.com.cn/news/2024/0320.html', 
 '2024-03-20 09:15:00', 
 null, 
 ARRAY['数字化', '工业4.0', '解决方案']),

((SELECT id FROM companies WHERE name = 'ABB'), 
 'ABB机器人在新能源汽车制造中的应用案例', 
 'ABB工业机器人在某知名新能源汽车制造商的生产线上发挥重要作用...', 
 'ABB机器人助力新能源汽车制造，提升生产效率和产品质量', 
 'https://new.abb.com/cn/news/2024/0325.html', 
 '2024-03-25 16:45:00', 
 null, 
 ARRAY['工业机器人', '新能源汽车', '应用案例']),

((SELECT id FROM companies WHERE name = '台达'), 
 '台达工业自动化解决方案亮相工博会', 
 '台达携最新的工业自动化产品和解决方案亮相中国国际工业博览会...', 
 '台达在工博会展示工业自动化创新成果，获得业界广泛关注', 
 'https://www.delta.com.cn/news/2024/0410.html', 
 '2024-04-10 11:20:00', 
 null, 
 ARRAY['工博会', '展会', '工业自动化'])
ON CONFLICT DO NOTHING;