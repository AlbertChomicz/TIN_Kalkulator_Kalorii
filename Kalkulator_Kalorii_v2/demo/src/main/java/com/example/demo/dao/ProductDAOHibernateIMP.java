package com.example.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.example.demo.entity.Product;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProductDAOHibernateIMP implements ProductDAO {


    private EntityManager entityManager;
    
    @Autowired
    public void MealDAOHibernateIMP (EntityManager TheEntityManager){
        entityManager = TheEntityManager;
    }

    
    @Override
    public List<Product> findAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Product> theQuery = 
            currentSession.createQuery("from Product", Product.class);
        List<Product> productlist = theQuery.getResultList();
        return productlist;
    }

    @Override
    public Product findbyID(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Product product = currentSession.get(Product.class, id);
        return product;
    }

    
    @Override
    public Integer findbyName(String ProductName) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery(
            "from Product where name =:ProductName");
        theQuery.setParameter("ProductName", ProductName);
        //List<Product> lista = theQuery.getResultList();
        return theQuery.getResultList().size();
    }

    @Override
    public void save(Product theProduct) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(theProduct);

    }

    @Override
    public String deletebyID(int id) {

        Product temp = findbyID(id);
     
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery(
            "delete from Product where id =:Productid");
        theQuery.setParameter("Productid", id);
        try{
        theQuery.executeUpdate();
        }
        catch (Exception e)
        {   
            
        }
        return "Produkt: "+temp.getName()+" usunieto";
       
    }



    

}