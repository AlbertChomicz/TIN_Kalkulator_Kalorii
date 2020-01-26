package com.example.demo.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.demo.Views.Views;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Meal_Products {

    private Meal meal;
    private int id;
    @JsonView(Views.Meal_Product_Info.class)
    private Product product;
    @JsonView(Views.Meal_Product_Info.class)
    private int grams;

    // public static List<Meal_Products> Meal_Products_Extension = new
    // ArrayList<Meal_Products>();
    // static int firstID = 0;

    public Meal_Products(Meal meal, Product product, int grams) {
        this.setMeal(meal);
        this.setProduct(product);
        this.setGrams(grams);
    }

    public Meal_Products() {

    }

    public int getGrams() {
        return grams;
    }

    public void setGrams(int grams) {
        this.grams = grams;
    }

    public static void addMeal_products() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
    @JoinColumn(name = "product_id")
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
    @JoinColumn(name = "meal_id")
    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    /*
     * 
     * public static List<Meal_Products> getMeal_ProductsList() { return
     * Meal_Products_Extension; }
     * 
     * 
     * public static void add_Meal_products(Meal meal, Product product, int grams) {
     * System.out.println("jest w tworzeniu powiazania");
     * System.out.println(meal.getName()); System.out.println(meal.getId());
     * Meal_Products new_Meal_Products = new Meal_Products(meal, product, grams);
     * new_Meal_Products.setId(firstID++);
     * Meal_Products_Extension.add(new_Meal_Products); }
     * 
     * 
     * public static void delete_Meal_product(int id){
     * Meal_Products_Extension.remove(getMeal_ProductsbyID(id)); }
     * 
     * public static Meal_Products getMeal_ProductsbyID(int id) {
     * 
     * Meal_Products founded = Meal_Products_Extension.stream() .filter(meal->
     * meal.getId() == (id)) .findFirst() .orElse(null); return founded;
     * 
     * }
     * 
     * public static List<Integer> get_ids_by_Meal(Meal in_meal){
     * 
     * List<Integer> ids = new ArrayList<Integer>();
     * 
     * Meal_Products_Extension.stream() .filter(meal -> meal.getMeal() == in_meal)
     * .collect(Collectors.toList()) .forEach( e -> ids.add(e.getId()) );
     * 
     * return ids;
     * 
     * }
     * 
     */

}
