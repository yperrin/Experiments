package com.yann.crawler;

import com.yann.crawler.interfaces.CategoryRepository;
import com.yann.crawler.interfaces.SiteCrawler;
import com.yann.crawler.models.Category;
import com.yann.crawler.services.CategoryFileRepository;
import com.yann.crawler.services.CochraneSiteCrawler;

/**
 * Hello world!
 */
public final class App {
    private App() {
    }

    /**
     * Says hello to the world.
     *
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {
        // get the data
        SiteCrawler crawler = new CochraneSiteCrawler();
        try {
            Category[] categories = crawler.getCategories();
            CategoryRepository repo = new CategoryFileRepository(args[0]);
            repo.persist(categories);
            System.out.println("Process is complete: " + args[0]);
        } catch (Exception exception) {
            System.out.println("Failed to write the file: " + args[0]);
        }
    }
}
