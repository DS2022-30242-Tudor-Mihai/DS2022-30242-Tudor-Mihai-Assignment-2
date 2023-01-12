package com.project1.dtos.builders;

import com.project1.dtos.validators.UserDTO;
import com.project1.entities.Users;

public class UserBuilder {

    public UserBuilder() {
    }

    public static UserDTO toUserDTO(Users user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getRole());
    }

    public static Users toEntity(UserDTO userDTO) {
        return new Users(userDTO.getId(), userDTO.getUsername(), userDTO.getPassword(), userDTO.getRole());
    }
}
