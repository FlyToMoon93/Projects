package org.example.lms.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.example.lms.entity.OurUsers;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {
    private int statusCode;
    private String message;
    private String error;
    private String token;
    private String refreshToken;
    private String expiredTime;
    private String firstname;
    private String lastname;
    private String role;
    private String password;
    private OurUsers user;
    private List<OurUsers> userList;
    private String email;

}
