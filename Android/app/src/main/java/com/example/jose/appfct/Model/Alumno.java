package com.example.jose.appfct.Model;

import java.util.List;

public class Alumno {
    private String nombre;
    private int telefono;
    private String email;
    private String id;
    private Tutor tutor;
    private List<Visita> visitas;

    public Alumno(String nombre, int telefono, String email, String id, Tutor tutor, List<Visita> visitas) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.id = id;
        this.tutor = tutor;
        this.visitas = visitas;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public List<Visita> getVisitas() {
        return visitas;
    }

    public void setVisitas(List<Visita> visitas) {
        this.visitas = visitas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Alumno alumno = (Alumno) o;

        if (telefono != alumno.telefono) return false;
        if (nombre != null ? !nombre.equals(alumno.nombre) : alumno.nombre != null) return false;
        if (email != null ? !email.equals(alumno.email) : alumno.email != null) return false;
        if (id != null ? !id.equals(alumno.id) : alumno.id != null) return false;
        if (tutor != null ? !tutor.equals(alumno.tutor) : alumno.tutor != null) return false;
        return visitas != null ? visitas.equals(alumno.visitas) : alumno.visitas == null;
    }

    @Override
    public int hashCode() {
        int result = nombre != null ? nombre.hashCode() : 0;
        result = 31 * result + telefono;
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (tutor != null ? tutor.hashCode() : 0);
        result = 31 * result + (visitas != null ? visitas.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Alumno{" +
                "nombre='" + nombre + '\'' +
                ", telefono=" + telefono +
                ", email='" + email + '\'' +
                ", id='" + id + '\'' +
                ", tutor=" + tutor +
                ", visitas=" + visitas +
                '}';
    }
}
