package com.project1.services;

import com.project1.dtos.builders.UserBuilder;
import com.project1.dtos.validators.UserDTO;
import com.project1.entities.Device;
import com.project1.entities.Users;
import com.project1.repositories.DeviceRepository;
import com.project1.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    public UserService(UserRepository userRepository, DeviceRepository deviceRepository) {
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
    }

    @Transactional
    public List<Users> getUsers() {
        return userRepository.findAll();
    }

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Transactional
    public Users insert(UserDTO userDTO) {
        Users user = UserBuilder.toEntity(userDTO);
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        LOGGER.debug("User with id {} was inserted in db", user.getId());
        return user;
    }

    @Transactional
    public void delete(Integer id) {
        Optional<Users> user = userRepository.findById(id);
        if (user.isPresent()) {
            LOGGER.debug("User with id {} is deleted from db", user.get().getId());
            userRepository.delete(user.get());
        }
    }

    @Transactional
    public Users update(UserDTO userDTO) {
        Optional<Users> user = userRepository.findById(userDTO.getId());
        user.get().setUsername(userDTO.getUsername());
        user.get().setPassword(userDTO.getPassword());
        user.get().setRole(userDTO.getRole());
        user.ifPresent(userRepository::save);
        return user.get();
    }

    @Transactional
    public Users findUserById(Integer id) {
        return userRepository.findUsersById(id).get();
    }

    @Transactional
    public Users findUserByUsername(String username){
        return userRepository.findByUsername(username).get();
    }

    @Transactional
    public Users addDevice(Integer userId, Integer deviceID){
        Optional<Device> device = deviceRepository.findById(deviceID);
        Optional<Users> user = userRepository.findById(userId);

        if (user.isPresent() && device.isPresent()){
            device.get().setUsers(user.get());
            user.get().addDevice(device.get());
        }

        return user.get();
    }
}
