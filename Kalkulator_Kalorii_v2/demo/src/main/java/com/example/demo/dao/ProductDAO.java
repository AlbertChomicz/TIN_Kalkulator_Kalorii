package com.example.demo.dao;

import java.util.List;

import com.example.demo.entity.Product;


public interface ProductDAO {

public List<Product> findAll();
public Product findbyID(int id);
public void save(Product theProduct);
public String deletebyID(int id);
public Integer findbyName(String ProductName);

}