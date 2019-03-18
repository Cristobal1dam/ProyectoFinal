package com.example.jose.appfct;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Generator.UtilToken;
import com.example.jose.appfct.Generator.UtilUser;
import com.example.jose.appfct.Model.LoginResponse;
import com.example.jose.appfct.Services.AuthService;

import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SessionActivity extends AppCompatActivity {

    Button btnLogin;

    EditText etEmail,etPassowrd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_session);
        findViews();

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(validarCampos(etEmail,etPassowrd)) {
                    peticionLogin(etEmail.getText().toString(), etPassowrd.getText().toString());
                }else
                    Toast.makeText(SessionActivity.this, "No puede haber campos vacios", Toast.LENGTH_SHORT).show();
            }
        });



    }

    private void peticionLogin(String email, String password) {

        String credentials = Credentials.basic(email, password);
        AuthService service = ServiceGenerator.createService(AuthService.class);
        Call<LoginResponse> call = service.doLogin(credentials);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.code() != 201) {
                    // error
                    Log.e("RequestError", response.message());
                    Toast.makeText(SessionActivity.this, "Email o contraseña incorrecto", Toast.LENGTH_SHORT).show();

                } else {

                    UtilToken.setToken(SessionActivity.this, response.body().getToken());
                    UtilUser.setUserInfo(SessionActivity.this, response.body().getUser());

                    startActivity(new Intent(SessionActivity.this, MainActivity.class));
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(SessionActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

    }

    private void findViews() {

        btnLogin = findViewById(R.id.buttonLogin);
        etEmail = findViewById(R.id.editTextEmail);
        etPassowrd = findViewById(R.id.editTextPassword);

    }

    private Boolean validarCampos(EditText email, EditText pass){
        return (!(email.getText().toString().isEmpty() || pass.getText().toString().isEmpty()));

    }

}
