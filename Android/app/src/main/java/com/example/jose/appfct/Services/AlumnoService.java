package com.example.jose.appfct.Services;


import com.example.jose.appfct.Model.Alumno;
import com.example.jose.appfct.Model.UserAlumnos;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface AlumnoService {

    @GET("/users/{id}")
    Call<UserAlumnos> getAlumnosList(@Path("id") String id);

    @GET("/alumnos/{id}")
    Call<Alumno> getOneAlumno(@Path("id") String id);

}
