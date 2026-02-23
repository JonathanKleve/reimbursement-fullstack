package io.github.jonathankleve.reimbursementservice.controller;

import io.github.jonathankleve.reimbursementservice.model.User;
import io.github.jonathankleve.reimbursementservice.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200") //enables Angular to connect to Spring
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
