package com.yann.crawler;

import org.junit.Test;

import jdk.incubator.http.HttpClient;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.ParseException;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Unit test for simple App.
 *
 * @param <HttpEntity>
 */
public class HtmlParserTest<HttpEntity> {
    @Test
    public void testJsoup() {
        String html = "<html><head><title>First parse</title></head><body><p>Parsed HTML into a doc.</p></body></html>";

        Document doc = Jsoup.parse(html);
        assertNotNull(doc);
        Elements title = doc.select("head title");
        assertNotNull(title);
        assertEquals(1, title.size());
        assertEquals("title", title.get(0).tag().getName());
        assertEquals("First parse", title.get(0).text());
    }

    @Test
    public void testReadCategories() throws IOException {
        Content content = Request.Get("https://www.cochranelibrary.com/cdsr/reviews/topics")
        .setHeader("user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36")
        .execute().returnContent();
        assertNotNull(content);
        Document doc = Jsoup.parse(content.toString());
        Elements categoryLinks = doc.select(".browse-by-list-item-link");
        assertNotNull(categoryLinks);
        assertTrue(categoryLinks.size() > 0);
        List<String> categories = new ArrayList<>();
        for( int i = 0; i < categoryLinks.size(); i++) {
            Element categoryLink = categoryLinks.get(i);
            categories.add(categoryLink.text());
        }
        assertEquals(35, categories.size());
        assertEquals("Allergy & intolerance", categories.get(0));
    }
}
