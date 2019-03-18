package com.example.jose.appfct.Model;

public class Empresa {
     private String nombre;
     private String direccion;
     private String loc;
     private String id;

    public Empresa(String nombre, String direccion, String loc, String id) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.loc = loc;
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Empresa empresa = (Empresa) o;

        if (nombre != null ? !nombre.equals(empresa.nombre) : empresa.nombre != null) return false;
        if (direccion != null ? !direccion.equals(empresa.direccion) : empresa.direccion != null)
            return false;
        if (loc != null ? !loc.equals(empresa.loc) : empresa.loc != null) return false;
        return id != null ? id.equals(empresa.id) : empresa.id == null;
    }

    @Override
    public int hashCode() {
        int result = nombre != null ? nombre.hashCode() : 0;
        result = 31 * result + (direccion != null ? direccion.hashCode() : 0);
        result = 31 * result + (loc != null ? loc.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        return result;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Empresa{" +
                "nombre='" + nombre + '\'' +
                ", direccion='" + direccion + '\'' +
                ", loc='" + loc + '\'' +
                ", id='" + id + '\'' +
                '}';
    }
}
