package com.example.demo.Services;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;

import org.springframework.stereotype.Service;

import com.example.demo.Models.AgrModel;
import com.example.demo.Models.DataModel;

@Service
public class DataLoaderServiceImp implements DataLoaderService {

    private static final String PATH_TO_DATA = "./data/LR5.csv";
    private static final String PATH_TO_DATA2 = "./data/LR5_2.csv";

    @Override
    public List<DataModel> loadAllDataFromCSV() {

        List<DataModel> allData = new ArrayList<>();

        try {

            Scanner myReader = new Scanner(new File(PATH_TO_DATA));

            while (myReader.hasNextLine()) {

                List<String> data = Arrays.asList(myReader.nextLine().split(","));

                String reservoir = data.get(0).trim();
                String fischType = data.get(1).trim();
                Double M = Double.valueOf(data.get(2).trim());
                Double Q = Double.valueOf(data.get(3).trim());
                Integer C = Integer.valueOf(data.get(4).trim());
                Integer Z = Integer.valueOf(data.get(5).trim());
                Double K1 = Double.valueOf(data.get(6).trim());
                Double K2 = Double.valueOf(data.get(7).trim());

                allData.add(new DataModel(reservoir, fischType, M, Q, C, Z, K1, K2));
            }

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
        }

        return allData;
    }

    @Override
    public List<String> loadAllReservoirsFromCSV() {

        HashSet<String> reservoirs = new HashSet<String>();

        try {

            Scanner myReader = new Scanner(new File(PATH_TO_DATA));

            while (myReader.hasNextLine()) {

                List<String> data = Arrays.asList(myReader.nextLine().split(","));

                String reservoir = data.get(0).trim();

                reservoirs.add(reservoir);
            }

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
        }

        return new ArrayList<String>(reservoirs);
    }

    @Override
    public List<AgrModel> loadAllAgrModelFromCSV() {
        List<AgrModel> allData = new ArrayList<>();

        try {

            Scanner myReader = new Scanner(new File(PATH_TO_DATA2));

            while (myReader.hasNextLine()) {

                List<String> data = Arrays.asList(myReader.nextLine().split(","));

                String region = data.get(0).trim();
                Double arableLand = Double.valueOf(data.get(1).trim());
                Double haymakers = Double.valueOf(data.get(2).trim());
                Double pastures = Double.valueOf(data.get(3).trim());

                allData.add(new AgrModel(region, arableLand, haymakers, pastures));
            }

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
        }

        return allData;
    }

    @Override
    public List<String> loadAllRegionsFromCSV() {
        HashSet<String> regions = new HashSet<String>();

        try {

            Scanner myReader = new Scanner(new File(PATH_TO_DATA2));

            while (myReader.hasNextLine()) {

                List<String> data = Arrays.asList(myReader.nextLine().split(","));

                String reservoir = data.get(0).trim();

                regions.add(reservoir);
            }

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
        }

        return new ArrayList<String>(regions);
    }
}
