import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { seoConfig } from "./src/config/seo";

/**
 * Vite Plugin: HTML SEO Injection
 * Replaces SEO placeholders in index.html with values from seoConfig
 */
function htmlSeoPlugin() {
  return {
    name: "html-seo-injection",
    transformIndexHtml(html: string) {
      // Map of placeholders and their values
      const seoReplacements: Record<string, string> = {
        "%%SEO_DESCRIPTION%%": seoConfig.description,
        "%%SEO_KEYWORDS%%": seoConfig.keywords,
        "%%SEO_AUTHOR%%": seoConfig.author,
        "%%SEO_PAGE_TITLE%%": seoConfig.pageTitle,
        "%%OG_URL%%": seoConfig.siteUrl,
        "%%OG_TITLE%%": seoConfig.ogTitle,
        "%%OG_DESCRIPTION%%": seoConfig.ogDescription,
        "%%OG_IMAGE%%": seoConfig.ogImage,
        "%%OG_TYPE%%": seoConfig.ogType,
        "%%OG_LOCALE%%": seoConfig.language,
        "%%TWITTER_TITLE%%": seoConfig.twitterTitle,
        "%%TWITTER_DESCRIPTION%%": seoConfig.twitterDescription,
        "%%TWITTER_CARD%%": seoConfig.twitterCard,
        "%%CANONICAL_URL%%": seoConfig.siteUrl,
        "%%GEO_PLACENAME%%": seoConfig.geoPlaceName,
        "%%GEO_REGION%%": seoConfig.geoRegion,
        "%%GEO_POSITION%%": `${seoConfig.geoLatitude};${seoConfig.geoLongitude}`,
        "%%GEO_COORDINATES%%": `${seoConfig.geoLatitude}, ${seoConfig.geoLongitude}`,
        "%%ORG_NAME%%": seoConfig.organizationName,
        "%%ORG_ADDRESS_STREET%%": seoConfig.address.streetAddress,
        "%%ORG_ADDRESS_LOCALITY%%": seoConfig.address.locality,
        "%%ORG_ADDRESS_REGION%%": seoConfig.address.region,
        "%%ORG_ADDRESS_POSTAL%%": seoConfig.address.postalCode,
        "%%ORG_ADDRESS_COUNTRY%%": seoConfig.address.country,
        "%%ORG_TELEPHONE%%": seoConfig.telephone,
        "%%ORG_GEO_LAT%%": seoConfig.geoLatitude,
        "%%ORG_GEO_LON%%": seoConfig.geoLongitude,
        "%%BUSINESS_TYPE%%": seoConfig.businessType,
        "%%ADDITIONAL_TYPE%%": seoConfig.additionalType,
        "%%PRICE_RANGE%%": seoConfig.priceRange,
        "%%KNOWS_ABOUT%%": JSON.stringify(seoConfig.knowsAbout),
        "%%OPENING_HOURS_JSON%%": JSON.stringify(seoConfig.operatingHours),
      };

      // Replace all placeholders
      let transformed = html;
      for (const [placeholder, value] of Object.entries(seoReplacements)) {
        transformed = transformed.replace(new RegExp(placeholder, "g"), value);
      }

      return transformed;
    },
  };
}

export default defineConfig({
  plugins: [vue(), htmlSeoPlugin()],
});
