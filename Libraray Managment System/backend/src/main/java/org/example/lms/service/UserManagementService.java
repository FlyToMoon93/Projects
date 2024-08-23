package org.example.lms.service;

import org.example.lms.entity.OurUsers;
import org.example.lms.dto.UserDto;
import org.example.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
///////////////////////////////////////////////////////

    public UserDto registerUser(UserDto registerUserDto) {
        UserDto resp = new UserDto();
        try {
            OurUsers user = new OurUsers();
            user.setEmail(registerUserDto.getEmail());
            user.setFirstname(registerUserDto.getFirstname());
            user.setRole(registerUserDto.getRole());
            user.setLastname(registerUserDto.getLastname());
            user.setId(user.getId());

            user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
            OurUsers userResult = userRepository.save(user);
            if (userResult.getId() > 0) {
                resp.setUser(userResult);
                resp.setMessage("Successfully registered");
                resp.setStatusCode(200);
            }
            return resp;

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
            return resp;

        }
    }
///////////////////////////////////////////////////////

    public UserDto loginUser(UserDto userDto) {
        UserDto resp = new UserDto();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword()));
            var user = userRepository.findByEmail(userDto.getEmail()).orElseThrow();
            var jwtToken = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            resp.setStatusCode(200);
            resp.setToken(jwtToken);
            resp.setRefreshToken(jwtToken);
            resp.setRole(user.getRole());
            resp.setFirstname(user.getFirstname());
            resp.setExpiredTime("24Hrs");
            resp.setMessage("Successfully logged in");
            System.out.println("Successfully logged in");
            return resp;

        } catch (Exception e) {
            resp.setStatusCode(500);
            System.out.println("test from me");
            resp.setError(e.getMessage());
            return resp;

        }
    }
///////////////////////////////////////////////////////

    public UserDto refreshToken(UserDto refreshToken) {
        UserDto resp = new UserDto();
        try {
            String Email = jwtUtils.extractUserName(refreshToken.getEmail());
            OurUsers users = userRepository.findByEmail(Email).orElseThrow();

            if (jwtUtils.isTokenExpired(refreshToken.getToken())) {
                var jwtToken = jwtUtils.generateToken(users);
                resp.setToken(jwtToken);
                resp.setRefreshToken(refreshToken.getRefreshToken());
                resp.setExpiredTime("24Hrs");
                resp.setMessage("Successfully refreshed");
            }
            resp.setStatusCode(200);
            return resp;
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
            return resp;

        }
    }
    ////////////////////////////////////////////////////////
    public UserDto getAllUser(){
        UserDto resp = new UserDto();
        try {
            List<OurUsers> result= userRepository.findAll();
            if(!result.isEmpty())
            {
                resp.setUserList(result);
                resp.setStatusCode(200);
                resp.setMessage("Successfully");
            }else
            {
                resp.setStatusCode(404);
                resp.setMessage("User not Found!");
            }
            return resp;

        }catch (Exception e)
        {
            resp.setStatusCode(500);
            resp.setMessage("Error Occurred : "+ e);
            return resp;

        }
    }


    ///////////////////////////////////////////////////

    public UserDto getUserById(Long id)
    {
        UserDto resp = new UserDto();
        try {
            OurUsers userById = userRepository.findById(id).orElseThrow(()-> new RuntimeException("User Not Found"));
            resp.setUser(userById);
            resp.setStatusCode(200);
            resp.setMessage("User with id : "+ id+ " found Successfully!");
            return resp;
        }catch (Exception e)
        {
            resp.setStatusCode(500);
            resp.setMessage("Error Occurred:"+ e.getMessage());
            return resp;

        }


    }
    //////////////////////////////////////////////////
    public UserDto deleteUser(Long userId) {
        UserDto resp = new UserDto();
        try {
            Optional<OurUsers> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                userRepository.deleteById(userId); // Actually delete the user from the database
                resp.setStatusCode(200);
                resp.setMessage("User deleted successfully!");
            } else {
                resp.setStatusCode(404); // Not Found
                resp.setMessage("User not found!");
            }

            return resp;
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error Occurred: " + e.getMessage());
            return resp;
        }
    }


    //////////////////////////////////////////////////

    public UserDto updateUser(Long userId, OurUsers updateUser) {
        UserDto resp = new UserDto();
        try {
            Optional<OurUsers> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                OurUsers existingUser = userOptional.get();
                existingUser.setEmail(updateUser.getEmail());
                existingUser.setFirstname(userOptional.get().getFirstname());
                existingUser.setLastname(updateUser.getLastname());
                existingUser.setRole(updateUser.getRole());
                if (updateUser.getPassword() != null && !updateUser.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updateUser.getPassword()));
                }
                OurUsers savedUser = userRepository.save(existingUser);
                resp.setUser(savedUser);
                resp.setStatusCode(200);
                resp.setMessage("User updated successfully");
            }
            return resp;

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
            return resp;

        }
    }

    /////////////////////////////////////////////////
    public UserDto getMyInfo(String email) {
        UserDto resp = new UserDto();
        try {
            Optional<OurUsers> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                resp.setUser(userOptional.get());
                resp.setStatusCode(200);
                resp.setMessage("Successfully");
            } else {
                resp.setStatusCode(404);
                resp.setMessage("User not found!");
            }
            return resp;


        }catch(
                Exception e)

        {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
            return resp;

        }

    }
///////////////////////////////////////////////////////


}
