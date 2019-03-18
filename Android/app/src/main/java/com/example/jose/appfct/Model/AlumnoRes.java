package com.example.jose.appfct.Model;

public class AlumnoRes {

    private String nombre;
    private int telefono;
    private String empresa;
    private String alumnoid;
    private String visita;
    private String id;

    public AlumnoRes(String nombre, int telefono, String empresa, String alumnoid, String visita, String id) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.empresa = empresa;
        this.alumnoid = alumnoid;
        this.visita = visita;
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AlumnoRes alumnoRes = (AlumnoRes) o;

        if (telefono != alumnoRes.telefono) return false;
        if (nombre != null ? !nombre.equals(alumnoRes.nombre) : alumnoRes.nombre != null)
            return false;
        if (empresa != null ? !empresa.equals(alumnoRes.empresa) : alumnoRes.empresa != null)
            return false;
        if (alumnoid != null ? !alumnoid.equals(alumnoRes.alumnoid) : alumnoRes.alumnoid != null)
            return false;
        if (visita != null ? !visita.equals(alumnoRes.visita) : alumnoRes.visita != null)
            return false;
        return id != null ? id.equals(alumnoRes.id) : alumnoRes.id == null;
    }

    @Override
    public int hashCode() {
        int result = nombre != null ? nombre.hashCode() : 0;
        result = 31 * result + telefono;
        result = 31 * result + (empresa != null ? empresa.hashCode() : 0);
        result = 31 * result + (alumnoid != null ? alumnoid.hashCode() : 0);
        result = 31 * result + (visita != null ? visita.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        return result;
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

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String getAlumnoid() {
        return alumnoid;
    }

    public void setAlumnoid(String alumnoid) {
        this.alumnoid = alumnoid;
    }

    public String getVisita() {
        return visita;
    }

    public void setVisita(String visita) {
        this.visita = visita;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "AlumnoRes{" +
                "nombre='" + nombre + '\'' +
                ", telefono=" + telefono +
                ", empresa='" + empresa + '\'' +
                ", alumnoid='" + alumnoid + '\'' +
                ", visita='" + visita + '\'' +
                ", id='" + id + '\'' +
                '}';
    }
}
