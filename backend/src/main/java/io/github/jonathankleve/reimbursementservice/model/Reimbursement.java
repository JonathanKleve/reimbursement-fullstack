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

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(20) DEFAULT 'PENDING'") //more robust, additional way to enforce default value
    private Status status = Status.PENDING;

    @ManyToOne(fetch = FetchType.EAGER)     //explicitly eager rather than lazy for the dashboard
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String receiptImage;

    private String receiptType;
}
