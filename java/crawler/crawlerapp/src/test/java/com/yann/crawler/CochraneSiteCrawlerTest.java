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
}
