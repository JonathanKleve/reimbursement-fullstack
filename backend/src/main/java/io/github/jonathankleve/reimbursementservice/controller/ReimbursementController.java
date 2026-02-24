package io.github.jonathankleve.reimbursementservice.controller;

import io.github.jonathankleve.reimbursementservice.model.Reimbursement;
import io.github.jonathankleve.reimbursementservice.repository.ReimbursementRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reimbursements")
@CrossOrigin(origins = "http://localhost:4200")
public class ReimbursementController {
    private final ReimbursementRepository reimbursementRepository;

    public ReimbursementController(ReimbursementRepository reimbursementRepository) {this.reimbursementRepository = reimbursementRepository;}

    @GetMapping
    public List<Reimbursement> getAllReimbursements() {
        return reimbursementRepository.findAll();
    }

    @PostMapping
    public Reimbursement create(@RequestBody Reimbursement r) {
        //TODO: add user verification/matching and input cleaning
        return reimbursementRepository.save(r);
    }
}
