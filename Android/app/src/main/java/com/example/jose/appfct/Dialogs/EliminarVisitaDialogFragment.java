package com.example.jose.appfct.Dialogs;


import android.app.AlertDialog;
import android.app.Dialog;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.widget.Toast;

import com.example.jose.appfct.Adapters.MyVisitaRecyclerViewAdapter;
import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Generator.TipoAutenticacion;
import com.example.jose.appfct.Generator.UtilToken;
import com.example.jose.appfct.Generator.UtilUser;
import com.example.jose.appfct.Model.Alumno;
import com.example.jose.appfct.Model.UserAlumnos;
import com.example.jose.appfct.R;
import com.example.jose.appfct.Services.AlumnoService;
import com.example.jose.appfct.Services.VisitaService;
import com.example.jose.appfct.ViewModels.AlumnoViewModel;
import com.example.jose.appfct.ViewModels.VisitaViewModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class EliminarVisitaDialogFragment extends DialogFragment {

    public static EliminarVisitaDialogFragment newInstance() {
        return new EliminarVisitaDialogFragment();
    }

    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        builder.setTitle("¿Desea eliminar la visita?");
        builder.setPositiveButton("Eliminar", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

                deleteVisita(getActivity());

            }
        })
                .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.dismiss();
                    }
                });


        return builder.create();
    }

    public void deleteVisita(final Context ctx){

        final VisitaViewModel visitaViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(VisitaViewModel.class);


        VisitaService service = ServiceGenerator.createService(VisitaService.class,  UtilToken.getToken(ctx), TipoAutenticacion.JWT);


        Call<Alumno> call = service.deleteVisita(visitaViewModel.getSelectedidVisita().getValue());

        call.enqueue(new Callback<Alumno>() {

            @Override
            public void onResponse(Call<Alumno> call, Response<Alumno> response) {
                if (response.code() != 204) {
                    Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(ctx, "Visita eliminada", Toast.LENGTH_SHORT).show();
                    getVisitas(ctx);
                    getAlumnos(ctx);

                }
            }

            @Override
            public void onFailure(Call<Alumno> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
            }


        });



    }


    public void getVisitas(final Context ctx){

        final VisitaViewModel visitaViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(VisitaViewModel.class);


        AlumnoService service = ServiceGenerator.createService(AlumnoService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);


        Call<Alumno> call = service.getOneAlumno(visitaViewModel.getSelectedIdAlumno().getValue());

        call.enqueue(new Callback<Alumno>() {

            @Override
            public void onResponse(Call<Alumno> call, Response<Alumno> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                } else {
                    visitaViewModel.selectVisitaList(response.body().getVisitas());


                }
            }

            @Override
            public void onFailure(Call<Alumno> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
            }


        });


    }

    public void getAlumnos(final Context ctx){
        final AlumnoViewModel alumnoViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(AlumnoViewModel.class);
        AlumnoService service = ServiceGenerator.createService(AlumnoService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);
        String id = UtilUser.getId(ctx);
        Call<UserAlumnos> call = service.getAlumnosList(id);

        call.enqueue(new Callback<UserAlumnos>() {

            @Override
            public void onResponse(Call<UserAlumnos> call, Response<UserAlumnos> response) {
                if (response.code() != 200) {
                    Toast.makeText(getActivity(), "Error en petición", Toast.LENGTH_SHORT).show();
                } else {
                    alumnoViewModel.selectAlumnoAllList(response.body().getAlumnos());


                }
            }

            @Override
            public void onFailure(Call<UserAlumnos> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

}
