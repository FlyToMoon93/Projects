package org.example.lms.service;

import org.example.lms.exception.EmailAlreadyInUseException;
import org.example.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.example.lms.entity.OurUsers;
import org.yaml.snakeyaml.constructor.DuplicateKeyException;

@Service
public class OurUserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    // Methode zum Registrieren eines neuen Benutzers
    public void registerUser(String email, String password) {
        try {
            if (userRepository.findByEmail(email).isPresent()) {
                throw new EmailAlreadyInUseException("Email already in use: " + email);
            }

            OurUsers newUser = new OurUsers();
            newUser.setEmail(email);
            newUser.setPassword(password);
            userRepository.save(newUser);
        } catch (DataIntegrityViolationException e) {
            // Wenn der Fehler von der Datenbank kommt
            if (e.getCause() != null && e.getCause().getMessage().contains("Duplicate entry")) {
                throw new EmailAlreadyInUseException("Email already in use: " + email);
            }
            throw e; // Für andere Datenintegritätsverletzungen
        } catch (DuplicateKeyException e) {
            // Fange spezielle DuplicateKeyException ab, falls vorhanden
            throw new EmailAlreadyInUseException("Email already in use: " + email);
        }
    }

}
