package com.example.demo.rest;

import java.util.List;

import javax.validation.Valid;

import com.example.demo.Views.Views;
import com.example.demo.entity.Meal;
import com.example.demo.entity.Meal_withProducts;
import com.example.demo.service.MealService;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/meal")
@CrossOrigin()
public class MealRestController{

    private MealService MealService;

    @Autowired
    public MealRestController (MealService theMealService){
        MealService = theMealService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @JsonView(Views.MealList.class)
    public List<Meal> list(){
         return MealService.findAll();
      
    }
    
    @JsonView(Views.MealInfo.class)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Meal getMeal(@PathVariable int id) {
         return MealService.findbyID(id);
     
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteMeal(@PathVariable int id) {
        if(MealService.findbyID(id) == null ){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
        Meal meal = MealService.findbyID(id);
        MealService.deletebyID(id);
        return new ResponseEntity<>("Posilek "+meal.getName()+" usunieto", HttpStatus.OK);
        }
    }


    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<String> addProduct(@Valid @RequestBody Meal_withProducts Meal_withProducts) {
        System.out.println("zaczynam tworzenie meala");
        Meal meal = MealService.save(Meal_withProducts);

        return new ResponseEntity<>("Utworzono nowy posiłek o nazwie: "+meal.getName(),HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> editProduct(@PathVariable int id, @RequestBody Meal_withProducts Meal_withProducts) {
        // if(!Meal.existsByID(id)){
        //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        // }
        Meal meal = MealService.findbyID(id);
        MealService.save_edit(Meal_withProducts, id);
        return new ResponseEntity<>("Edycja posiłku "+meal.getName()+" zakonczona sukcesem",HttpStatus.OK);
    }



}