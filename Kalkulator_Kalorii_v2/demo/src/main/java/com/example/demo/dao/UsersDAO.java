package com.example.demo.dao;

import java.util.List;
import com.example.demo.entity.Users;

public interface UsersDAO {

    public List<Users> findAll();
    public Users findbyID(int id);
    public Users save(Users user);
    public Users deletebyID(int id);
    public int findbyEmail(String email);
}