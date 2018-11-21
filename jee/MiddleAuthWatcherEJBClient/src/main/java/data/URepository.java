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

    public void save(UserModel user){
        em.persist(user);
    }

    public UserModel findById(Long id) {
        return em.find(UserModel.class, id);
    }

    public UserModel findByAuthentication(String login, String pwd) {

        return (UserModel) em.createQuery("from User u where u.login = :login and u.pwd = pwd")
                .setParameter("login", login)
                .setParameter("pwd", pwd)
                .getSingleResult();
    }

    public List<UserModel> getAllUsers() {

       return (List<UserModel>)em.createQuery("from UserModel").getResultList();
    }
}
