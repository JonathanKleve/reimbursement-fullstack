package io.github.jonathankleve.reimbursementservice.controller;

import io.github.jonathankleve.reimbursementservice.model.User;
import io.github.jonathankleve.reimbursementservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginDetails) {
        // Basic logic: find user by username
        User user = userRepository.findByUsername(loginDetails.getUsername());

        if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
            return ResponseEntity.ok(user); // Success!
        }
        return ResponseEntity.status(401).body("Invalid username or password"); // Unauthorized
    }
}
