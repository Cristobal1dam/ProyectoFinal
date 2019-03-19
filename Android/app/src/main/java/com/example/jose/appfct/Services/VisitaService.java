package com.example.jose.appfct.Services;

import com.example.jose.appfct.Model.Alumno;

import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.Path;

public interface VisitaService {

    @DELETE("/visitas/{id}")
    Call<Alumno> deleteVisita(@Path("id") String id);
}
