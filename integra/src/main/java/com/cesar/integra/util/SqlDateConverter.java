package com.cesar.integra.util;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class SqlDateConverter {

    public static String toString(List<Date> dates) {
        return dates.stream()
                .map(Date::toString)
                .collect(Collectors.joining("|"));
    }

    public static List<Date> toList(String dateString) {
        return Arrays.stream(dateString.split("\\|"))
                .map(Date::valueOf)
                .collect(Collectors.toList());
    }
}
