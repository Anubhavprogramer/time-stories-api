export function extractFullData(html) {
  const articleRegex = /<article[^>]*class="[^"]*?text-black-coffee[^"]*?"[^>]*>([\s\S]*?)<\/article>/gi;
  const articles = [...html.matchAll(articleRegex)];

  return articles.map((match) => {
    const articleHTML = match[1];

    const titleMatch = articleHTML.match(/<h3[^>]*><div>\s*<a[^>]*>\s*<span>(.*?)<\/span>/);
    const linkMatch = articleHTML.match(/<a[^>]*href="([^"]+)"/);

    return {
      title: titleMatch?.[1]?.trim() ?? null,
      link: linkMatch ? `https://time.com${linkMatch[1].trim()}` : null,
    };
  });
}
