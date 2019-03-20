package com.example.jose.appfct;


import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.app.SearchManager;
import android.support.v7.widget.SearchView;
import android.widget.SearchView.OnQueryTextListener;

import com.example.jose.appfct.Fragments.AlumnosFragment;
import com.example.jose.appfct.Model.AlumnoRes;

public class MainActivity extends AppCompatActivity implements AlumnosFragment.OnListFragmentInteractionListener {
    private SearchView searchView;
    private AlumnosFragment alumnosFragment;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        setContentView(R.layout.activity_main);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_main,new AlumnosFragment(),"AlumnosFragment")
                .commit();

        alumnosFragment = ((AlumnosFragment) getSupportFragmentManager().findFragmentByTag("AlumnosFragment"));


    }


    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.toolbar_lista, menu);
        return true;

        // Associate searchable configuration with the SearchView
        /*SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        searchView = (SearchView) menu.findItem(R.id.action_search)
                .getActionView();
        searchView.setSearchableInfo(searchManager
                .getSearchableInfo(getComponentName()));
        searchView.setMaxWidth(Integer.MAX_VALUE);

        // listening to search query text change
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                // filter recycler view when query submitted
                alumnosFragment.getAdapter().getFilter().filter(query);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String query) {
                // filter recycler view when text is changed
                alumnosFragment.getAdapter().getFilter().filter(query);
                return false;
            }
        });
        return true;
    }*/
    }

    @Override
    public void onListFragmentInteraction(AlumnoRes item) {

    }
}
