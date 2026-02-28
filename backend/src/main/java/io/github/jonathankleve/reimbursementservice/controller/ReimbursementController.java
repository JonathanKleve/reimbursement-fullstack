package io.github.jonathankleve.reimbursementservice.controller;

import io.github.jonathankleve.reimbursementservice.model.Reimbursement;
import io.github.jonathankleve.reimbursementservice.repository.ReimbursementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reimbursements")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.DELETE})
public class ReimbursementController {
    private final ReimbursementRepository reimbursementRepository;

    public ReimbursementController(ReimbursementRepository reimbursementRepository) {this.reimbursementRepository = reimbursementRepository;}

    @PostMapping
    public Reimbursement create(@RequestBody Reimbursement r) {
        //TODO: add user verification/matching and input cleaning
        return reimbursementRepository.save(r);
    }

    @GetMapping
    public List<Reimbursement> getReimbursements(
        @RequestParam(required = false) Integer authorId,
        @RequestParam(required = false) String role) {

        if ("MANAGER".equals(role)) {
            return reimbursementRepository.findAll();   //Managers see all requests
        } else if (authorId != null) {
            return reimbursementRepository.findByAuthorId(authorId);    //employees only see their own
        }

        return new ArrayList<>();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateStatus(
        @PathVariable int id,
        @RequestBody StatusUpdateRequest request) {

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

    public static class StatusUpdateRequest {
        public String status;
    }
}
