package com.yann.crawler.interfaces;

import java.io.IOException;

import com.yann.crawler.models.Category;

public interface CategoryRepository {
    void persist(Category[] categories) throws IOException;
}
