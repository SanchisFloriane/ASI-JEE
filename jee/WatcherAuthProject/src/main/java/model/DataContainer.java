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

    public void addUser(UserModel user){
        userRepository.save(user);
    }

    public Role checkUser(UserModel user) {
        try {
            UserModel u = userRepository.findByAuthentication(user.getLogin(), user.getPwd());
            return u.getRole();
        } catch (NoResultException e) {
            return Role.NONE;
        }
    }
}

