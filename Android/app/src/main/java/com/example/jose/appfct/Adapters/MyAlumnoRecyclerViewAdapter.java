package com.example.jose.appfct.Adapters;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.jose.appfct.AlumnoDetalleActivity;
import com.example.jose.appfct.Fragments.AlumnosFragment.OnListFragmentInteractionListener;
import com.example.jose.appfct.Model.AlumnoRes;
import com.example.jose.appfct.Model.Visita;
import com.example.jose.appfct.R;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class MyAlumnoRecyclerViewAdapter extends RecyclerView.Adapter<MyAlumnoRecyclerViewAdapter.ViewHolder> {

    private List<AlumnoRes> mValues;
    private List<AlumnoRes> mValuesFiltered;
    private final OnListFragmentInteractionListener mListener;
    private Context contexto;

    public MyAlumnoRecyclerViewAdapter(Context ctx, List<AlumnoRes> items, OnListFragmentInteractionListener listener) {
        contexto= ctx;
        mValues = items;
        mListener = listener;
    }

    public void setNuevosAlumnos(List<AlumnoRes> nuevosAlumnos) {
        this.mValues = nuevosAlumnos;
        notifyDataSetChanged();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_alumno, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.tvNombre.setText(holder.mItem.getNombre());
        holder.tvEmpresa.setText(holder.mItem.getEmpresa());

        if(holder.mItem.getVisita() != null){
        SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat outputFormat = new SimpleDateFormat("d MMM HH:mm");
        Date date = null;
        try {
            date = inputFormat.parse(holder.mItem.getVisita());
        } catch (ParseException e) {
            e.printStackTrace();
        }

        String formattedDate = outputFormat.format(date);
        holder.tvVisita.setText(formattedDate);
        }else{
            holder.tvVisita.setText("No tiene visitas");
        }


        holder.ivTelefono.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String uri = "tel:" + Integer.toString(holder.mItem.getTelefono()).trim() ;
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse(uri));
                contexto.startActivity(intent);
            }
        });

        holder.cvAlumno.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(contexto, AlumnoDetalleActivity.class);
                i.putExtra("id", holder.mItem.getAlumnoid() );

                contexto.startActivity(i);
                ((Activity)contexto).overridePendingTransition( R.anim.fadein, R.anim.fadeout);

                ((Activity)contexto).finish();


            }
        });




    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }





    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public AlumnoRes mItem;
        public TextView tvNombre,tvEmpresa,tvVisita;
        public ImageView ivTelefono;
        public CardView cvAlumno;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            tvNombre = view.findViewById(R.id.textViewNombreAlumno);
            tvEmpresa = view.findViewById(R.id.textViewEmpresa);
            tvVisita = view.findViewById(R.id.textViewVisita);
            ivTelefono = view.findViewById(R.id.imageViewTelefono);
            cvAlumno = view.findViewById(R.id.cardViewAlumno);
        }

        @Override
        public String toString() {
            return super.toString();
        }
    }
}
