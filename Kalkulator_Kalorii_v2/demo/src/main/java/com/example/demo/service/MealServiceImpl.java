package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import com.example.demo.dao.MealDAO;
import com.example.demo.entity.Meal;
import com.example.demo.entity.Meal_withProducts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealServiceImpl implements MealService {

    private MealDAO mealDAO;

    @Autowired
    public MealServiceImpl(MealDAO theMealDAO) {
        mealDAO = theMealDAO;
    }


    @Override
    @Transactional
    public List<Meal> findAll() {
       return mealDAO.findAll();
    }

    @Override
    @Transactional
    public Meal findbyID(int id) {
        return mealDAO.findbyID(id);
    }

    @Override
    @Transactional
    public Meal save(Meal_withProducts theMeal) {
         
        return  mealDAO.save(theMeal);
    }

    @Override
    @Transactional
    public void deletebyID(int id) {
        mealDAO.deletebyID(id);

    }

    @Override
    @Transactional
    public void save_edit(Meal_withProducts theMeal, int id) {
       mealDAO.save_edit(theMeal, id);

    }

}
    