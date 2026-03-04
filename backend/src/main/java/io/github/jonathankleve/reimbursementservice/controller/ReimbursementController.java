package io.github.jonathankleve.reimbursementservice.controller;

import io.github.jonathankleve.reimbursementservice.model.Reimbursement;
import io.github.jonathankleve.reimbursementservice.service.ReimbursementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reimbursements")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.DELETE})
public class ReimbursementController {
    private final ReimbursementService reimbursementService;

    public ReimbursementController(ReimbursementService reimbursementService) {this.reimbursementService = reimbursementService;}

    @PostMapping
    public Reimbursement create(@RequestBody Reimbursement r) {
        //TODO: add user verification/matching and input cleaning
        return reimbursementService.create(r);
    }

    @GetMapping
    public List<Reimbursement> getReimbursements(
        @RequestParam(required = false) Integer authorId,
        @RequestParam(required = false) String role) {

        return reimbursementService.getReimbursements(authorId, role);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateStatus(
        @PathVariable Integer id,
        @RequestBody StatusUpdateRequest request) {

        return reimbursementService.updateStatus(id, request);
    }

    public static class StatusUpdateRequest {
        public String status;
    }
}
