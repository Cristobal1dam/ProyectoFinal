package com.example.jose.appfct.Model;

public class Visita {
    private boolean realizada;
    private String _id;
    private String titulo;
    private String fecha;

    public Visita(boolean realizada, String _id, String titulo, String fecha) {
        this.realizada = realizada;
        this._id = _id;
        this.titulo = titulo;
        this.fecha = fecha;
    }

    public boolean isRealizada() {
        return realizada;
    }

    public void setRealizada(boolean realizada) {
        this.realizada = realizada;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Visita visita = (Visita) o;

        if (realizada != visita.realizada) return false;
        if (_id != null ? !_id.equals(visita._id) : visita._id != null) return false;
        if (titulo != null ? !titulo.equals(visita.titulo) : visita.titulo != null) return false;
        return fecha != null ? fecha.equals(visita.fecha) : visita.fecha == null;
    }

    @Override
    public int hashCode() {
        int result = (realizada ? 1 : 0);
        result = 31 * result + (_id != null ? _id.hashCode() : 0);
        result = 31 * result + (titulo != null ? titulo.hashCode() : 0);
        result = 31 * result + (fecha != null ? fecha.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Visita{" +
                "realizada=" + realizada +
                ", _id='" + _id + '\'' +
                ", titulo='" + titulo + '\'' +
                ", fecha='" + fecha + '\'' +
                '}';
    }
}
