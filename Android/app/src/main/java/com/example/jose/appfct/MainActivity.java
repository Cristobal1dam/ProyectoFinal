package com.example.jose.appfct;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.jose.appfct.Fragments.AlumnosFragment;
import com.example.jose.appfct.Model.AlumnoRes;

public class MainActivity extends AppCompatActivity implements AlumnosFragment.OnListFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_main, new AlumnosFragment())
                .commit();
    }

    @Override
    public void onListFragmentInteraction(AlumnoRes item) {

    }
}
