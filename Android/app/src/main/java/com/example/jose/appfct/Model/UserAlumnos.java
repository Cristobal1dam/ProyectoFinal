package com.example.jose.appfct.Model;

import java.util.List;

public class UserAlumnos {
    private String id;
    private String name;
    private String email;
    private List<AlumnoRes> alumnos;

    public UserAlumnos(String id, String name, String email, List<AlumnoRes> alumnos) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.alumnos = alumnos;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<AlumnoRes> getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(List<AlumnoRes> alumnos) {
        this.alumnos = alumnos;
    }

    @Override
    public String toString() {
        return "UserAlumnos{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", alumnos=" + alumnos +
                '}';
    }
}
