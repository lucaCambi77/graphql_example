package org.example.it.cambi

import it.cambi.Product
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class ProductController {

    @GetMapping("/products")
    fun products(): ResponseEntity<List<Product>> {
        return ResponseEntity.ok(
            listOf(
                Product(1, "Product A", 1),
                Product(2, "Product B", 2),
                Product(3, "Product C", 1)
            )
        )
    }

}