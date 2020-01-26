package com.example.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.example.demo.entity.Users;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UsersDAOHibernateIMP implements UsersDAO {


    private EntityManager entityManager;
    
    @Autowired
    public void UsersDAOHibernateIMP (EntityManager TheEntityManager){
        entityManager = TheEntityManager;
    }

    
    @Override
    public List<Users> findAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Users> theQuery = 
            currentSession.createQuery("from Users", Users.class);
        List<Users> list = theQuery.getResultList();
        return list;
    }

    @Override
    public Users findbyID(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Users user = currentSession.get(Users.class, id);
        return user;
    }

    
    @Override
    public int findbyEmail(String EmailName) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery(
            "from Users where email =:EmailName");
        theQuery.setParameter("EmailName", EmailName);
        //List<Product> lista = theQuery.getResultList();
        return theQuery.getResultList().size();
    }

    @Override
    public Users save(Users User) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(User);
        return User;
    }

    @Override
    public Users deletebyID(int id) {

        Users temp = findbyID(id);
     
        Session currentSession = entityManager.unwrap(Session.class);
        Query theQuery = currentSession.createQuery(
            "delete from Users where id =:UsersID");
        theQuery.setParameter("UsersID", id);
        try{
        theQuery.executeUpdate();
        }
        catch (Exception e)
        {   
            
        }
        return temp;
       
    }



    

}