package it.cambi

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class ProductController {

    @GetMapping("/categories")
    fun categories(): ResponseEntity<List<Category>> {
        return ResponseEntity.ok(
            listOf(
                Category(1, "Category X"),
                Category(2, "Category Y")
            )
        )
    }

}