package com.yann.crawler.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.yann.crawler.interfaces.CategoryRepository;
import com.yann.crawler.interfaces.SiteCrawler;
import com.yann.crawler.models.Category;

public class SitesCrawler {
    private List<SiteCrawler> siteCrawlers;
    private CategoryRepository repository;


    public SitesCrawler(List<SiteCrawler> siteCrawlers, CategoryRepository repository) {
        this.siteCrawlers = siteCrawlers;
        this.repository = repository;
    }

    public void process() throws IOException {
        List<Category> categories = new ArrayList<Category>();
        for (SiteCrawler crawler : siteCrawlers) {
            Category[] siteCategories = crawler.getCategories();
            categories.addAll(Arrays.asList(siteCategories));
        }
        repository.persist(categories.toArray(new Category[categories.size()]));
    }
}
