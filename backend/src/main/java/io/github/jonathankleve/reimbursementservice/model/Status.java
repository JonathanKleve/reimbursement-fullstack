package io.github.jonathankleve.reimbursementservice.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
    PENDING,
    APPROVED,
    DENIED
}
