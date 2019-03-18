package com.example.jose.appfct.Model;

public class Tutor {
    private String nombre;
    private String email;
    private int telefono;
    private Empresa empresa;
    private String id;

    public Tutor(String nombre, String email, int telefono, Empresa empresa, String id) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.empresa = empresa;
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Tutor tutor = (Tutor) o;

        if (telefono != tutor.telefono) return false;
        if (nombre != null ? !nombre.equals(tutor.nombre) : tutor.nombre != null) return false;
        if (email != null ? !email.equals(tutor.email) : tutor.email != null) return false;
        if (empresa != null ? !empresa.equals(tutor.empresa) : tutor.empresa != null) return false;
        return id != null ? id.equals(tutor.id) : tutor.id == null;
    }

    @Override
    public int hashCode() {
        int result = nombre != null ? nombre.hashCode() : 0;
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + telefono;
        result = 31 * result + (empresa != null ? empresa.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Tutor{" +
                "nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", telefono=" + telefono +
                ", empresa=" + empresa +
                ", id='" + id + '\'' +
                '}';
    }
}
