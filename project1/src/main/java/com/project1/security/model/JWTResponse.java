package com.project1.security.model;

import java.io.Serializable;

public class JWTResponse implements Serializable {
    private static final long serialVersionUID = -2940062351245153992L;
    private final String jwtToken;

    public JWTResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getJwtToken() {
        return jwtToken;
    }
}
