package com.project1.controllers;


import com.project1.dtos.builders.UserBuilder;
import com.project1.dtos.validators.UserDTO;
import com.project1.entities.Users;
import com.project1.services.UserService;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<?> getUsers() {
        List<Users> users = userService.getUsers();
        List<UserDTO> userDTOS = users.stream().map(UserBuilder::toUserDTO).collect(Collectors.toList());
        for (UserDTO dto : userDTOS) {
            Link userLink = linkTo(methodOn(UserController.class)
                    .getUsers()).withRel("userDetails");
            dto.add(userLink);
        }
        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @GetMapping(value = "/find1/{id}")
    public ResponseEntity<?> findUserById(@PathVariable("id") Integer id) {
        Users user = userService.findUserById(id);
        return new ResponseEntity<>(UserBuilder.toUserDTO(user), HttpStatus.OK);
    }

    @GetMapping(value = "/find2/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable("username") String username) {
        Users user = userService.findUserByUsername(username);
        return new ResponseEntity<>(UserBuilder.toUserDTO(user), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> insertUser(@RequestBody UserDTO userDTO) {
        Users user = userService.insert(userDTO);
        return new ResponseEntity<>(UserBuilder.toUserDTO(user), HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<?> editUser(@Valid @RequestBody UserDTO userDTO) {
        Users user = userService.update(userDTO);
        return new ResponseEntity<>(UserBuilder.toUserDTO(user), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
        userService.delete(id);
        return new ResponseEntity<>("Worked", HttpStatus.ACCEPTED);
    }

    @PutMapping(value = "/{userId}/{deviceId}")
    public ResponseEntity<?> addDevice(@PathVariable("userId") Integer userId, @PathVariable("deviceId") Integer deviceId) {
        Users user = userService.addDevice(userId, deviceId);
        return new ResponseEntity<>(UserBuilder.toUserDTO(user), HttpStatus.OK);
    }
}
