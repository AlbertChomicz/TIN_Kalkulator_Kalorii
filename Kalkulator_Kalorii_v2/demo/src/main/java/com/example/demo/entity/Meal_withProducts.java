package com.example.demo.entity;

import java.util.HashMap;
import java.util.Map;

public class Meal_withProducts {

    private String name;

    private String opis;

    private String photoname;

    Map<Integer, Integer> mapa = new HashMap<Integer, Integer>();

    public Meal_withProducts() {

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

    public Map<Integer, Integer> getMapa() {
        return mapa;
    }

    public void setMapa(Map<Integer, Integer> mapa) {
        this.mapa = mapa;
    }

    public void createMealAndLinks(Meal_withProducts meal_withProducts) {

    }

    /*
     * public void addMeal(Meal_withProducts meal_input){ Meal meal = new
     * Meal(meal_input.name, meal_input.opis, meal_input.photoname); Meal
     * meal_zrobiony = Meal.AddMeal(meal); System.out.println(meal);
     * System.out.println(meal_zrobiony);
     * System.out.println("bede tworzyl powiazanie"); meal_input.mapa.forEach( (p,g)
     * -> System.out.println(p+" + "+g)); meal_input.mapa.forEach((p,g) ->
     * Meal_Products.add_Meal_products(meal_zrobiony, Product.getProductbyID(p),
     * g));
     * 
     * System.out.println(meal_input.mapa.size());
     * System.out.println(meal_input.name); for (int name :
     * meal_input.mapa.keySet()) System.out.println("key: " + name
     * +" "+meal_input.mapa.get(name));
     * 
     * System.out.println("utworzylem"); }
     */

}