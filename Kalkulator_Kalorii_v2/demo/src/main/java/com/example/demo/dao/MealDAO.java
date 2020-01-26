package com.example.demo.dao;

import java.util.List;
import com.example.demo.entity.Meal;
import com.example.demo.entity.Meal_withProducts;

public interface MealDAO {

    public List<Meal> findAll();
    public Meal findbyID(int id);
    public Meal save(Meal_withProducts theMeal);
    public void save_edit(Meal_withProducts theMeal, int id);
    public void deletebyID(int id);
}