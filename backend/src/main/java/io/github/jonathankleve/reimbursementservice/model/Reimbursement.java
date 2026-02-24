package io.github.jonathankleve.reimbursementservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "reimbursements")
@Data
public class Reimbursement {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer id;

    private Double amount;
    private String description;

    private String status = "PENDING";

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User author;
}
