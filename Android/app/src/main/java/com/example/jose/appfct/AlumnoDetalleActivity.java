package com.example.jose.appfct;

import android.arch.lifecycle.ViewModelProviders;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.jose.appfct.Adapters.MyAlumnoRecyclerViewAdapter;
import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Model.Alumno;
import com.example.jose.appfct.Model.Empresa;
import com.example.jose.appfct.Model.Tutor;
import com.example.jose.appfct.Model.UserAlumnos;
import com.example.jose.appfct.Services.AlumnoService;
import com.example.jose.appfct.ViewModels.VisitaViewModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AlumnoDetalleActivity extends AppCompatActivity {
    TextView tvNombreAlumno,tvNombreTutor,tvTelefonoAlumno,tvTelefonoTutor,tvEmailAlumno,tvEmailTutor,tvEmpresa,tvDireccion;
    ImageView ivTelefonoAlumno,ivTelefonoTutor, ivEmailAlumno, ivEmailTutor, ivDireccion;
    String idAlumno;
    Alumno alumno;
    Tutor tutor;
    Empresa empresa;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_alumno_detalle);

        findViews();


        Bundle extras = getIntent().getExtras();
        idAlumno = extras.getString("id");


        AlumnoService service = ServiceGenerator.createService(AlumnoService.class);

        Call<Alumno> call = service.getOneAlumno(idAlumno);

        call.enqueue(new Callback<Alumno>() {

            @Override
            public void onResponse(Call<Alumno> call, Response<Alumno> response) {
                if (response.code() != 200) {
                    Toast.makeText(AlumnoDetalleActivity.this, "Error en petición", Toast.LENGTH_SHORT).show();
                } else {
                    alumno = response.body();
                    tutor = alumno.getTutor();
                    empresa = tutor.getEmpresa();
                    tvNombreAlumno.setText(alumno.getNombre());
                    tvEmailAlumno.setText(alumno.getEmail());
                    tvTelefonoAlumno.setText(Integer.toString(alumno.getTelefono()));
                    tvNombreTutor.setText(tutor.getNombre());
                    tvTelefonoTutor.setText(Integer.toString(tutor.getTelefono()));
                    tvEmailTutor.setText(tutor.getEmail());
                    tvEmpresa.setText(empresa.getNombre());
                    tvDireccion.setText(empresa.getDireccion());


                    setIntentLlamada(tvTelefonoAlumno,Integer.toString(alumno.getTelefono()));
                    setIntentLlamada(ivTelefonoAlumno,Integer.toString(alumno.getTelefono()));

                    setIntentLlamada(tvTelefonoTutor, Integer.toString(tutor.getTelefono()));
                    setIntentLlamada(ivTelefonoTutor, Integer.toString(tutor.getTelefono()));

                    setIntentEmail(tvEmailAlumno, alumno.getEmail());
                    setIntentEmail(ivEmailAlumno, alumno.getEmail());

                    setIntentEmail(tvEmailTutor, tutor.getEmail());
                    setIntentEmail(ivEmailTutor, tutor.getEmail());

                    String[] latlong =  empresa.getLoc().split(",");
                    String latitude = latlong[0];
                    String longitude = latlong[1];

                    setIntentMapa(tvDireccion, longitude,latitude);
                    setIntentMapa(ivDireccion, longitude,latitude);


                }
            }

            @Override
            public void onFailure(Call<Alumno> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(AlumnoDetalleActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }


        });
    }

    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.toolbar_detalle, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()) {
            case R.id.action_visitas:
                Intent i = new Intent(AlumnoDetalleActivity.this, VisitasActivity.class);
                i.putExtra("id", idAlumno );
                AlumnoDetalleActivity.this.startActivity(i);
                break;
        }
        return true;
    }

    private void findViews() {
        tvNombreAlumno = findViewById(R.id.textViewAlumnoNombre);
        tvNombreTutor = findViewById(R.id.textViewNombreTutor);
        tvTelefonoAlumno = findViewById(R.id.textViewTelefonoAlumno);
        tvTelefonoTutor = findViewById(R.id.textViewTelefonoTutor);
        tvEmailAlumno = findViewById(R.id.textViewEmailAlumno);
        tvEmailTutor = findViewById(R.id.textViewEmailTutor);
        tvEmpresa = findViewById(R.id.textViewEmpresa);
        tvDireccion = findViewById(R.id.textViewDireccion);
        ivTelefonoAlumno = findViewById(R.id.imageViewTelefonoAlumno);
        ivTelefonoTutor = findViewById(R.id.imageViewTelefonoTutor);
        ivEmailAlumno = findViewById(R.id.imageViewEmailAlumno);
        ivEmailTutor = findViewById(R.id.imageViewEmailTutor);
        ivDireccion = findViewById(R.id.imageViewDireccion);

    }

    private void setIntentLlamada(View view, final String telefono){
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String uri = "tel:" + telefono ;
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse(uri));
                AlumnoDetalleActivity.this.startActivity(intent);
            }
        });
    }

    private void setIntentMapa(View view, final String lon, final String lat){
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String strUri = "http://maps.google.com/maps?q=loc:" + lat + "," + lon;
                Intent intent = new Intent(android.content.Intent.ACTION_VIEW, Uri.parse(strUri));
                intent.setClassName("com.google.android.apps.maps", "com.google.android.maps.MapsActivity");
                AlumnoDetalleActivity.this.startActivity(intent);

            }
        });

    }

    private void setIntentEmail(View view, final String email){
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                        "mailto",email, null));
                startActivity(Intent.createChooser(emailIntent, "Send email..."));
            }
        });

    }
}
