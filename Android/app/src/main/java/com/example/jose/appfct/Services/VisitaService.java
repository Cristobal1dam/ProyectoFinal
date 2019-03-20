package com.example.jose.appfct.Services;

import com.example.jose.appfct.Model.Alumno;
import com.example.jose.appfct.Model.Visita;
import com.example.jose.appfct.Model.VisitaDto;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface VisitaService {

    @DELETE("/visitas/{id}")
    Call<Alumno> deleteVisita(@Path("id") String id);

    @PUT("/visitas/realizada/{id}")
    Call<Alumno> visitaRealizada(@Path("id") String id);

    @POST("/visitas/{id}")
    Call<Visita> addVisita(@Path("id") String id, @Body VisitaDto visita);
}
