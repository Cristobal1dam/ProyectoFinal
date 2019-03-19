package com.example.jose.appfct.ViewModels;

import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

public class VisitaViewModel extends ViewModel{

    private final MutableLiveData<String> idAlumno = new MutableLiveData<>();

    public void selectIdAlumno(String id) {
        idAlumno.setValue(id);
    }
    public MutableLiveData<String> getSelectedIdAlumno() {
        return idAlumno;
    }

}
