package com.example.jose.appfct.Services;




import com.example.jose.appfct.Model.LoginResponse;
import com.example.jose.appfct.Model.PassDto;
import com.example.jose.appfct.Model.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface AuthService {

    @POST("/auth")
    Call<LoginResponse> doLogin(@Header("Authorization") String authorization);

    @PUT("/users/{id}/password")
    Call<User> updatePass(@Header("Authorization") String authorization, @Path("id") String id, @Body PassDto pass);


}
