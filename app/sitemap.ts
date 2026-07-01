import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { const base='https://newmb.chat'; return ['','/about','/privacy','/terms'].map(p=>({url:base+p,lastModified:new Date()})); }
