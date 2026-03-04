package io.github.jonathankleve.reimbursementservice.service;

import io.github.jonathankleve.reimbursementservice.controller.ReimbursementController;
import io.github.jonathankleve.reimbursementservice.model.Reimbursement;
import io.github.jonathankleve.reimbursementservice.repository.ReimbursementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {
    private final ReimbursementRepository reimbursementRepository;

    public ReimbursementService(ReimbursementRepository reimbursementRepository) {this.reimbursementRepository = reimbursementRepository;}

    public Reimbursement create(Reimbursement r){
        return reimbursementRepository.save(r);
    }

    public List<Reimbursement> getReimbursements(Integer authorId, String role) {
        if ("MANAGER".equals(role)) {
            return reimbursementRepository.findAll();   //Managers see all requests
        } else if (authorId != null) {
            return reimbursementRepository.findByAuthorId(authorId);    //employees only see their own
        }

        return new ArrayList<>();
    }

    public ResponseEntity<?> updateStatus(Integer id, ReimbursementController.StatusUpdateRequest request) {
        Optional<Reimbursement> optionalReimb = reimbursementRepository.findById(id);

        if (optionalReimb.isPresent()) {
            Reimbursement r = optionalReimb.get();
            r.setStatus(request.status);
            reimbursementRepository.save(r);
            return ResponseEntity.ok(r);
        } else {
            return ResponseEntity.status(404).body("Reimbursement not found with ID: " + id);
        }
    }
}
