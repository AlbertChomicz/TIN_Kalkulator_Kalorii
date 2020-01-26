package com.example.demo.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;
import java.util.StringJoiner;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.example.demo.dao.ProductDAO;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/product")

@CrossOrigin()
public class ProductRestController{

    
    private ProductService productService;

    @Autowired
    public ProductRestController (ProductService theproductService){
        productService = theproductService;
    }


    @CrossOrigin()
    @GetMapping("/")
    public List<Product> list(){
        return productService.findAll();
       
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Product getProduct(@PathVariable int id) {
        return productService.findbyID(id);
        
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        if(productService.findbyID(id)==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{        
            String odp = productService.deletebyID(id);
             return new ResponseEntity<>(odp,HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<String> addProduct(@Valid @RequestBody Product newProduct) {

        if (productService.findbyName(newProduct.getName()) > 0){
            return new ResponseEntity<>("Product with this name already exists",HttpStatus.CONFLICT);
        }
            else{
        productService.save(newProduct);
        return new ResponseEntity<>("Produkt "+newProduct.getName()+" utworzono",HttpStatus.CREATED);
            }

    }


    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @JsonInclude(JsonInclude.Include.NON_NULL)

    public ResponseEntity<String> editProduct(@PathVariable int id,@Valid @RequestBody Product newProduct) {
        newProduct.setId(id);
        productService.save(newProduct);
        return new ResponseEntity<>("Zmodyfykiwano produkt o nazwie: "+newProduct.getName()+" : weglowodany: "
        +newProduct.getCarbohydrates()+", bialko: "+newProduct.getProtein()+", tluszcze: "+newProduct.getFat(),HttpStatus.CREATED);
    }

    @RequestMapping(value = "/ImageInput", method = RequestMethod.POST)
    public ResponseEntity<String> updateLotImage(@RequestParam("files") MultipartFile[] files,
            RedirectAttributes redirectAttributes, HttpSession session) throws IOException {

                byte[] bytes = files[0].getBytes();
                Path path = Paths.get("./src/main/webapp/WEB-INF/images/" + files[0].getOriginalFilename());
                Files.write(path, bytes);

        return new ResponseEntity<String>("Success", HttpStatus.OK);

    }


    



}