import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    type?: string;
    url?: string;
    [key: string]: any; // لتقبل خصائص إضافية
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, type, url, ...rest }) => (
    <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {type && <meta property="og:type" content={type} />}
        {url && <meta property="og:url" content={url} />}
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* أي خصائص إضافية يمكن تمريرها كـ meta */}
        {Object.entries(rest).map(([key, value]) => (
            <meta key={key} name={key} content={value} />
        ))}
    </Helmet>
);

export default SEO;
