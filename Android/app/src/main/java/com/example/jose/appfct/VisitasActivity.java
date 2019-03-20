package com.example.jose.appfct;

import android.arch.lifecycle.ViewModelProviders;
import android.content.Intent;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.example.jose.appfct.Dialogs.AddVisitaDialogFragment;
import com.example.jose.appfct.Dialogs.EliminarVisitaDialogFragment;
import com.example.jose.appfct.Fragments.VisitaFragment;
import com.example.jose.appfct.ViewModels.VisitaViewModel;

public class VisitasActivity extends AppCompatActivity implements VisitaFragment.OnListFragmentInteractionListener {
    VisitaViewModel visitaViewModel;
    String idAlumno;
    FloatingActionButton fab;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        Bundle extras = getIntent().getExtras();
        idAlumno = extras.getString("id");
        getSupportActionBar().setTitle(extras.getString("nombre"));
        visitaViewModel = ViewModelProviders.of(VisitasActivity.this)
                .get(VisitaViewModel.class);
        visitaViewModel.selectIdAlumno(idAlumno);
        setContentView(R.layout.activity_visitas);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_visitas, new VisitaFragment())
                .commit();

        fab = findViewById(R.id.fabMain);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AddVisitaDialogFragment dialogoAdd = AddVisitaDialogFragment.newInstance();
                dialogoAdd.show((VisitasActivity.this).getSupportFragmentManager(), "dialog");
            }
        });



    }



    @Override
    public void onListFragmentInteraction() {

    }
}
