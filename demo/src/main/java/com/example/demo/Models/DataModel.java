package com.example.demo.Models;

public class DataModel {
    private String reservoir;
    private String fischType;
    private Double M;
    private Double Q;
    private Integer C;
    private Integer Z;
    private Double K1;
    private Double K2;

    private Double S;
    private Double P;
    private Double PproHektar;
    private Double P1;
    private Double P2;

    public DataModel(String reservoir, String fischType, Double m, Double q, Integer c, Integer z, Double k1, Double k2,
            Double s,
            Double p, Double PproHektar, Double p1, Double p2) {
        this.reservoir = reservoir;
        this.fischType = fischType;
        M = m;
        Q = q;
        C = c;
        Z = z;
        K1 = k1;
        K2 = k2;
        S = s;
        P = p;
        this.PproHektar = PproHektar;
        P1 = p1;
        P2 = p2;
    }

    public DataModel(String reservoir, String fischType, Double m, Double q, Integer c, Integer z, Double k1,
            Double k2) {
        this.reservoir = reservoir;
        this.fischType = fischType;
        M = m;
        Q = q;
        C = c;
        Z = z;
        K1 = k1;
        K2 = k2;
    }

    public String getReservoir() {
        return reservoir;
    }

    public void setReservoir(String reservoir) {
        this.reservoir = reservoir;
    }

    public String getFischType() {
        return fischType;
    }

    public void setFischType(String fischType) {
        this.fischType = fischType;
    }

    public Double getM() {
        return M;
    }

    public void setM(Double m) {
        M = m;
    }

    public Double getQ() {
        return Q;
    }

    public void setQ(Double q) {
        Q = q;
    }

    public Integer getC() {
        return C;
    }

    public void setC(Integer c) {
        C = c;
    }

    public Integer getZ() {
        return Z;
    }

    public void setZ(Integer z) {
        Z = z;
    }

    public Double getK1() {
        return K1;
    }

    public void setK1(Double k1) {
        K1 = k1;
    }

    public Double getK2() {
        return K2;
    }

    public void setK2(Double k2) {
        K2 = k2;
    }

    public Double getS() {
        return S;
    }

    public void setS(Double s) {
        S = s;
    }

    public Double getP() {
        return P;
    }

    public void setP(Double p) {
        P = p;
    }

    public Double getP1() {
        return P1;
    }

    public void setP1(Double p1) {
        P1 = p1;
    }

    public Double getP2() {
        return P2;
    }

    public void setP2(Double p2) {
        P2 = p2;
    }

    /**
     * @return Double return the PproHektar
     */
    public Double getPproHektar() {
        return PproHektar;
    }

    /**
     * @param PproHektar the PproHektar to set
     */
    public void setPproHektar(Double PproHektar) {
        this.PproHektar = PproHektar;
    }

}
