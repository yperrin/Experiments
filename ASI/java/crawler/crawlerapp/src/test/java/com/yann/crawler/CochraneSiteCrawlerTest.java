package com.yann.crawler;

import org.junit.Test;

import static org.junit.Assert.*;

import java.io.IOException;

import com.yann.crawler.models.Category;
import com.yann.crawler.services.CochraneSiteCrawler;

/**
 * Unit test for simple App.
 */
public class CochraneSiteCrawlerTest {
    @Test
    public void testCategories() throws IOException {
        CochraneSiteCrawler crawler = new CochraneSiteCrawler();
        Category[] categories = crawler.downloadCategories();
        assertTrue(categories.length > 0);
    }

    @Test
    public void testArticles() throws IOException {
        CochraneSiteCrawler crawler = new CochraneSiteCrawler();
        Category category = new Category("Allergy & intolerance", "https://www.cochranelibrary.com/en/search?p_p_id=scolarissearchresultsportlet_WAR_scolarissearchresults&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchText=*&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchType=basic&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetQueryField=topic_id&_scolarissearchresultsportlet_WAR_scolarissearchresults_searchBy=6&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetDisplayName=Allergy+%26+intolerance&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetQueryTerm=z1506030924307755598196034641807&_scolarissearchresultsportlet_WAR_scolarissearchresults_facetCategory=Topics");
        crawler.downloadArticles(category);
        assertTrue(category.getArticles().length > 0);
        assertNotNull(category.getArticles()[0].getTitle());
        assertNotNull(category.getArticles()[0].getUrl());
        assertNotNull(category.getArticles()[0].getAuthors());
        assertNotNull(category.getArticles()[0].getPublishedDate());
    }
}
