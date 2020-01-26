package com.example.demo.rest;

import java.util.List;

import com.example.demo.entity.Meal_Products;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/meal_products")
public class Meal_Product_RestController{

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Meal_Products> list(){
        // return Meal_Products.getMeal_ProductsList();
        return null;
    }


}
