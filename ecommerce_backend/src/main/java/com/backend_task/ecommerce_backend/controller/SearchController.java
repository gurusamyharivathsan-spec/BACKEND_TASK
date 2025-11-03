package com.backend_task.ecommerce_backend.controller;

import com.backend_task.ecommerce_backend.search.ProductSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    // ✅ Search products by name (fuzzy search)
    @GetMapping("/search")
    public List<ProductSearch> searchProducts(@RequestParam String q) {
        var searchQuery = NativeQuery.builder()
                .withQuery(queryBuilder -> queryBuilder
                        .match(m -> m
                                .field("name")
                                .query(q)
                                .fuzziness("AUTO")  // allows typos like 'iphne' for 'iPhone'
                        )
                )
                .build();

        var searchHits = elasticsearchOperations.search(searchQuery, ProductSearch.class);

        // ✅ Only return limited fields
        return searchHits.stream()
                .map(SearchHit::getContent)
                .map(p -> {
                    ProductSearch dto = new ProductSearch();
                    dto.setName(p.getName());
                    dto.setMrp(p.getMrp());
                    dto.setDiscountedPrice(p.getDiscountedPrice());
                    dto.setQuantity(p.getQuantity());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
