package com.yann.crawler.interfaces;

import java.io.IOException;

import com.yann.crawler.models.Category;

public interface SiteCrawler {
    Category[] getCategories() throws IOException;
}
