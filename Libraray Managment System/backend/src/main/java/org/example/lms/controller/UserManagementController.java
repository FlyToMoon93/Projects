package org.example.lms.controller;
import org.example.lms.entity.OurUsers;

import org.example.lms.dto.UserDto;
import org.example.lms.exception.EmailAlreadyInUseException;
import org.example.lms.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserManagementController {
    @Autowired
    private UserManagementService userManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        try {
            UserDto registeredUser = userManagementService.registerUser(userDto);
            return ResponseEntity.ok(registeredUser);
        } catch (EmailAlreadyInUseException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // No body needed for conflict
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // No body needed for internal server error
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userManagementService.loginUser(userDto));

    }
    @PostMapping("/auth/refresh")
    public ResponseEntity<UserDto> refreshUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userManagementService.refreshToken(userDto));

    }
    @GetMapping("/admin/get-all-users")
    public ResponseEntity<UserDto> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUser());
    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<UserDto> getUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(userManagementService.getUserById(userId ));
    }
    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody OurUsers userDto) {
        return ResponseEntity.ok(userManagementService.updateUser(userId,userDto));
    }
    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<UserDto> getMyProfile() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        UserDto resp = userManagementService.getMyInfo(email);
        return ResponseEntity.status(resp.getStatusCode()).body(resp);
    }
    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable Long userId) {
        UserDto response = userManagementService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
