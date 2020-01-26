package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import com.example.demo.dao.ProductDAO;
import com.example.demo.entity.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    
    private ProductDAO productDAO;

    @Autowired
    public ProductServiceImpl(ProductDAO theProductDAO) {
        productDAO = theProductDAO;
    }
    

    @Override
    @Transactional
    public List<Product> findAll() {
        return productDAO.findAll();
    }

    @Override
    @Transactional
    public Product findbyID(int id) {
       return productDAO.findbyID(id);
    }

    @Override
    @Transactional
    public void save(Product theProduct) {
        productDAO.save(theProduct);
    }

    @Override
    @Transactional
    public String deletebyID(int id) {
        return productDAO.deletebyID(id);
    }

    @Override
    public Integer findbyName(String ProductName) {
        return productDAO.findbyName(ProductName);
    }




    

}