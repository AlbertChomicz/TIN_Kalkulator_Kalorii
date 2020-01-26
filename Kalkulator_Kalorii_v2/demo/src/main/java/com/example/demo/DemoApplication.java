package com.example.demo;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
@EnableWebMvc
public class DemoApplication  implements WebMvcConfigurer {

	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // Register resource handler for images
        registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/")
                .setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
    }

	

	public static void main(String[] args) {

		// initData();
		SpringApplication.run(DemoApplication.class, args);
		
	}

	/*
	public static void initData() {
		Product.AddProduct(new Product("Marchewka", 11, 11, 11, 1, "nazwa"));
		Product.AddProduct(new Product("Pomidor", 11, 14, 8, 3, "nazwa"));
		Product.AddProduct(new Product("Banan", 1, 11, 2, 2, "nazwa"));
		Product.AddProduct(new Product("Banan", 1, 11, 2, 2, "nazwa"));
		
        Meal.AddMeal(new Meal("Obiad", "Opis obiadu", "nazwa_pliku.jpg"  ));
        Meal.AddMeal(new Meal("Drugie", "Opis obiadu", "nazwa_pliku.jpg"  ));
        Meal.AddMeal(new Meal("Zupa", "Opis obiadu", "nazwa_pliku.jpg"  ));
        Meal.AddMeal(new Meal("Kurczak w sosie", "Opis obiadu", "nazwa_pliku.jpg"  ));
		
		Meal_Products.add_Meal_products(Meal.getMealbyID(1), Product.getProductbyID(1), 22);
		Meal_Products.add_Meal_products(Meal.getMealbyID(2), Product.getProductbyID(2), 11);
		Meal_Products.add_Meal_products(Meal.getMealbyID(2), Product.getProductbyID(2), 11);
		Meal_Products.add_Meal_products(Meal.getMealbyID(1), Product.getProductbyID(2), 22);
		Meal_Products.add_Meal_products(Meal.getMealbyID(1), Product.getProductbyID(0), 22);
		Meal_Products.add_Meal_products(Meal.getMealbyID(2), Product.getProductbyID(1), 11);
		Meal_Products.add_Meal_products(Meal.getMealbyID(2), Product.getProductbyID(0), 11);

		List<Integer> ids = Meal_Products.get_ids_by_Meal(Meal.getMealbyID(2));
		for (Integer integer : ids) {
			System.out.println(integer);
		}
		
	}
	*/




}
