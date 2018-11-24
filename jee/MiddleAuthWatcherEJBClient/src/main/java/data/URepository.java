package data;

import model.UserModel;

import javax.ejb.ApplicationException;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class URepository {

    @PersistenceContext
    private EntityManager em;

    public UserModel findByAuthentication(String login, String pwd) {

        return (UserModel) em.createQuery("Select u from UserModel u where u.login = :login and u.pwd = :pwd")
                .setParameter("login", login)
                .setParameter("pwd", pwd)
                .getSingleResult();
    }
}
