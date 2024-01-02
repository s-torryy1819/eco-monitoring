package com.example.demo.Services;

import java.util.List;

import com.example.demo.Models.AgrModel;
import com.example.demo.Models.DataModel;

public interface DataLoaderService {

    public List<DataModel> loadAllDataFromCSV();

    public List<String> loadAllReservoirsFromCSV();

    public List<AgrModel> loadAllAgrModelFromCSV();

    public List<String> loadAllRegionsFromCSV();

}