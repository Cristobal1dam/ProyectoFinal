package com.example.jose.appfct.ViewModels;

import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

import com.example.jose.appfct.Model.Visita;

import java.util.List;

public class VisitaViewModel extends ViewModel{

    private final MutableLiveData<String> idAlumno = new MutableLiveData<>();
    private final MutableLiveData<String> idVisita = new MutableLiveData<>();
    private final MutableLiveData<List<Visita>> listaVisitas = new MutableLiveData<>();

    public void selectidVisita(String id) {
        idVisita.setValue(id);
    }
    public MutableLiveData<String> getSelectedidVisita() { return idVisita; }

    public void selectIdAlumno(String id) {
        idAlumno.setValue(id);
    }
    public MutableLiveData<String> getSelectedIdAlumno() {
        return idAlumno;
    }

    public void selectVisitaList(List<Visita> visitas) {
        listaVisitas.setValue(visitas);
    }


    public MutableLiveData<List<Visita>> getAll() { return listaVisitas; }

}
