package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.example.demo.Views.Views;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
public class Product {

    @NotNull
    @JsonView(Views.Product_info.class)
    private String name;
    @Min(0) @Max(99)
    @JsonView(Views.Product_info.class)
    @NotNull
    private float carbohydrates;
    @Min(0) @Max(99)
    @JsonView(Views.Product_info.class)
    @NotNull
    private float protein;
    @NotNull
    @Min(0) @Max(99)
    @JsonView(Views.Product_info.class)
    private float fat;
    @Min(0) @Max(99)
    @JsonView(Views.Product_info.class)
    @NotNull
    private float category;
    @JsonView(Views.Product_info.class)
    @NotNull
    private String photoname;
    @JsonView(Views.Product_info.class)
   
    private int id;
    @JsonIgnore
    private List<Meal_Products> meal_products;

    // static int firstID = 0;
    // static List<Product> ProductsExtension = new ArrayList<Product>();
    

    public Product(String name, float carbohydrates, float protein, float fat, float category, String photo_path) {
        
        this.setName(name);
        this.setCarbohydrates(carbohydrates);
        this.setProtein(protein);
        this.setFat(fat);
        this.setCategory(category);
        this.setPhotoname(photo_path);
        //this.id = firstID++;
    }

    public Product(){
    //   this.carbohydrates = -1;
    }

    public void add(Meal_Products themeal_product){
        if (meal_products == null){
            meal_products = new ArrayList<Meal_Products>();
        }
        meal_products.add(themeal_product);
        //themeal_product.setProduct(this);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        
        this.name = name;
    }

    public float getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(float carbohydrates) {
        System.out.println("carbohydrates setter"+carbohydrates);
        this.carbohydrates = carbohydrates;
    }

    public float getProtein() {
        return protein;
    }

    public void setProtein(float protein) {
        this.protein = protein;
    }

    public float getFat() {
        return fat;
    }

    public void setFat(float fat) {
        System.out.println("fat setter"+fat);
        this.fat = fat;
    }

    public float getCategory() {
        return category;
    }

    public void setCategory(float category) {
        this.category = category;
    }

    public String getPhotoname() {
        return photoname;
    }

    public void setPhotoname(String photo_path) {
        this.photoname = photo_path;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @OneToMany(mappedBy = "product",
    cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    public List<Meal_Products> getMeal_products() {
        return meal_products;
    }

    public void setMeal_products(List<Meal_Products> meal_products) {
        this.meal_products = meal_products;
    }




    




    /*
    

    public static void AddProduct(Product product) {
        product.setId(firstID++);
        ProductsExtension.add(product);
    }

    public static void EditProduct(int id, Product product) {
        System.out.println("proteins: "+product.getProtein());
        try{

        if(product.getName().length()>0)
        Product.getProductbyID(id).setName(product.getName());
        if(product.getCarbohydrates()>-1)
        Product.getProductbyID(id).setCarbohydrates(product.getCarbohydrates());
        if(product.getProtein()>-1)
        Product.getProductbyID(id).setProtein(product.getProtein());
        if(product.getFat()>-1)
        Product.getProductbyID(id).setFat(product.getFat());
        if(product.getCategory()>-1)
        Product.getProductbyID(id).setCategory(product.getCategory());
        if(product.getPhoto_path().length()>0)
        Product.getProductbyID(id).setPhoto_path(product.getPhoto_path());
        }
        catch(Exception e) {
        System.out.println(e.toString());
        }
    }

    public static void DeleteProduct(int id) {
        ProductsExtension.remove(getProductbyID(id));
    }



    public static Product getProductbyID(int id) {
        
        Product founded = ProductsExtension.stream()
        .filter(prod -> prod.getId() == (id))
        .findFirst()
        .orElse(null);

        return founded;
        
    }

    public static boolean existsByID(int id){
        if (getProductbyID(id) == (null)){
            return false;
        }
        else{ 
            return true;
        }
       
    }



    public static List<Product> getProductList() {
        return ProductsExtension;
    }
    

    */







}