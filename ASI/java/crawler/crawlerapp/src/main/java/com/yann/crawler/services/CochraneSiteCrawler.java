package com.yann.crawler.services;

import java.io.IOException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.yann.crawler.interfaces.SiteCrawler;
import com.yann.crawler.models.Article;
import com.yann.crawler.models.Category;

import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class CochraneSiteCrawler implements SiteCrawler {
    private final String BASE_URL = "https://www.cochranelibrary.com/";
    private final String CATEGORY_URL = "cdsr/reviews/topics";
    private final String SEARCH_URL = "search?p_p_id=scolarissearchresultsportlet_WAR_scolarissearchresults&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchText=*&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchType=basic&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetQueryField=topic_id&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchBy=6&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetQueryTerm=z1506030924307755598196034641807&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetCategory=Topics&resultPerPage=100&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetDisplayName=%s&cur=%d";
    private final String USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36";

    public CochraneSiteCrawler() {
        // nothing to do
    }

    @Override
    public Category[] getCategories() throws IOException {
        Category[] categories = downloadCategories();

        return categories;
    }

    public Category[] downloadCategories() throws IOException {
        List<Category> categories = new ArrayList<Category>();

        Content content = Request.Get(BASE_URL + CATEGORY_URL).setHeader("user-agent", USER_AGENT).execute()
                .returnContent();

        Document doc = Jsoup.parse(content.toString());
        Elements categoryLinks = doc.select(".browse-by-list-item-link");
        for (int i = 0; i < categoryLinks.size(); i++) {
            Element categoryLink = categoryLinks.get(i);
            String url = categoryLink.parent() != null ? categoryLink.parent().attributes().get("href") : null;
            String name = categoryLink.text();
            if (name != null && !name.isEmpty() && url != null && !url.isEmpty()) {
                Category category = new Category(name, url);
                downloadArticles(category);
                categories.add(category);
            }
        }

        return categories.toArray(new Category[categories.size()]);
    }

    public void downloadArticles(Category category) throws IOException {
        SimpleDateFormat format = new SimpleDateFormat("dd MMM yyyy");
        int page = 1;
        String categoryName = category.getName();
        if (categoryName != null && !categoryName.isEmpty()) {
            categoryName = URLEncoder.encode(categoryName, "UTF-8");
            String pageRequest = String.format(BASE_URL + SEARCH_URL, categoryName, page);
            Content content = Request.Get(pageRequest).setHeader("user-agent", USER_AGENT).execute().returnContent();

            Document doc = Jsoup.parse(content.toString());
            Elements results = doc.select(".search-results-item-body");
            int resultsCount = results.size();
            while (resultsCount > 0) {
                // parse the results
                for (int i = 0; i < resultsCount; i++) {
                    Element result = results.get(i);
                    Elements links = result.select(".result-title a");
                    if (links.size() == 1) {
                        Article article = new Article(links.get(0).text(),
                                BASE_URL + links.get(0).attributes().get("href"));
                        category.addArticle(article);
                        Elements authors = result.select(".search-result-authors div");
                        if (authors.size() == 1) {
                            article.setAuthors(authors.get(0).text());
                        }
                        Elements dates = result.select(".search-result-date div");
                        if (dates.size() == 1) {
                            try {
                                Date publishedDate = format.parse(dates.get(0).text().trim());
                                article.setPublishedDate(publishedDate);
                            } catch (ParseException exception) {
                                // ignore date formatting if not working
                            }
                        }
                    }
                }
                // check the next page of results
                page++;
                pageRequest = String.format(BASE_URL + SEARCH_URL, categoryName, page);
                content = Request.Get(pageRequest).setHeader("user-agent", USER_AGENT).execute().returnContent();

                doc = Jsoup.parse(content.toString());
                results = doc.select(".search-results-item-body");
                resultsCount = results.size();
            }
        }
    }
}
