package com.ssafy.haeruhand.domain.ai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
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
}
