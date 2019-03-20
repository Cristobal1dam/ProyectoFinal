package com.example.jose.appfct.Services;




import com.example.jose.appfct.Model.LoginResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface AuthService {

    @POST("/auth")
    Call<LoginResponse> doLogin(@Header("Authorization") String authorization);

}
