package model;

import data.URepository;
import enumeration.Role;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import java.util.List;

public class DataContainer {

    @Inject
    URepository userRepository;

    public Role checkUser(UserModel user) {
        try {
            UserModel userModel = userRepository.findByAuthentication(user.getLogin(), user.getPwd());
            return userModel.getRole();
        } catch (NoResultException e) {
            return Role.NONE;
        }
    }
}

