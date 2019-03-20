package com.example.jose.appfct.Model;

public class VisitaDto {
    private String titulo;
    private String fecha;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VisitaDto visitaDto = (VisitaDto) o;

        if (titulo != null ? !titulo.equals(visitaDto.titulo) : visitaDto.titulo != null)
            return false;
        return fecha != null ? fecha.equals(visitaDto.fecha) : visitaDto.fecha == null;
    }

    @Override
    public int hashCode() {
        int result = titulo != null ? titulo.hashCode() : 0;
        result = 31 * result + (fecha != null ? fecha.hashCode() : 0);
        return result;
    }

    public VisitaDto(String titulo, String fecha) {
        this.titulo = titulo;
        this.fecha = fecha;
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
    public String toString() {
        return "VisitaDto{" +
                "titulo='" + titulo + '\'' +
                ", fecha='" + fecha + '\'' +
                '}';
    }
}
