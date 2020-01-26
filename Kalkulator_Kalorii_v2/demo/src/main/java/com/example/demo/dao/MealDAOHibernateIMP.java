package com.example.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.example.demo.entity.Meal;
import com.example.demo.entity.Meal_Products;
import com.example.demo.entity.Meal_withProducts;
import com.example.demo.entity.Product;

import org.hibernate.Session;
import org.hibernate.query.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class MealDAOHibernateIMP implements MealDAO {

    private EntityManager entityManager;

    @Autowired
    public MealDAOHibernateIMP(EntityManager TheEntityManager) {
        entityManager = TheEntityManager;
    }

    @Transactional
    @Override
    public List<Meal> findAll() {

        Session currentSession = entityManager.unwrap(Session.class);
        Query<Meal> theQuery = currentSession.createQuery("from Meal", Meal.class);
        List<Meal> meallist = theQuery.getResultList();
        return meallist;

    }

    @Override
    public Meal findbyID(int id) {

        Session currentSession = entityManager.unwrap(Session.class);
        Meal meal = currentSession.get(Meal.class, id);
        return meal;
    }

    @Override
    public Meal save(Meal_withProducts theMeal_withProducts) {
        Session currentSession = entityManager.unwrap(Session.class);
        
        Meal newMeal = new Meal(theMeal_withProducts.getName(), theMeal_withProducts.getOpis(),
                theMeal_withProducts.getPhotoname());
        
                Product existing_Product;

        for (int product_id : theMeal_withProducts.getMapa().keySet()) {
            
            existing_Product = (Product) currentSession.get(Product.class, product_id);
            Meal_Products new_Meal_Products = new Meal_Products(newMeal, existing_Product,
            theMeal_withProducts.getMapa().get(product_id));
            existing_Product.add(new_Meal_Products);
            newMeal.add(new_Meal_Products);
            currentSession.saveOrUpdate(existing_Product);
            currentSession.saveOrUpdate(newMeal);
            currentSession.saveOrUpdate(new_Meal_Products);
            System.out.println("key: " + product_id + " " + theMeal_withProducts.getMapa().get(product_id));

            
        }
        
        return newMeal;
    }

    @Override
    public void save_edit(Meal_withProducts theMeal_withProducts, int id) {
        Session currentSession = entityManager.unwrap(Session.class);

        Meal newMeal = (Meal) currentSession.get(Meal.class, id);
        newMeal.setName(theMeal_withProducts.getName());
        newMeal.setOpis(theMeal_withProducts.getOpis());
        newMeal.setPhotoname(theMeal_withProducts.getPhotoname());
        Query theQuery = currentSession.createQuery("delete from Meal_Products where meal_id =:mealID");
        theQuery.setParameter("mealID", id);
        theQuery.executeUpdate();

        Product existing_Product;

        for (int product_id : theMeal_withProducts.getMapa().keySet()) {
            existing_Product = (Product) currentSession.get(Product.class, product_id);
            Meal_Products new_Meal_Products = new Meal_Products(newMeal, existing_Product,
                theMeal_withProducts.getMapa().get(product_id));
            existing_Product.add(new_Meal_Products);
            newMeal.add(new_Meal_Products);
            currentSession.saveOrUpdate(existing_Product);
            currentSession.saveOrUpdate(newMeal);
            currentSession.saveOrUpdate(new_Meal_Products);
            System.out.println("key: " + product_id + " " + theMeal_withProducts.getMapa().get(product_id));

        }
    }

    @Override
    public void deletebyID(int id) {

        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery1 = currentSession.createQuery("delete from Meal_Products where Meal_id =:MealId");
        theQuery1.setParameter("MealId", id);
        theQuery1.executeUpdate();
        Query theQuery2 = currentSession.createQuery("delete from Meal where id =:MealId");
        theQuery2.setParameter("MealId", id);
        theQuery2.executeUpdate();

    }

}