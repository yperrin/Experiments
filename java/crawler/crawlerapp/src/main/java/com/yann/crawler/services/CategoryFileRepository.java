package com.yann.crawler.services;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;

import com.yann.crawler.interfaces.CategoryRepository;
import com.yann.crawler.models.Article;
import com.yann.crawler.models.Category;

public class CategoryFileRepository implements CategoryRepository {
    private String fileName = null;

    public CategoryFileRepository(String fileName) {
        this.fileName = fileName;
    }

	@Override
	public void persist(Category[] categories) throws IOException {
        if (fileName == null || fileName.isEmpty()) throw new IOException("Invalid file name");
        SimpleDateFormat format = new SimpleDateFormat("dd MMM yyyy");
        FileWriter fileWriter = new FileWriter(fileName);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        for (Category category : categories) {
            for (Article article : category.getArticles()) {
                String date = article.getPublishedDate() != null ? format.format(article.getPublishedDate()) : "Not specified";
                printWriter.printf("%s|%s|%s|%s|%s\n", article.getUrl(), category.getName(), article.getTitle(), article.getAuthors(), date );
            }
        }
        printWriter.close();
	}

}
