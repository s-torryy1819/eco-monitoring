package com.example.demo.Models;

public class AgrModel {
    private String region;
    private Double arableLand;
    private Double haymakers;
    private Double pastures;

    public AgrModel(String region, Double arableLand, Double haymakers, Double pastures) {
        this.region = region;
        this.arableLand = arableLand;
        this.haymakers = haymakers;
        this.pastures = pastures;
    }

    /**
     * @return String return the region
     */
    public String getRegion() {
        return region;
    }

    /**
     * @param region the region to set
     */
    public void setRegion(String region) {
        this.region = region;
    }

    /**
     * @return Double return the arableLand
     */
    public Double getArableLand() {
        return arableLand;
    }

    /**
     * @param arableLand the arableLand to set
     */
    public void setArableLand(Double arableLand) {
        this.arableLand = arableLand;
    }

    /**
     * @return Double return the haymakers
     */
    public Double getHaymakers() {
        return haymakers;
    }

    /**
     * @param haymakers the haymakers to set
     */
    public void setHaymakers(Double haymakers) {
        this.haymakers = haymakers;
    }

    /**
     * @return Double return the pastures
     */
    public Double getPastures() {
        return pastures;
    }

    /**
     * @param pastures the pastures to set
     */
    public void setPastures(Double pastures) {
        this.pastures = pastures;
    }

}
