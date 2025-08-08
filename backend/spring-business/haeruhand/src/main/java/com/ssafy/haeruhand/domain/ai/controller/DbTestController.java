package com.ssafy.haeruhand.domain.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

public class DbTestController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/v1/charset-check")
    public Map<String, String> checkCharset() {
        List<Map<String, Object>> results = jdbcTemplate.queryForList(
                "SHOW SESSION VARIABLES LIKE 'character%'"
        );

        Map<String, String> charset = new HashMap<>();
        for (Map<String, Object> row : results) {
            charset.put((String) row.get("Variable_name"), (String) row.get("Value"));
        }

        return charset;
    }

    @GetMapping("/v1/test-fish/{fishName}")
    public Map<String, Object> testFishQuery(@PathVariable String fishName) {
        String sql = "SELECT * FROM fish_restriction WHERE species_name = ?";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, fishName);

        Map<String, Object> response = new HashMap<>();
        response.put("searchTerm", fishName);
        response.put("resultCount", results.size());
        response.put("results", results);

        return response;
    }

    @GetMapping("/v1/test-fish-all")
    public Map<String, Object> testAllFish() {
        String sql = "SELECT * FROM fish_restriction";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        Map<String, Object> response = new HashMap<>();
        response.put("totalCount", results.size());
        response.put("results", results);

        return response;
    }
}
