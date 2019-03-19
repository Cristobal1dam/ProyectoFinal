package com.example.jose.appfct.Adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.jose.appfct.Fragments.VisitaFragment.OnListFragmentInteractionListener;
import com.example.jose.appfct.Model.Visita;
import com.example.jose.appfct.R;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


public class MyVisitaRecyclerViewAdapter extends RecyclerView.Adapter<MyVisitaRecyclerViewAdapter.ViewHolder> {

    private final List<Visita> mValues;
    private final OnListFragmentInteractionListener mListener;
    private Context contexto;

    public MyVisitaRecyclerViewAdapter(Context ctx,List<Visita> items, OnListFragmentInteractionListener listener) {
        contexto = ctx;
        mValues = items;
        mListener = listener;
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
        holder.titulo.setText(holder.mItem.getTitulo());

        if(holder.mItem.isRealizada()){
            holder.realizado.setVisibility(View.GONE);
        }else{
            holder.noRealizado.setVisibility(View.GONE);
        }



    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public Visita mItem;
        public TextView fecha, titulo;
        public ImageView realizado, noRealizado;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            fecha = view.findViewById(R.id.textViewFecha);
            titulo = view.findViewById(R.id.textViewTitulo);
            realizado = view.findViewById(R.id.imageViewRealizado);
            noRealizado = view.findViewById(R.id.imageViewNoRealizado);
        }

        @Override
        public String toString() {
            return super.toString() + " '" ;
        }
    }
}
