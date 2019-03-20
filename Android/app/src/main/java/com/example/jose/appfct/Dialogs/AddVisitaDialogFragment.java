package com.example.jose.appfct.Dialogs;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.TimePickerDialog;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TimePicker;
import android.widget.Toast;

import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Model.Alumno;
import com.example.jose.appfct.Model.Visita;
import com.example.jose.appfct.Model.VisitaDto;
import com.example.jose.appfct.R;
import com.example.jose.appfct.Services.AlumnoService;
import com.example.jose.appfct.Services.VisitaService;
import com.example.jose.appfct.ViewModels.VisitaViewModel;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddVisitaDialogFragment extends DialogFragment {

    private static final String CERO = "0";
    private static final String BARRA = "/";
    private static final String GUION = "-";
    private static final String DOS_PUNTOS = ":";

    //Calendario para obtener fecha & hora
    public final Calendar c = Calendar.getInstance();

    //Variables para obtener la fecha
    final int mes = c.get(Calendar.MONTH);
    final int dia = c.get(Calendar.DAY_OF_MONTH);
    final int anio = c.get(Calendar.YEAR);
    final int hora = c.get(Calendar.HOUR_OF_DAY);
    final int minuto = c.get(Calendar.MINUTE);

    ImageView ivDate,ivTime;
    EditText etDate, etTime, etTitulo;
    String fechaCompleta, date, time;

    public static AddVisitaDialogFragment newInstance() {
        return new AddVisitaDialogFragment();
    }

    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        LayoutInflater inflater = getActivity().getLayoutInflater();
        View view = inflater.inflate(R.layout.dialog_add_visita, null);
        ivDate = view.findViewById(R.id.imageViewFecha);
        ivTime = view.findViewById(R.id.imageViewHora);
        etDate = view.findViewById(R.id.editTextDate);
        etTime = view.findViewById(R.id.editTextTime);
        etTitulo = view.findViewById(R.id.editTextTitulo);

        ivDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                obtenerFecha();
            }
        });

        ivTime.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                obtenerHora();
            }
        });



        builder.setView(view);
        builder.setTitle("Añadir visita");

        builder.setPositiveButton("Añadir", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                fechaCompleta = date + " " + time;
                VisitaDto visita = new VisitaDto(etTitulo.getText().toString(), fechaCompleta);
                addVisita(getActivity(), visita);

            }
        })
                .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.dismiss();
                    }
                });


        return builder.create();
    }
    private void obtenerFecha(){
        DatePickerDialog recogerFecha = new DatePickerDialog(getActivity(), new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                //Esta variable lo que realiza es aumentar en uno el mes ya que comienza desde 0 = enero
                final int mesActual = month + 1;
                //Formateo el día obtenido: antepone el 0 si son menores de 10
                String diaFormateado = (dayOfMonth < 10)? CERO + String.valueOf(dayOfMonth):String.valueOf(dayOfMonth);
                //Formateo el mes obtenido: antepone el 0 si son menores de 10
                String mesFormateado = (mesActual < 10)? CERO + String.valueOf(mesActual):String.valueOf(mesActual);
                //Muestro la fecha con el formato deseado
                etDate.setText(diaFormateado + BARRA + mesFormateado + BARRA + year);
                date=  year + GUION + mesFormateado + GUION + diaFormateado;



            }
            //Estos valores deben ir en ese orden, de lo contrario no mostrara la fecha actual
            /**
             *También puede cargar los valores que usted desee
             */
        },anio, mes, dia);
        //Muestro el widget
        recogerFecha.show();

    }

    private void obtenerHora(){
        TimePickerDialog recogerHora = new TimePickerDialog(getActivity(), new TimePickerDialog.OnTimeSetListener() {
            @Override
            public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                //Formateo el hora obtenido: antepone el 0 si son menores de 10
                String horaFormateada =  (hourOfDay < 10)? String.valueOf(CERO + hourOfDay) : String.valueOf(hourOfDay);
                //Formateo el minuto obtenido: antepone el 0 si son menores de 10
                String minutoFormateado = (minute < 10)? String.valueOf(CERO + minute):String.valueOf(minute);
                //Obtengo el valor a.m. o p.m., dependiendo de la selección del usuario
                String AM_PM;
                if(hourOfDay < 12) {
                    AM_PM = "a.m.";
                } else {
                    AM_PM = "p.m.";
                }
                //Muestro la hora con el formato deseado
                etTime.setText(horaFormateada + DOS_PUNTOS + minutoFormateado + " " + AM_PM);
                time = String.valueOf(hourOfDay) + DOS_PUNTOS + minutoFormateado;
            }
            //Estos valores deben ir en ese orden
            //Al colocar en false se muestra en formato 12 horas y true en formato 24 horas
            //Pero el sistema devuelve la hora en formato 24 horas
        }, hora, minuto, false);

        recogerHora.show();
    }

    public void addVisita(final Context ctx, VisitaDto visita){

        final VisitaViewModel visitaViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(VisitaViewModel.class);


        VisitaService service = ServiceGenerator.createService(VisitaService.class);


        Call<Visita> call = service.addVisita(visitaViewModel.getSelectedIdAlumno().getValue(), visita);

        call.enqueue(new Callback<Visita>() {

            @Override
            public void onResponse(Call<Visita> call, Response<Visita> response) {
                if (response.code() != 201) {
                    Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(ctx, "Visita añadida", Toast.LENGTH_SHORT).show();
                    getVisitas(ctx);

                }
            }

            @Override
            public void onFailure(Call<Visita> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
            }


        });



    }


    public void getVisitas(final Context ctx){

        final VisitaViewModel visitaViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(VisitaViewModel.class);


        AlumnoService service = ServiceGenerator.createService(AlumnoService.class);


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
}
