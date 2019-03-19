package com.example.jose.appfct;

import android.arch.lifecycle.ViewModelProviders;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.jose.appfct.Fragments.VisitaFragment;
import com.example.jose.appfct.ViewModels.VisitaViewModel;

public class VisitasActivity extends AppCompatActivity implements VisitaFragment.OnListFragmentInteractionListener {
    VisitaViewModel visitaViewModel;
    String idAlumno;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Bundle extras = getIntent().getExtras();
        idAlumno = extras.getString("id");
        visitaViewModel = ViewModelProviders.of(VisitasActivity.this)
                .get(VisitaViewModel.class);
        visitaViewModel.selectIdAlumno(idAlumno);
        setContentView(R.layout.activity_visitas);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_visitas, new VisitaFragment())
                .commit();

    }

    @Override
    public void onListFragmentInteraction() {

    }
}
