package com.cesar.integra.controller;

import com.cesar.integra.model.Registration;
import com.cesar.integra.service.RegistrationService;
import com.cesar.integra.model.User;
import  com.cesar.integra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/registration")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    private UserService userService;




}
