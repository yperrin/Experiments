package com.yann.crawler.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.yann.crawler.interfaces.SiteCrawler;
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
    //private final String SEARCH_URL = "search?p_p_id=scolarissearchresultsportlet_WAR_scolarissearchresults&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchText=*&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchType=basic&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetQueryField=topic_id&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchBy=6&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetQueryTerm=z1506030924307755598196034641807&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetCategory=Topics&resultPerPage=100&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetDisplayName=%s&cur=%d";

    public CochraneSiteCrawler() {
        //nothing to do
    }

    @Override
    public Category[] getCategories() throws IOException {
        Category[] categories = downloadCategories();

        return categories;
	}
    public Category[] downloadCategories() throws IOException {
        List<Category> categories = new ArrayList<Category>();

        Content content = Request.Get(BASE_URL + CATEGORY_URL)
        .setHeader("user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36")
        .execute().returnContent();

        Document doc = Jsoup.parse(content.toString());
        Elements categoryLinks = doc.select(".browse-by-list-item-link");
        for( int i = 0; i < categoryLinks.size(); i++) {
            Element categoryLink = categoryLinks.get(i);
            String url = categoryLink.parent().attributes().get("href");
            String name = categoryLink.text();
            categories.add(new Category(name, url));
        }

        return categories.toArray(new Category[categories.size()]);
    }
}
