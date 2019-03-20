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

import com.example.jose.appfct.Adapters.MyAlumnoRecyclerViewAdapter;
import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Generator.TipoAutenticacion;
import com.example.jose.appfct.Generator.UtilToken;
import com.example.jose.appfct.Generator.UtilUser;
import com.example.jose.appfct.MainActivity;
import com.example.jose.appfct.Model.AlumnoRes;
import com.example.jose.appfct.Model.UserAlumnos;
import com.example.jose.appfct.Model.Visita;
import com.example.jose.appfct.R;
import com.example.jose.appfct.Services.AlumnoService;
import com.example.jose.appfct.ViewModels.AlumnoViewModel;
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
public class AlumnosFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private Context ctx;
    private String id;
    private List<AlumnoRes> alumnoList;
    private MyAlumnoRecyclerViewAdapter adapter;
    private OnListFragmentInteractionListener mListener;
    private  AlumnoViewModel alumnoViewModel;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public AlumnosFragment() {
    }


    public MyAlumnoRecyclerViewAdapter getAdapter(){
        return adapter;
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static AlumnosFragment newInstance(int columnCount) {
        AlumnosFragment fragment = new AlumnosFragment();
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
        View view = inflater.inflate(R.layout.fragment_alumno_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            ctx = view.getContext();

            final RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            alumnoViewModel = ViewModelProviders.of((FragmentActivity) getActivity())
                    .get(AlumnoViewModel.class);
            AlumnoService service = ServiceGenerator.createService(AlumnoService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);
            id = UtilUser.getId(ctx);
            Call<UserAlumnos> call = service.getAlumnosList(id);

            call.enqueue(new Callback<UserAlumnos>() {

                @Override
                public void onResponse(Call<UserAlumnos> call, Response<UserAlumnos> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Error en petición", Toast.LENGTH_SHORT).show();
                    } else {
                        alumnoList = response.body().getAlumnos();


                        adapter = new MyAlumnoRecyclerViewAdapter(
                                ctx,
                                alumnoList,
                                mListener
                        );
                        recyclerView.setAdapter(adapter);

                        alumnoViewModel.selectAlumnoList(alumnoList);
                        alumnoViewModel.selectAlumnoAllList(alumnoList);
                    }
                }

                @Override
                public void onFailure(Call<UserAlumnos> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
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
        AlumnoViewModel alumnoViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(AlumnoViewModel.class);
        alumnoViewModel.getAll().observe(getActivity(), new Observer<List<AlumnoRes>>() {
            @Override
            public void onChanged(@Nullable List<AlumnoRes> alumnos) {
                adapter.setNuevosAlumnos(alumnos);
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
        void onListFragmentInteraction(AlumnoRes item);
    }
}
