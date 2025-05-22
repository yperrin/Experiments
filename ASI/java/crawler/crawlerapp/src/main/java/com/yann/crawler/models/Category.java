package com.yann.crawler.models;

import java.util.ArrayList;
import java.util.List;

public class Category {
    private List<Article> articles = null;
    private String url = null;
    private String name = null;

    public Category(String name, String url) {
        this.url = url;
        this.name = name;
        articles = new ArrayList<Article>();
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public void addArticle(Article article) {
        articles.add(article);
    }
    public Article[] getArticles() {
        return articles.toArray(new Article[articles.size()]);
    }
}
