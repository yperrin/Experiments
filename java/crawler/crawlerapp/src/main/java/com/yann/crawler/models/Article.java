package com.yann.crawler.models;

import java.util.Date;

public class Article {
    private String url = null;
    private String title = null;
    private String author = null;
    private Date publishedDate = null;

    public Article(final String title, final String url) {
        this.title = title;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }
    public String getUrl() {
        return url;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getAuthor() {
        return author;
    }
    public void setPublishedDate(Date publishedDate) {
        this.publishedDate = publishedDate;
    }
    public Date getPublishedDate() {
        return publishedDate;
    }
}
