package com.example.jose.appfct.Adapters;

import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.jose.appfct.Dialogs.EliminarVisitaDialogFragment;
import com.example.jose.appfct.Fragments.VisitaFragment.OnListFragmentInteractionListener;
import com.example.jose.appfct.Generator.ServiceGenerator;
import com.example.jose.appfct.Model.Alumno;
import com.example.jose.appfct.Model.Visita;
import com.example.jose.appfct.R;
import com.example.jose.appfct.Services.AlumnoService;
import com.example.jose.appfct.Services.VisitaService;
import com.example.jose.appfct.ViewModels.VisitaViewModel;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyVisitaRecyclerViewAdapter extends RecyclerView.Adapter<MyVisitaRecyclerViewAdapter.ViewHolder> {

    private List<Visita> mValues;
    private final OnListFragmentInteractionListener mListener;
    private Context contexto;
    private VisitaViewModel mViewModel;

    public MyVisitaRecyclerViewAdapter(Context ctx, List<Visita> items, OnListFragmentInteractionListener listener) {
        contexto = ctx;
        mValues = items;
        mListener = listener;
    }

    public void setNuevasVisitas(List<Visita> nuevasVisitas) {
        this.mValues = nuevasVisitas;
        notifyDataSetChanged();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_visita, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);

        if(holder.mItem.getFecha() != null) {
            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            SimpleDateFormat outputFormat = new SimpleDateFormat("d MMM HH:mm");
            Date date = null;
            try {
                date = inputFormat.parse(holder.mItem.getFecha());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            String formattedDate = outputFormat.format(date);

            holder.fecha.setText(formattedDate);
        }
        holder.titulo.setText(holder.mItem.getTitulo());

        if (holder.mItem.isRealizada()) {
            holder.noRealizado.setVisibility(View.GONE);
            holder.realizado.setVisibility(View.VISIBLE);
        } else {
            holder.realizado.setVisibility(View.GONE);
            holder.noRealizado.setVisibility(View.VISIBLE);
        }

        holder.realizado.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                realizarVisita(contexto, holder.mItem.get_id());
                Toast.makeText(contexto, "Visita marcada como no realizada", Toast.LENGTH_SHORT).show();
            }
        });
        holder.noRealizado.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                realizarVisita(contexto, holder.mItem.get_id());
                Toast.makeText(contexto, "Visita marcada como realizada", Toast.LENGTH_SHORT).show();
            }
        });

        holder.ivDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mViewModel = ViewModelProviders.of((FragmentActivity) contexto).get(VisitaViewModel.class);
                mViewModel.selectidVisita(holder.mItem.get_id());
                EliminarVisitaDialogFragment dialogoEliminar = EliminarVisitaDialogFragment.newInstance();
                dialogoEliminar.show(((FragmentActivity) contexto).getSupportFragmentManager(), "dialog");
            }
        });


    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public Visita mItem;
        public TextView fecha, titulo;
        public ImageView realizado, noRealizado, ivDelete;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            fecha = view.findViewById(R.id.textViewFecha);
            titulo = view.findViewById(R.id.textViewTitulo);
            realizado = view.findViewById(R.id.imageViewRealizado);
            noRealizado = view.findViewById(R.id.imageViewNoRealizado);
            ivDelete = view.findViewById(R.id.imageViewDelete);
        }

        @Override
        public String toString() {
            return super.toString() + " '";
        }
    }

    public void realizarVisita(final Context ctx, String idVisita) {


        VisitaService service = ServiceGenerator.createService(VisitaService.class);


        Call<Alumno> call = service.visitaRealizada(idVisita);

        call.enqueue(new Callback<Alumno>() {

            @Override
            public void onResponse(Call<Alumno> call, Response<Alumno> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                } else {

                    getVisitas(ctx);

                }
            }

            @Override
            public void onFailure(Call<Alumno> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();
            }


        });


    }


    public void getVisitas(final Context ctx) {

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
