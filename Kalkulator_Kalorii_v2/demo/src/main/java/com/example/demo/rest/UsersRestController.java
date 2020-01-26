package com.example.demo.rest;

import com.example.demo.service.UsersService;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

import javax.validation.Valid;

import com.example.demo.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")


@CrossOrigin()
public class UsersRestController{

    private UsersService UsersService;

    @Autowired
    public UsersRestController (UsersService theUsersService){
        UsersService = theUsersService;
    }


    @GetMapping("/")
    public List<Users> list(){
        return UsersService.findAll();
       
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Users get(@PathVariable int id) {
        return UsersService.findbyID(id);
        
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@PathVariable int id) {
        if(UsersService.findbyID(id)==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{        
            Users odp = UsersService.deletebyID(id);
             return new ResponseEntity<>("Usunieto usera "+odp.getName()+" "+odp.getSurname(),HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<String> addProduct(@Valid @RequestBody Users newUser) {

        if (UsersService.findbyEmail(newUser.getEmail()) > 0){
            return new ResponseEntity<>("User with this email already exists",HttpStatus.CONFLICT);
        }
            else{
                UsersService.save(newUser);
        return new ResponseEntity<>("Użytkownik "+newUser.getName()+" "+newUser.getSurname()+" utworzony",HttpStatus.CREATED);
            }

    }


    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @JsonInclude(JsonInclude.Include.NON_NULL)

    public ResponseEntity<String> editProduct(@PathVariable int id,@Valid @RequestBody Users newUser) {
        newUser.setId(id);
        UsersService.save(newUser);
        return new ResponseEntity<>("Zmiany wprowadzono",HttpStatus.CREATED);
    }


    
}