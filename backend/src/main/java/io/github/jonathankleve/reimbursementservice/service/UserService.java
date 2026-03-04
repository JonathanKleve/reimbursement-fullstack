package io.github.jonathankleve.reimbursementservice.service;

import io.github.jonathankleve.reimbursementservice.model.User;
import io.github.jonathankleve.reimbursementservice.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {this.userRepository = userRepository;}

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User:" + id + "not found");
        }

        try {
            userRepository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Cannot delete user with active reimbursements");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
