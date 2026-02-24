package io.github.jonathankleve.reimbursementservice.repository;

import io.github.jonathankleve.reimbursementservice.model.Reimbursement;
import io.github.jonathankleve.reimbursementservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer> {

}