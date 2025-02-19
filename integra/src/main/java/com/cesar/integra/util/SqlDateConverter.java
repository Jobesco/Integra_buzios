package com.cesar.integra.util;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class SqlDateConverter {

    public static String toString(List<LocalDate> dates) {
        return dates.stream()
                .map(LocalDate::toString)
                .collect(Collectors.joining("|"));
    }

    public static List<LocalDate> toList(String dateString) {
        return Arrays.stream(dateString.split("\\|"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> {
                    try {
                        return LocalDate.parse(s);
                    } catch (Exception e) {
                        throw new IllegalArgumentException("Data inválida no formato esperado: " + s, e);
                    }
                })
                .collect(Collectors.toList());
    }
}
