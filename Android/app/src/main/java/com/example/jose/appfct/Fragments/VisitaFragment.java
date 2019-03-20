package com.example.jose.appfct.Fragments;

import android.arch.lifecycle.Observer;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.jose.appfct.Adapters.MyVisitaRecyclerViewAdapter;
import com.example.jose.appfct.AlumnoDetalleActivity;
import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Generator.TipoAutenticacion;
import com.example.jose.appfct.Generator.UtilToken;
import com.example.jose.appfct.Model.Alumno;
import com.example.jose.appfct.Model.Visita;
import com.example.jose.appfct.R;
import com.example.jose.appfct.Services.AlumnoService;
import com.example.jose.appfct.ViewModels.VisitaViewModel;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link OnListFragmentInteractionListener}
 * interface.
 */
public class VisitaFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    private MyVisitaRecyclerViewAdapter adapter;
    VisitaViewModel visitaViewModel;
    Context ctx;
    List<Visita> visitaList;
    String idAlumno;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public VisitaFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static VisitaFragment newInstance(int columnCount) {
        VisitaFragment fragment = new VisitaFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_visita_list, container, false);


        if (view instanceof RecyclerView) {
            ctx = view.getContext();
            final RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            visitaViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                    .get(VisitaViewModel.class);


            AlumnoService service = ServiceGenerator.createService(AlumnoService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);

            idAlumno = visitaViewModel.getSelectedIdAlumno().getValue();

            Call<Alumno> call = service.getOneAlumno(idAlumno);

            call.enqueue(new Callback<Alumno>() {

                @Override
                public void onResponse(Call<Alumno> call, Response<Alumno> response) {
                    if (response.code() != 200) {
                        Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                    } else {
                        visitaList = response.body().getVisitas();

                        adapter = new MyVisitaRecyclerViewAdapter(
                                ctx,
                                visitaList,
                                mListener
                        );
                        recyclerView.setAdapter(adapter);
                    }
                }

                @Override
                public void onFailure(Call<Alumno> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
                }


            });
            lanzarViewModel(ctx);
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    private void lanzarViewModel(Context ctx) {
        VisitaViewModel comentarioViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(VisitaViewModel.class);
        comentarioViewModel.getAll().observe(getActivity(), new Observer<List<Visita>>() {
            @Override
            public void onChanged(@Nullable List<Visita> visitas) {
                adapter.setNuevasVisitas(visitas);
            }
        });
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        void onListFragmentInteraction();
    }
}
