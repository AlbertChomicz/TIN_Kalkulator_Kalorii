package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.example.demo.Views.Views;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
public class Meal {

    
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonView(Views.MealInfo.class)
    private int id;
    @NotNull
    @JsonView(Views.MealInfo.class)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String name;
    @JsonView(Views.MealInfo.class)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @NotNull
    private String opis;
    @JsonView(Views.MealInfo.class)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @NotNull
    private String photoname;
    // @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonView(Views.MealInfo.class)
    private List<Meal_Products> meal_products;
    
    // @JsonInclude(JsonInclude.Include.NON_EMPTY)
    // static List<Meal> MealsExtension = new ArrayList<Meal>();

    // static int firstID = 0;

    /*
     * public Meal(String name, String opis, String photoname,
     * ArrayList<Meal_Products> products) {
     * 
     * System.out.println("ZROBILEM SE NOWY ");
     * 
     * this.name = name; this.opis = opis; this.photoname = photoname; this.products
     * = products;
     * 
     * }
     */

    public Meal(String name, String opis, String photoname) {
        System.out.println("ZROBILEM NOWY ");
        this.name = name;
        this.opis = opis;
        this.photoname = photoname;
    }

    public Meal() {

    }

    public void add(Meal_Products themeal_product) {
        if (meal_products == null) {
            meal_products = new ArrayList<Meal_Products>();
        }

        meal_products.add(themeal_product);
        themeal_product.setMeal(this);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getPhotoname() {
        return photoname;
    }

    public void setPhotoname(String photoname) {
        this.photoname = photoname;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @OneToMany(mappedBy = "meal", cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH })
    public List<Meal_Products> getMeal_products() {
        return meal_products;
    }

    public void setMeal_products(List<Meal_Products> meal_products) {
        this.meal_products = meal_products;
    }

    /*
     * 
     * public static void EditMeal(int id, Meal meal) { if (meal.getName().length()
     * > 0) Meal.getMealbyID(id).setName(meal.getName()); if
     * (meal.getOpis().length() > 0) Meal.getMealbyID(id).setOpis(meal.getOpis());
     * if (meal.getPhotoname().length() > 0)
     * Meal.getMealbyID(id).setPhotoname(meal.getPhotoname()); if
     * (meal.getProducts().size() > 0)
     * Meal.getMealbyID(id).setProducts(meal.getProducts()); }
     * 
     * 
     * 
     * public static boolean existsByID(int id){ if (getMealbyID(id) == (null)){
     * return false; } else{ return true; } }
     * 
     * 
     * 
     * 
     * public static List<Meal> getMealList() { return MealsExtension; }
     * 
     * public static Meal AddMeal(Meal newMeal) { newMeal.setId(firstID++); // Meal
     * meal = new Meal(newMeal.getName(), newMeal.getOpis(), newMeal.getPhotoname(),
     * newMeal.getProducts()); MealsExtension.add(newMeal); return newMeal; }
     * 
     * public static void DeleteMeal(int id) {
     * Meal_Products.get_ids_by_Meal(getMealbyID(id)).forEach( e ->
     * Meal_Products.delete_Meal_product(e) );
     * MealsExtension.remove(getMealbyID(id));
     * 
     * }
     * 
     * public static Meal getMealbyID(int id) {
     * 
     * Meal founded = MealsExtension.stream() .filter(meal-> meal.getId() == (id))
     * .findFirst() .orElse(null); return founded;
     * 
     * }
     * 
     * public List<Product> getProducts() { return products; }
     * 
     * public void setProducts(List<Product> products) { this.products = products; }
     * 
     * 
     */

}
