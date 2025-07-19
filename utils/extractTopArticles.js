export function extractTopArticles(html) {
  const articleRegex = /<article[^>]*class="[^"]*?text-black-coffee[^"]*?"[^>]*>([\s\S]*?)<\/article>/gi;
  const matches = [...html.matchAll(articleRegex)];

  return matches.slice(0, 6).map((match) => {
    const block = match[1];
    const titleMatch = block.match(/<h3[^>]*><div>\s*<a[^>]*>\s*<span>(.*?)<\/span>/);
    const linkMatch = block.match(/<a[^>]*href="([^"]+)"/);

    return {
      title: titleMatch?.[1]?.trim() ?? null,
      link: linkMatch ? `https://time.com${linkMatch[1].trim()}` : null,
    };
  });
}