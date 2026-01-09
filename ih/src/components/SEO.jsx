import { Helmet } from 'react-helmet-async';

export default function SEO({
    title,
    description,
    keywords,
    type = "website",
    image = "/og-image.jpg",
    url,
    schema = null,
    noindex = false
}) {
    const siteName = "Infinity Helios";
    const defaultTitle = "Infinity Helios | Advanced Solar Solutions";
    const defaultDesc = "Leading provider of high-efficiency solar panels, inverters, and renewable energy systems for residential and industrial use.";
    const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;

    // Safety check for window object in case of SSR (though this is Client Side React)
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const domain = "https://infinityhelios.com"; // Replace with actual domain

    // Base Schema for Organization
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Infinity Helios",
        "url": domain,
        "logo": `${domain}/logo.png`,
        "sameAs": [
            "https://facebook.com/infinityhelios",
            "https://twitter.com/infinityhelios",
            "https://instagram.com/infinityhelios"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9876543210",
            "contactType": "customer service",
            "areaServed": "IN"
        }
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || "solar, energy, renewable, panels, inverter, green energy, India, solar solution, rooftop solar"} />
            <link rel="canonical" href={currentUrl} />

            {/* Robots */}
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:image" content={image.startsWith('http') ? image : `${domain}${image}`} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@infinityhelios" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDesc} />
            <meta name="twitter:image" content={image.startsWith('http') ? image : `${domain}${image}`} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(schema || organizationSchema)}
            </script>
        </Helmet>
    );
}
