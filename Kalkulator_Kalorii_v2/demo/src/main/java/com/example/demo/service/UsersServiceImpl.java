package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import com.example.demo.dao.UsersDAO;
import com.example.demo.entity.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements UsersService {

    private UsersDAO usersDAO;

    @Autowired
    public UsersServiceImpl(UsersDAO theUsersDAO) {
        usersDAO = theUsersDAO;
    }


    @Override
    @Transactional
    public List<Users> findAll() {
        return usersDAO.findAll();
        
    }

    @Override
    @Transactional
    public Users findbyID(int id) {
        
        return usersDAO.findbyID(id);
        
    }

    @Override
    @Transactional
    public Users save(Users user) {
        return usersDAO.save(user);
    }

    @Override
    @Transactional
    public Users deletebyID(int id) {
       return usersDAO.deletebyID(id);
    }

    @Override
    @Transactional
    public int findbyEmail(String email) {
        return usersDAO.findbyEmail(email);
    }
    


}