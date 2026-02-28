package io.github.jonathankleve.reimbursementservice.repository;

import io.github.jonathankleve.reimbursementservice.model.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer> {
    List<Reimbursement> findByAuthorId(int id);
}