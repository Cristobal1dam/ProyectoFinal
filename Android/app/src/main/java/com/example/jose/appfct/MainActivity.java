package com.example.jose.appfct;


import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.app.SearchManager;
import android.support.v7.widget.SearchView;
import android.view.MenuItem;
import android.widget.Filter;
import android.widget.SearchView.OnQueryTextListener;
import android.widget.Toolbar;

import com.example.jose.appfct.Fragments.AlumnosFragment;
import com.example.jose.appfct.Generator.UtilToken;
import com.example.jose.appfct.Generator.UtilUser;
import com.example.jose.appfct.Model.AlumnoRes;
import com.example.jose.appfct.ViewModels.AlumnoViewModel;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements AlumnosFragment.OnListFragmentInteractionListener, SearchView.OnQueryTextListener {
    private SearchView searchView;
    private AlumnosFragment alumnosFragment;
    private List<AlumnoRes> listAlumnosFiltered;
    private Toolbar toolbar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        setContentView(R.layout.activity_main);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_main,new AlumnosFragment())
                .commit();

        getSupportActionBar().setTitle(UtilUser.getNombre(MainActivity.this));

    }


    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.toolbar_lista, menu);
        MenuItem menuItem = menu.findItem(R.id.action_search);
        SearchView searchView = (SearchView) menuItem.getActionView();
        searchView.setOnQueryTextListener(this);
        return true;
    }

    @Override
    public void onListFragmentInteraction(AlumnoRes item) {

    }

    @Override
    public boolean onQueryTextSubmit(String s) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String s) {
        AlumnoViewModel alumnoViewModel = ViewModelProviders.of((FragmentActivity) MainActivity.this)
                .get(AlumnoViewModel.class);
        List<AlumnoRes> listAlumnos = alumnoViewModel.getTodos().getValue();

        String userInput = s.toLowerCase();
        if (userInput.isEmpty()) {
            listAlumnosFiltered = listAlumnos;
        } else {
            List<AlumnoRes> filteredList = new ArrayList<>();
            for (AlumnoRes row : listAlumnos) {

                // name match condition. this might differ depending on your requirement
                // here we are looking for name or phone number match
                if (row.getNombre().toLowerCase().contains(userInput) || row.getEmpresa().toLowerCase().contains(userInput)) {
                    filteredList.add(row);
                }
            }

            listAlumnosFiltered = filteredList;
        }

        alumnoViewModel.selectAlumnoList(listAlumnosFiltered);
        return true;
    }

    public void onBackPressed() {

        if (!(UtilToken.getToken(MainActivity.this) == null)) {

            AlertDialog.Builder builder = new AlertDialog.Builder(this);


            builder.setMessage(R.string.dialog_message)
                    .setTitle(R.string.dialog_title);


            builder.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {

                    UtilUser.clearSharedPreferences(MainActivity.this);
                    UtilToken.setToken(MainActivity.this, null);
                    startActivity(new Intent(MainActivity.this, SessionActivity.class));
                }
            });
            builder.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {

                    dialog.dismiss();
                }
            });

            AlertDialog dialog = builder.create();

            dialog.show();

        }else

            startActivity(new Intent(MainActivity.this, SessionActivity.class));

    }
}
