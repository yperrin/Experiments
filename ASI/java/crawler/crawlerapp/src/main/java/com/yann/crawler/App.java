package com.yann.crawler;

import com.yann.crawler.services.SitesCrawler;

import org.springframework.context.support.ClassPathXmlApplicationContext;

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
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
        SitesCrawler crawlers = (SitesCrawler) context.getBean("SitesCrawler");
        // get the data
        try {
            long start = System.currentTimeMillis();
            crawlers.process();
            System.out.println((System.currentTimeMillis() - start) + "Process is complete: " + args[0]);
        } catch (Exception exception) {
            System.out.println("Failed to store the categories");
        }
        context.close();
    }
}
