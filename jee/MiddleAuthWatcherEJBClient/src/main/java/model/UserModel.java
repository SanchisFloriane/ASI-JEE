package model;

import enumeration.Role;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Entity
@XmlRootElement
@Table(name = "User", uniqueConstraints = @UniqueConstraint(columnNames = "login"))
public class UserModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "surName")
    private String surName;

    @NotNull
    @Column(name = "login")
    private String login;

    @NotNull
    @Column(name = "pwd")
    private String pwd;

    @NotNull
    @Column(name = "roleUser")
    @Enumerated(EnumType.STRING)
    private Role role;

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    /**
     * Constructor
     */
    public UserModel() {
    }


    /**
     * Constructor
     *
     * @param login
     * @param password
     */
    public UserModel(String login, String password) {
        this.pwd = password;
        this.login = login;
        this.lastName = null;
        this.surName = null;
        this.role = null;
    }

    /**
     * Constructor
     *
     * @param login
     * @param password
     * @param role
     */
    public UserModel(String login, String password, Role role) {
        this.pwd = password;
        this.login = login;
        this.lastName = null;
        this.surName = null;
        this.role = role;
    }

    /**
     * Constructor using fields
     *
     * @param login
     * @param pwd
     * @param lastName
     * @param surName
     * @param role
     */
    public UserModel(String login, String pwd, String lastName, String surName, Role role) {
        this.pwd = pwd;
        this.login = login;
        this.lastName = lastName;
        this.surName = surName;
        this.role = role;
    }

    @Override
    public String toString() {
        return "UserModel{ " +
                "id =" + id +
                ", login ='" + login + '\'' +
                ", password ='" + pwd + '\'' +
                ", role ='" + role + '\'' +
                ", surName ='" + surName + '\'' +
                ", lastName ='" + lastName + '\'' +
                '}';
    }
}
