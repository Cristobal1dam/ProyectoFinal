package com.example.jose.appfct.Dialogs;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Generator.UtilUser;
import com.example.jose.appfct.Model.PassDto;
import com.example.jose.appfct.Model.User;
import com.example.jose.appfct.R;
import com.example.jose.appfct.Services.AuthService;
import com.example.jose.appfct.SessionActivity;

import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UpdatePassDialogFragment extends DialogFragment {
    EditText etPass,etNewPass,etRepeatPass;

    public static UpdatePassDialogFragment newInstance() { return new UpdatePassDialogFragment(); }

    public Dialog onCreateDialog(Bundle savedInstanceState) {
            // Use the Builder class for convenient dialog construction
            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            LayoutInflater inflater = getActivity().getLayoutInflater();
            View view = inflater.inflate(R.layout.dialog_update_pass, null);
            etPass = view.findViewById(R.id.editTextPass);
            etNewPass = view.findViewById(R.id.editTextNewPass);
            etRepeatPass = view.findViewById(R.id.editTextRepeatPass);

            builder.setView(view);
            builder.setTitle("Cambiar contraseña");
            builder.setPositiveButton("Cambiar", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                    if(!etNewPass.getText().toString().equals(etRepeatPass.getText().toString()))
                        Toast.makeText(getActivity(), "Las contraseñas no son iguales", Toast.LENGTH_SHORT).show();

                    else
                        updatePass(getActivity());

                }
            })
                    .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.dismiss();
                        }
                    });


            return builder.create();
        }

    public void updatePass(final Context ctx) {

        String credentials = Credentials.basic(UtilUser.getEmail(getActivity()), etPass.getText().toString());
        String idUser = UtilUser.getId(getActivity());
        PassDto newPass = new PassDto(etNewPass.getText().toString());
        AuthService service = ServiceGenerator.createService(AuthService.class);
        Call<User> call = service.updatePass(credentials, idUser, newPass);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.code() == 400){
                    Toast.makeText(ctx, "Alguna contraseña no cumple el minimo de caracteres", Toast.LENGTH_SHORT).show();
                }
                if (response.code() == 401){
                    Toast.makeText(ctx, "Contraseña incorrecta", Toast.LENGTH_SHORT).show();
                }
                if (response.code() != 200) {
                    // error
                    Log.e("RequestError", response.message());

                } else {

                    Toast.makeText(ctx, "Contraseña cambiada", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

    }



}
