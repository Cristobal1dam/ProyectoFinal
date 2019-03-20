package com.example.jose.appfct.ViewModels;

import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;


import com.example.jose.appfct.Model.AlumnoRes;
import com.example.jose.appfct.Model.Visita;

import java.util.List;

public class AlumnoViewModel extends ViewModel {

    private final MutableLiveData<List<AlumnoRes>> listaAlumnos = new MutableLiveData<>();

    private final MutableLiveData<List<AlumnoRes>> listaAllAlumnos = new MutableLiveData<>();

    public void selectAlumnoAllList(List<AlumnoRes> alumnos) {
        listaAllAlumnos.setValue(alumnos);
    }

    public MutableLiveData<List<AlumnoRes>> getTodos() { return listaAllAlumnos; }

    public void selectAlumnoList(List<AlumnoRes> alumnos) {
        listaAlumnos.setValue(alumnos);
    }

    public MutableLiveData<List<AlumnoRes>> getAll() { return listaAlumnos; }
}
