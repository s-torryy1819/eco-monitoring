package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Models.AgrModel;
import com.example.demo.Models.DataModel;
import com.example.demo.Services.DataLoaderService;

@RestController
public class AjaxController {

    @Autowired
    private DataLoaderService dataLoaderService;

    @GetMapping("/getDataSet")
    public List<DataModel> getData() {

        List<DataModel> dataModel = dataLoaderService.loadAllDataFromCSV();

        return dataModel;
    }

    @GetMapping("/getReservoirs")
    public List<String> getReservoirs() {

        List<String> dataModel = dataLoaderService.loadAllReservoirsFromCSV();

        return dataModel;
    }

    @GetMapping("/getArgSet")
    public List<AgrModel> getArgSet() {

        List<AgrModel> dataModel = dataLoaderService.loadAllAgrModelFromCSV();

        return dataModel;
    }

    @GetMapping("/getRegions")
    public List<String> getRegions() {

        List<String> dataModel = dataLoaderService.loadAllRegionsFromCSV();

        return dataModel;
    }
}
