export interface Company {
  id: number;
  name: string;
  name_en?: string;
  logo_url?: string;
  website_url: string;
  description?: string;
  category_id?: number;
  founded_year?: number;
  headquarters?: string;
  created_at: Date;
  updated_at: Date;
  category?: Category;
  navigation_links?: NavigationLink[];
  news_feeds?: NewsFeed[];
}

export interface Category {
  id: number;
  name: string;
  name_en?: string;
  description?: string;
  icon?: string;
  sort_order: number;
  created_at: Date;
}

export interface NavigationLink {
  id: number;
  company_id: number;
  title: string;
  url: string;
  description?: string;
  is_primary: boolean;
  sort_order: number;
  created_at: Date;
}

export interface NewsFeed {
  id: number;
  company_id: number;
  title: string;
  content?: string;
  summary?: string;
  source_url?: string;
  published_at?: Date;
  image_url?: string;
  tags?: string[];
  created_at: Date;
}