package com.backend_task.ecommerce_backend.search;

import com.backend_task.ecommerce_backend.search.ProductSearch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ProductSearchRepository extends ElasticsearchRepository<ProductSearch, String> {
}
